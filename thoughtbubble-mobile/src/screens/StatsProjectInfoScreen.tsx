import React, { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryPie, VictoryTheme } from 'victory-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatsProjectInfoScreenProps } from '../interfaces/screenProps';
import { RootState } from '../reducers/rootReducer';
import { darkMode, lightMode } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { locations } from '../constants/locations';
import { DateHelper } from '../utils/dateHelpers';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { fetchActivityDataAction } from '../actions/fetchActivityAction';
import { Button, IconButton, ProgressBar, Snackbar } from 'react-native-paper';
import { activityRangeMap } from '../constants/activityRanges';
import { StyleSheet } from 'react-native';
import { StackBackButton } from '../components/StackBackButton';

export const StatsProjectInfoScreen: FC<StatsProjectInfoScreenProps> = function ({ route, navigation }) {
  const isDarkMode = useDarkCheck();
  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
  };
  const { projectId } = route.params;
  const dispatch = useDispatch();
  const userProjectsData = useSelector((state: RootState) => state.userProjectData);
  const project = userProjectsData.find((proj) => proj.id === projectId);
  const userActivityData = useSelector((state: RootState) => state.activity);
  const [snackbarVisable, setSnackbarVisable] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [currRange, setCurrRange] = useState<number>(activityRangeMap['1W']);

  const handle1WClick = () => setCurrRange(activityRangeMap['1W']);
  const handle1MClick = () => setCurrRange(activityRangeMap['1M']);
  const handle3MClick = () => setCurrRange(activityRangeMap['3M']);
  const handle6MClick = () => setCurrRange(activityRangeMap['6M']);
  const handle1YClick = () => setCurrRange(activityRangeMap['1Y']);

  // lib
  const totalThoughts = project?.projectThoughts.length ?? 0;
  const totalCompletedThoughts =
    project?.projectThoughts.reduce((acc, curr) => {
      if (curr.completed) acc++;
      return acc;
    }, 0) ?? 0;

  useLayoutEffect(() => {
    // set screen title
    navigation.setOptions({
      title: userProjectsData.find((proj) => proj.id === projectId)?.projectName,
      headerLeft: () => <StackBackButton location="Analytics" />,
      headerRight: () => (
        <IconButton
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          size={30}
          color={isDarkMode ? darkMode.textOnBackground87 : lightMode.textOnBackground}
          style={styles.menuIcon}
        />
      ),
    });
  });

  useFocusEffect(
    useCallback(() => {
      // allow for dynamic reload of graph data
      dispatch(fetchActivityDataAction());
    }, []),
  );

  // tally up the number of thoughts added via vscode and mobile
  const count = userProjectsData
    .find((proj) => proj.id === projectId)
    ?.projectThoughts.reduce(
      (acc, curr) => {
        if (curr.creationLocation === locations.MOBILE) acc.mobile += 1;
        else acc.vscode += 1;
        return acc;
      },
      { vscode: 0, mobile: 0 },
    );

  const pieChartData = [
    { x: 'vscode', y: count?.vscode },
    { x: 'mobile', y: count?.mobile },
  ];

  const gridlessGraphTheme = VictoryTheme.material;
  // remove colored grid
  if (gridlessGraphTheme?.axis?.style?.grid?.stroke) {
    gridlessGraphTheme.axis.style.grid.stroke = isDarkMode ? '#FFFFFF15' : '#00000015';
  }

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
            duration={5000} // 7k default
            action={{
              label: '???', // or CLOSE
              onPress: () => setSnackbarVisable(false),
            }}
          >
            {snackbarText}
          </Snackbar>
        </SnackBarContainer>
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
          progress={totalThoughts ? totalCompletedThoughts / totalThoughts : 0} // account for divind by 0
          color={isDarkMode ? darkMode.primary : lightMode.primary}
          style={{ margin: 20 }}
        />
        <GraphTitleContainer>
          <GraphTitleText>Activity Overview</GraphTitleText>
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
            mode={currRange === activityRangeMap['1W'] ? 'contained' : 'text'}
            onPress={() => handle1WClick()} // and change currrange
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary, fontFamily: 'Inter' }}
          >
            1W
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === activityRangeMap['1M'] ? 'contained' : 'text'}
            onPress={() => handle1MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary, fontFamily: 'Inter' }}
          >
            1M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === activityRangeMap['3M'] ? 'contained' : 'text'}
            onPress={() => handle3MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary, fontFamily: 'Inter' }}
          >
            3M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === activityRangeMap['6M'] ? 'contained' : 'text'}
            onPress={() => handle6MClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary, fontFamily: 'Inter' }}
          >
            6M
          </Button>
          <Button
            compact
            style={styles.btn}
            mode={currRange === activityRangeMap['1Y'] ? 'contained' : 'text'}
            onPress={() => handle1YClick()}
            color={`${darkMode.primary}18`}
            labelStyle={{ color: isDarkMode ? darkMode.primary : lightMode.primary, fontFamily: 'Inter' }}
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
        <CreatedDateText>project created on: {DateHelper.parseOutTime(project?.createdDate ?? '')}</CreatedDateText>
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
  menuIcon: {
    marginRight: 15,
    borderRadius: 10,
    width: 35,
    height: 35,
  },
});

const SnackBarContainer = styled.View`
  position: absolute;
  width: 100%;
  z-index: 1;
  top: 70px;
`;

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
  width: 130px;
  height: 65px;
`;

const TotalNumberText = styled.Text`
  font-family: Inter;
  text-align: center;
  font-size: 40px;
  color: ${(props) => props.theme.textOnBackground};
`;

const TotalNumberSubText = styled.Text`
  font-family: Inter;
  text-align: center;
  font-size: 11px;
  color: ${(props) => props.theme.textOnBackground};
`;

const GraphTitleContainer = styled.View`
  height: 30px;
`;

const GraphTitleText = styled.Text`
  font-family: Inter;
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
  margin-top: 30px;
  font-family: Inter;
  text-align: center;
  color: ${(prop) => prop.theme.textOnBackground};
`;

const CreatedDateText = styled.Text`
  font-family: Inter;
  text-align: center;
  color: ${(props) => props.theme.textOnBackground};
`;
