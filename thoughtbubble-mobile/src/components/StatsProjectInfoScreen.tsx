import React, { FC, useCallback, useLayoutEffect } from 'react';
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

const { darkMode, lightMode } = colors;

export const StatsProjectInfoScreen: FC<StatsProjectInfoScreenProps> = function ({ route, navigation }) {
  const { projectId } = route.params;
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const userProjectsData = useSelector((state: RootState) => state.userProjectData);
  const project = userProjectsData.find((proj) => proj.id === projectId);
  const userActivityData: Activity = useSelector((state: RootState) => state.activity);

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
              data={userActivityData.graphDataPerProject[projectId].slice(-1 * 7)}
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

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const GraphContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const PieChartTitle = styled.Text`
  color: ${(prop) => prop.theme.textOnBackground};
`;

const CreatedDateText = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
`;
