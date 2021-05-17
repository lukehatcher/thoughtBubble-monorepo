import React, { FC, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel } from 'victory-native';
import equal from 'deep-equal';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { StatsHomeScreenProps } from '../interfaces/componentProps';
import { fetchActivityDataAction } from '../actions/fetchActivityAction';
import { DateHelper } from '../utils/dateHelpers';
import { StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { activityRangeMap } from '../constants/activityRanges';
import { transformFileSync } from '@babel/core';
import { timeStamp } from 'console';

const { darkMode, lightMode } = colors;

export const StatsHomeScreen: FC<StatsHomeScreenProps> = ({ navigation }) => {
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const userProjectsData = useSelector((state: RootState) => state.userProjectData, equal);
  const userActivityData = useSelector((state: RootState) => state.activity, equal);
  const [currRange, setCurrRange] = useState(activityRangeMap.get('1W'));
  const [snackbarVisable, setSnackbarVisable] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

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
  gridlessGraphTheme.axis.style.grid.stroke = 'transparent';

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
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
            duration={5000} // 7 default
            action={{
              label: 'close',
              onPress: () => setSnackbarVisable(false),
            }}
          >
            {snackbarText}
          </Snackbar>
        </SnackBarContainer>
        <GraphContainer>
          <VictoryChart theme={gridlessGraphTheme} domainPadding={{ x: 25 }} width={450}>
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
              // labelComponent={<VictoryLabel x={20} y={200} angle={-90} text="activity" />}
              // labelComponent={<VictoryLabel x={205} y={45} text={`account activity`} />}
              // labelComponent={<VictoryLabel x={165} y={35} text={`account activity`} />}
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
      </MainContainer>
    </ThemeProvider>
  );
};

const MainContainer = styled.ScrollView`
  background: ${(props) => props.theme.background};
  flex: 1;
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

const GraphContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  /* margin-bottom: 0px; */
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
  border: 1px solid red;
  /* height: 60px; */
  position: absolute;
  width: 100%;
  z-index: 1;
  /* bottom: 0; */
  top: 65px;
`;
