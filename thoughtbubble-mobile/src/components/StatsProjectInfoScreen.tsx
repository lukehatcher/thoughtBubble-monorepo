import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPie, VictoryTheme } from 'victory-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatsProjectInfoScreenProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';
import { colors } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { locations } from '../constants/locations';
import { DateHelper } from '../utils/dateHelpers';
import { Activity } from '../interfaces/data';
import { useFocusEffect } from '@react-navigation/native';
import { fetchActivityDataAction } from '../actions/fetchActivityAction';
import { Button, ProgressBar } from 'react-native-paper';
import { activityRangeMap } from '../constants/activityRanges';
import { StyleSheet } from 'react-native';

const { darkMode, lightMode } = colors;

export const StatsProjectInfoScreen: FC<StatsProjectInfoScreenProps> = function ({ route, navigation }) {
  const { projectId } = route.params;
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const userProjectsData = useSelector((state: RootState) => state.userProjectData);
  const project = userProjectsData.find((proj) => proj.id === projectId);
  const userActivityData: Activity = useSelector((state: RootState) => state.activity);
  const [currRange, setCurrRange] = useState(activityRangeMap.get('1W'));

  const handle1WClick = () => setCurrRange(activityRangeMap.get('1W'));
  const handle1MClick = () => setCurrRange(activityRangeMap.get('1M'));
  const handle3MClick = () => setCurrRange(activityRangeMap.get('3M'));
  const handle6MClick = () => setCurrRange(activityRangeMap.get('6M'));
  const handle1YClick = () => setCurrRange(activityRangeMap.get('1Y'));

  // lib
  const totalThoughts = project.projectThoughts.length;
  const totalCompletedThoughts = project.projectThoughts.reduce((acc, curr) => {
    if (curr.completed) acc++;
    return acc;
  }, 0);

  useLayoutEffect(() => {
    // set screen title
    navigation.setOptions({ title: userProjectsData.find((proj) => proj.id === projectId).projectName });
  });

  useFocusEffect(
    useCallback(() => {
      // allow for dynamic reload of graph data
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
  };

  // tally up the number of thoughts added via vscode and mobile
  const count = userProjectsData
    .find((proj) => proj.id === projectId)
    .projectThoughts.reduce(
      (acc, curr) => {
        if (curr.creationLocation === locations.MOBILE) acc.mobile += 1;
        else acc.vscode += 1;
        return acc;
      },
      { vscode: 0, mobile: 0 },
    );

  const pieChartData = [
    { x: 'vscode', y: count.vscode },
    { x: 'mobile', y: count.mobile },
  ];

  const gridlessGraphTheme = VictoryTheme.material;
  // remove colored grid
  gridlessGraphTheme.axis.style.grid.stroke = isDarkMode ? '#FFFFFF15' : '#00000015';

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <AccountTotalsContainer>
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
              // label={generateXaxisLabel()}
            />
            <VictoryBar
              // events={[
              //   {
              //     target: 'data',
              //     eventHandlers: {
              //       onPress: (_, clickedProps) => {
              //         const activityDate = DateHelper.dayNToDate(clickedProps.datum.x);
              //         const formatActivityDate = DateHelper.parseOutTime(activityDate.toISOString());
              //         setSnackbarText(formatActivityDate);
              //         setSnackbarVisable(true);
              //         return null; // api expects a return
              //       },
              //     },
              //   },
              // ]}
              style={{ data: { fill: isDarkMode ? darkMode.primary : lightMode.secondary } }}
              data={userActivityData.graphDataPerProject[projectId].slice(-1 * currRange)}
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
        {/* ======================== */}
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
        <PieChartTitle>where you spend your time</PieChartTitle>
        <VictoryPie
          data={pieChartData}
          style={{
            data: {},
            labels: {
              fontSize: 17,
              fill: theme.textOnBackground,
            },
          }}
          height={350}
          colorScale={'heatmap'}
        />
        <CreatedDateText>project created on: {DateHelper.parseOutTime(project.createdDate)}</CreatedDateText>
      </MainContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
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

const MainContainer = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

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

const GraphTitleContainer = styled.View`
  height: 30px;
`;

const GraphTitleText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.textOnBackground};
  text-align: center;
`;

const GraphContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ChangeGraphRangeContainer = styled.View`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 35px;
  margin: 0px;
`;

const PieChartTitle = styled.Text`
  text-align: center;
  color: ${(prop) => prop.theme.textOnBackground};
`;

const CreatedDateText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.textOnBackground};
`;
