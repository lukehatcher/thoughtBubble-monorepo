import React, { FC, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis } from 'victory-native';
import equal from 'deep-equal';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { StatsHomeScreenProps } from '../interfaces/componentProps';
import { fetchActivityDataAction } from '../actions/fetchActivityAction';
import { DateHelper } from '../utils/dateHelpers';
import { Modal, StyleSheet, Linking } from 'react-native';
import { Button, IconButton, Snackbar, Paragraph } from 'react-native-paper';
import { activityRangeMap } from '../constants/activityRanges';
import { Activity } from '../interfaces/data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { darkMode, lightMode } = colors;

export const StatsHomeScreen: FC<StatsHomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const userProjectsData = useSelector((state: RootState) => state.userProjectData, equal);
  const userActivityData: Activity = useSelector((state: RootState) => state.activity, equal);
  const [currRange, setCurrRange] = useState(activityRangeMap.get('1W'));
  const [snackbarVisable, setSnackbarVisable] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handle1WClick = () => setCurrRange(activityRangeMap.get('1W'));
  const handle1MClick = () => setCurrRange(activityRangeMap.get('1M'));
  const handle3MClick = () => setCurrRange(activityRangeMap.get('3M'));
  const handle6MClick = () => setCurrRange(activityRangeMap.get('6M'));
  const handle1YClick = () => setCurrRange(activityRangeMap.get('1Y'));

  useFocusEffect(
    useCallback(() => {
      // refetch data and update store only on page load
      // dispatch(fetchProjectDataAction(userSub));
      dispatch(fetchActivityDataAction());
    }, []),
  );

  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
    cardBorder: isDarkMode ? darkMode.dp1 : 'black',
  };

  const gridlessGraphTheme = VictoryTheme.material;
  // remove colored grid
  // gridlessGraphTheme.axis.style.grid.stroke = 'transparent';
  gridlessGraphTheme.axis.style.grid.stroke = isDarkMode ? '#FFFFFF15' : '#00000015';

  const generateXaxisLabel = (): string => {
    // x label for graph "mm/dd/yyyy -> mm/dd/yyyy"
    const xys = userActivityData.graphData.slice(-1 * currRange);
    const first = DateHelper.dateToMMDDYYY(DateHelper.dayNToDate(xys[0].x));
    const last = DateHelper.dateToMMDDYYY(DateHelper.dayNToDate(xys[xys.length - 1].x));
    return `${first}  →  ${last}`;
  };

  const calculateStreak = (): number => {
    const graphData = [...userActivityData.graphData];
    graphData.sort((a, b) => b.x - a.x);
    let streakCount = 0;
    for (let i = 0; i < graphData.length; i++) {
      if (graphData[i].y === 0) {
        return streakCount;
      } else {
        streakCount++;
      }
    }
    return streakCount;
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <StreakHeader>
          <StreakText>streak: {calculateStreak()}🔥</StreakText>
          <IconButton
            icon="information-outline"
            color={isDarkMode ? darkMode.secondary : lightMode.secondary}
            size={30}
            onPress={() => setModalVisible(true)}
            style={{ marginRight: 15, marginLeft: 'auto' }}
          />
        </StreakHeader>
        <GraphTitleContainer>
          <GraphTitleText>activity overview</GraphTitleText>
        </GraphTitleContainer>
        <SnackBarContainer>
          <Snackbar
            theme={{
              colors: {
                surface: isDarkMode ? darkMode.textOnSurface : lightMode.textOnSurface,
              },
            }}
            style={{ backgroundColor: isDarkMode ? darkMode.dp1 : 'white' }}
            visible={snackbarVisable}
            onDismiss={() => setSnackbarVisable(false)}
            duration={5000} // 7k default
            action={{
              label: '✕', // or CLOSE
              onPress: () => setSnackbarVisable(false),
            }}
          >
            {snackbarText}
          </Snackbar>
        </SnackBarContainer>
        <GraphContainer>
          <VictoryChart
            theme={gridlessGraphTheme}
            domainPadding={{ x: 25 }}
            width={450}
            padding={{ top: 10, bottom: 50, left: 55, right: 30 }} // 50 is default
            height={300}
          >
            <VictoryAxis
              // y-axis
              dependentAxis
            />
            <VictoryAxis
              // x-axis
              tickFormat={() => ''}
              offsetY={50}
              axisLabelComponent={<VictoryLabel dy={16} />}
              label={generateXaxisLabel()}
            />
            <VictoryBar
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPress: (_, clickedProps) => {
                      const activityDate = DateHelper.dayNToDate(clickedProps.datum.x);
                      const formatActivityDate = DateHelper.parseOutTime(activityDate.toISOString());
                      setSnackbarText(formatActivityDate);
                      setSnackbarVisable(true);
                      return null; // api expects a return
                    },
                  },
                },
              ]}
              style={{ data: { fill: isDarkMode ? darkMode.primary : lightMode.secondary } }}
              data={userActivityData.graphData.slice(-1 * currRange)}
              height={300}
              // labels={({ datum }) => {
              //   if (!datum.y) return '';
              //   return `day: ${datum.x}`;
              // }}
              cornerRadius={{ topLeft: 2, topRight: 2 }}
              animate={{
                duration: 500,
                onLoad: { duration: 250 },
              }}
              barRatio={0.8}
            />
          </VictoryChart>
        </GraphContainer>

        <ChangeGraphRangeContainer>
          <Button
            compact
            style={styles.btn}
            // color={isDarkMode ? `${darkMode.primary}32` : lightMode.primary}
            mode={currRange === activityRangeMap.get('1W') ? 'contained' : 'text'}
            onPress={() => handle1WClick()} // and change currrange
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            1W
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === activityRangeMap.get('1M') ? 'contained' : 'text'}
            onPress={() => handle1MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            1M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === activityRangeMap.get('3M') ? 'contained' : 'text'}
            onPress={() => handle3MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            3M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === activityRangeMap.get('6M') ? 'contained' : 'text'}
            onPress={() => handle6MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            6M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === activityRangeMap.get('1Y') ? 'contained' : 'text'}
            onPress={() => handle1YClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary }}
          >
            1Y
          </Button>
        </ChangeGraphRangeContainer>

        <HorizontalScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CarouselContainer>
            {userProjectsData.map((proj) => (
              <CarouselCard
                style={isDarkMode ? null : styles.carouselCard}
                key={proj.id}
                onPress={() => navigation.navigate('Project Analytics', { projectId: proj.id })}
                activeOpacity={0.7} // 0.2 default
              >
                <CarouselCardHeaderText>{proj.projectName}</CarouselCardHeaderText>
                <CarouselCardText># of thoughts: {proj.projectThoughts.length}</CarouselCardText>
                <CarouselCardText>created:</CarouselCardText>
                <CarouselCardText>{DateHelper.parseOutTime(proj.createdDate)}</CarouselCardText>
                <CarouselCardText>last updated:</CarouselCardText>
                <CarouselCardText>{DateHelper.parseOutTime(proj.lastUpdatedDate)}</CarouselCardText>
              </CarouselCard>
            ))}
          </CarouselContainer>
        </HorizontalScrollView>
        {modalVisible ? <Overlay /> : <></>}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <InfoModalContainer>
            <InfoModalTextContainer>
              <MaterialCommunityIcons
                name="cellphone-information"
                size={30}
                color={isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant}
              />
              <InfoModalText>
                Activity is recorded on project and thought creation as well as on marking a thought as completed.
              </InfoModalText>
            </InfoModalTextContainer>
            <InfoModalTextContainer>
              <MaterialCommunityIcons
                name="github"
                size={30}
                color={isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant}
              />
              <InfoModalText>
                Have a statistic you'd like to see here? Stop by our GitHub and start a discussion or open an issue!
              </InfoModalText>
            </InfoModalTextContainer>
            <Button
              mode="contained"
              icon="open-in-new"
              color={isDarkMode ? darkMode.secondary : lightMode.primary}
              onPress={() => Linking.openURL('https://github.com/lukehatcher/thoughtBubble-monorepo')}
              style={{ position: 'absolute', bottom: 40 }}
            >
              open GitHub repo
            </Button>
            <IconButton
              icon="close"
              color={isDarkMode ? darkMode.secondary : lightMode.secondary}
              size={37}
              onPress={() => setModalVisible(false)}
              style={{ position: 'absolute', right: 4, top: 4 }}
            />
          </InfoModalContainer>
        </Modal>
      </MainContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  carouselCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
    width: 40,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 0,
    color: lightMode.primary,
  },
});

const InfoModalTextContainer = styled.View`
  /* border: 1px solid grey; */
  flex-direction: row;
  align-items: center;
  width: 100%;
  /* padding: 15px; */
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 20px; // HELP
`;

const InfoModalText = styled.Text`
  /* border: 1px solid green; */
  margin: 15px;
  margin-right: 19px;
  font-size: 14px;
  color: ${(props) => props.theme.textOnBackground};
`;

const Overlay = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 723px;
  background-color: #00000095;
  z-index: 999;
`;

const InfoModalContainer = styled.View`
  align-items: center;
  justify-content: center;
  /* background-color: black; */
  background-color: ${(props) => props.theme.background};
  margin-top: auto;
  margin-bottom: 0px;
  height: 300px;
  /* height: 275px; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const MainContainer = styled.ScrollView`
  background: ${(props) => props.theme.background};
`;

const GraphContainer = styled.View`
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
`;

const HorizontalScrollView = styled.ScrollView`
  background: ${(props) => props.theme.background};
  /* border: 1px solid green; */
`;

const CarouselContainer = styled.View`
  flex-direction: row;
  margin: 15px;
`;

const CarouselCard = styled.TouchableOpacity`
  /* border: ${(props) => props.theme.cardBorder}; */
  padding: 10px;
  border-radius: 10px;
  height: 160px;
  width: 150px;
  margin: 10px;
  background-color: ${(props) => props.theme.dp1};
`;

const ChangeGraphRangeContainer = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  /* border: pink; */
  height: 35px;
  margin: 0px;
`;

const CarouselCardHeaderText = styled.Text`
  /* text-align: center */
  margin-bottom: 5px;
  color: ${(props) => props.theme.textOnBackground};
  font-size: 20px;
`;

const CarouselCardText = styled.Text`
  /* text-align: center */
  color: ${(props) => props.theme.textOnBackground};
`;

const SnackBarContainer = styled.View`
  /* border: 1px solid red; */
  /* height: 60px; */
  position: absolute;
  width: 100%;
  z-index: 1;
  /* bottom: 0; */
  top: 70px;
`;

const StreakHeader = styled.View`
  height: 65px;
  /* border: 1px solid grey; */
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StreakText = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
  font-size: 20px;
  margin-left: 15px;
`;

const GraphTitleContainer = styled.View`
  height: 30px;
`;

const GraphTitleText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.textOnBackground};
  text-align: center;
`;
