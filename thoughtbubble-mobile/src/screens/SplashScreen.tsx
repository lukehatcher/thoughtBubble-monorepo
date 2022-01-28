import React, { FC } from 'react';
import styled from 'styled-components/native';
import { darkMode } from '../constants/colors';

export const SplashScreen: FC = () => {
  return <MainContainer></MainContainer>;
};

// stick with one colors, dont want to check for dark of light mode
const MainContainer = styled.View`
  flex: 1;
  background-color: ${darkMode.primaryVariant};
`;
