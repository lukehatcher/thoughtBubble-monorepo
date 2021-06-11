import React, { FC } from 'react';
import styled from 'styled-components/native';
import { darkMode } from '../constants/colors';

interface SplashScreenProps {}

export const SplashScreen: FC<SplashScreenProps> = function () {
  return <MainContainer></MainContainer>;
};

// stick with one colors, dont want to check for dark of light mode
const MainContainer = styled.View`
  flex: 1;
  background-color: ${darkMode.primaryVariant};
`;
