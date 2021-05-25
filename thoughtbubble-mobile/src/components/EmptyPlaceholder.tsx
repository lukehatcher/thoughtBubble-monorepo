import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';

const { darkMode, lightMode } = colors;

interface EmptyPlaceholderProps {
  isDarkMode: boolean;
  theme: any; // obj with many conditional style props
}

export const EmptyPlaceholder: FC<EmptyPlaceholderProps> = function ({ isDarkMode, theme }) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <MaterialCommunityIcons
          name="thought-bubble"
          size={125}
          color={isDarkMode ? `${darkMode.textOnBackground}20` : `${lightMode.textOnBackground}20`}
        />
        <TextNothingHere>oops, theres nothing to see here... yet</TextNothingHere>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  margin-top: 75px;
  flex: 1;
  align-items: center;
`;

const TextNothingHere = styled.Text`
  color: ${(props) => `${props.theme.textOnBackground}40`};
  font-size: 20px;
  margin-top: 20px;
`;
