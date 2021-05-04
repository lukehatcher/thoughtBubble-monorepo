import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { VictoryPie } from 'victory-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatsProjectInfoScreenProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';
import { colors } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';

const { darkMode, lightMode } = colors;

export const StatsProjectInfoScreen: FC<StatsProjectInfoScreenProps> = function ({ route, navigation }) {
  const isDarkMode = useDarkCheck();
  const userProjectsData = useSelector((state: RootState) => state.userProjectData);
  const { projectId } = route.params;
  const project = userProjectsData.find((i) => i.id === projectId);

  const pieChartData = [
    { x: 'mobile', y: 33 },
    { x: 'VSCode', y: 66 },
  ];

  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
  };

  return (
    <ThemeProvider theme={theme}>
      <View>
        <Text>{JSON.stringify(project)}</Text>
        <PieChartHeader>where you spend your time</PieChartHeader>
        <VictoryPie data={pieChartData} height={350} />
      </View>
    </ThemeProvider>
  );
};

const PieChartHeader = styled.Text`
  color: ${(prop) => prop.theme.textOnBackground};
`;
