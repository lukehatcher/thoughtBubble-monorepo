import React, { FC, useState } from 'react';
import { View, Text, Modal, Button, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';
import styled, { ThemeProvider } from 'styled-components/native';
import { StatsHomeScreenProps } from '../interfaces/componentProps';
import Carousel from 'react-native-snap-carousel';

const { darkMode, lightMode } = colors;

export const StatsHomeScreen: FC<StatsHomeScreenProps> = ({ navigation }) => {
  // aka theme var, should create a hook later
  const isDarkMode = useSelector((state: RootState) => state.userInfo.darkMode);
  const userProjectsData = useSelector((state: RootState) => state.userProjectData);

  const theme = {
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
  };

  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <StyledScrollView horizontal>
          <CarouselWrapper>
            {userProjectsData.map((proj) => (
              <CarouselCard>
                <Text>{proj.projectName}</Text>
                <Button
                  onPress={() => navigation.navigate('StatsForProject', { projectId: proj.id })}
                  title="see details"
                />
              </CarouselCard>
            ))}
          </CarouselWrapper>
        </StyledScrollView>
      </MainContainer>
    </ThemeProvider>
  );
};

const MainContainer = styled.View`
  background: ${(props) => props.theme.background};
  flex: 1;
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

const StyledScrollView = styled.ScrollView`
  background: ${(props) => props.theme.dp1};
  /* margin: 15px; */
  height: 100px;
  /* width: 100px; */
  margin-bottom: 500px;
  display: flex;
`;

const CarouselWrapper = styled.View`
  flex-direction: row;
  margin: 15px;
`;

const CarouselCard = styled.View`
  border: 1px solid red;
  padding: 15px;
  border-radius: 10px;
  height: 160px;
  width: 150px;
  margin: 10px;
`;

/* const Test = styled.Text`
  background-color: pink;
  color: red;
  /* margin-bottom: 50px; */
/* display: flex;
  align-items: center;
  justify-content: center; */
// `;
