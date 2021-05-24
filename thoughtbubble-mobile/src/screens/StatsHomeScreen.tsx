import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryLabel,
  VictoryAxis,
  VictoryArea,
  VictoryPolarAxis,
} from 'victory-native';
import equal from 'deep-equal';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { StatsHomeScreenProps } from '../interfaces/componentProps';
import { fetchActivityDataAction } from '../actions/fetchActivityAction';
import { DateHelper } from '../utils/dateHelpers';
import { Modal, StyleSheet, Linking, Text } from 'react-native';
import { Button, IconButton, Snackbar, ProgressBar } from 'react-native-paper';
import { activityRangeMap } from '../constants/activityRanges';
import { Activity, ProjectShape } from '../interfaces/data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// folder, folder-information-outline, calender, thought-bubble

const { darkMode, lightMode } = colors;

export const StatsHomeScreen: FC<StatsHomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const userProjectsData: ProjectShape[] = useSelector((state: RootState) => state.userProjectData, equal);
  const userActivityData: Activity = useSelector((state: RootState) => state.activity, equal);
  const [currRange, setCurrRange] = useState(activityRangeMap.get('1W'));
  const [snackbarVisable, setSnackbarVisable] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const totalThoughts = userProjectsData.reduce((acc, curr) => (acc += curr.projectThoughts.length), 0);
  const totalCompletedThoughts = userProjectsData.reduce((acc, curr) => {
    for (let i = 0; i < curr.projectThoughts.length; i++) {
      if (curr.projectThoughts[i].completed) acc++;
    }
    return acc;
  }, 0);

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

  useLayoutEffect(() => {
    // add icons in header
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="information-outline"
          color={isDarkMode ? darkMode.secondary : lightMode.textOnBackground}
          size={30}
          onPress={() => setModalVisible(true)}
          style={{ marginRight: 15, marginBottom: 10 }}
        />
      ),
      headerLeft: () => (
        <Text
          style={{
            color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
            fontSize: 17,
            marginLeft: 16,
          }}
        >
          streak: {calculateStreak()}🔥
        </Text>
      ),
    });
  }, [navigation, isDarkMode]);

  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
    cardHeader: isDarkMode ? darkMode.secondary : lightMode.primary,
  };

  const gridlessGraphTheme = VictoryTheme.material;
  // remove colored grid
  gridlessGraphTheme.axis.style.grid.stroke = isDarkMode ? '#FFFFFF15' : '#00000015';

  const calculateStreak = (): number => {
    // given a set of xy graph coords
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
        <AccountTotalsContainer>
          <AccountTotalsCard>
            <TotalNumberText>{userProjectsData.length}</TotalNumberText>
            <TotalNumberSubText>total projects</TotalNumberSubText>
          </AccountTotalsCard>
          <AccountTotalsCard>
            <TotalNumberText>{totalThoughts}</TotalNumberText>
            <TotalNumberSubText>total thoughts</TotalNumberSubText>
          </AccountTotalsCard>
          <AccountTotalsCard>
            <TotalNumberText>{totalCompletedThoughts}</TotalNumberText>
            <TotalNumberSubText>completed thoughts</TotalNumberSubText>
          </AccountTotalsCard>
        </AccountTotalsContainer>
        <ProgressBar
          progress={totalCompletedThoughts / totalThoughts}
          color={isDarkMode ? darkMode.primary : lightMode.primary}
          style={{ margin: 20 }}
        />
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
              label={DateHelper.generateXaxisDateLabel(userActivityData.graphData, currRange)}
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
                <MaterialCommunityIcons
                  name="account-circle"
                  size={40}
                  color={isDarkMode ? darkMode.primary : lightMode.primary}
                  style={{ position: 'absolute', marginTop: 60 }}
                />
                <CarouselCardTextLastUpdateContainer>
                  <CarouselCardText>last update:</CarouselCardText>
                  <CarouselCardText>{DateHelper.parseOutTime(proj.lastUpdatedDate)}</CarouselCardText>
                </CarouselCardTextLastUpdateContainer>
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
        {/* =================== */}
        <VictoryChart polar theme={VictoryTheme.material}>
          <VictoryArea
            data={[
              { x: 1, y: 9 },
              { x: 2, y: 3 },
              { x: 3, y: 6 },
              { x: 4, y: 8 },
              { x: 5, y: 11 },
            ]}
          />
          <VictoryPolarAxis />
        </VictoryChart>
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

const AccountTotalsContainer = styled.View`
  margin-top: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const AccountTotalsCard = styled.View`
  /* color: ${(props) => props.theme.textOnBackground}; */
  /* border: 1px solid black; */
  /* margin: 15px; */
  width: 130px;
  height: 65px;
`;

const TotalNumberText = styled.Text`
  text-align: center;
  font-size: 40px;
  color: ${(props) => props.theme.textOnBackground};
`;

const TotalNumberSubText = styled.Text`
  text-align: center;
  font-size: 11px;
  color: ${(props) => props.theme.textOnBackground};
`;

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

const ChangeGraphRangeContainer = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 35px;
  margin: 0px;
`;

const SnackBarContainer = styled.View`
  /* border: 1px solid red; */
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 70px;
`;

const GraphTitleContainer = styled.View`
  height: 30px;
`;

const GraphTitleText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.textOnBackground};
  text-align: center;
`;

const CarouselContainer = styled.View`
  flex-direction: row;
  margin: 15px;
`;

const CarouselCard = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  height: 160px;
  width: 150px;
  margin: 10px;
  background-color: ${(props) => props.theme.dp1};
`;

const CarouselCardHeaderText = styled.Text`
  margin-left: 0px;
  margin-right: auto;
  margin-bottom: 10px;
  color: ${(props) => props.theme.cardHeader};
  font-size: 20px;
`;

const CarouselCardTextLastUpdateContainer = styled.View`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 12px;
`;

const CarouselCardText = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.textOnBackground};
  text-align: center;
`;
