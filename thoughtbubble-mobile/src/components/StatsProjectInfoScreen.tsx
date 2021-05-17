import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { VictoryPie } from 'victory-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatsProjectInfoScreenProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';
import { colors } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { locations } from '../constants/locations';
import { DateHelper } from '../utils/dateHelpers';

const { darkMode, lightMode } = colors;

export const StatsProjectInfoScreen: FC<StatsProjectInfoScreenProps> = function ({ route, navigation }) {
  const { projectId } = route.params;
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
  const userProjectsData = useSelector((state: RootState) => state.userProjectData);

  // tally up the number of thoughts added via vscode and mobile
  const count = userProjectsData
    .find((i) => i.id === projectId)
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

  return (
    <ThemeProvider theme={theme}>
      {DateHelper.getDayNumber('2021-05-04T21:34:08.689Z')}
      <MainContainer>
        <PieChartHeader>where you spend your time</PieChartHeader>
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
      </MainContainer>
    </ThemeProvider>
  );
};

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const PieChartHeader = styled.Text`
  color: ${(prop) => prop.theme.textOnBackground};
`;
