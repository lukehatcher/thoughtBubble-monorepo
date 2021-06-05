import React, { FC } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { darkMode, lightMode } from '../constants/colors';
import { EmptyPlaceholderProps } from '../interfaces/componentProps';

export const EmptyPlaceholder: FC<EmptyPlaceholderProps> = function ({
  isDarkMode,
  theme,
  displayTextLine1,
  displayTextLine2,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <MaterialCommunityIcons
          name="thought-bubble"
          size={125}
          color={isDarkMode ? `${darkMode.textOnBackground}20` : `${lightMode.textOnBackground}20`}
        />
        <TextNothingHere>
          {displayTextLine1 ? displayTextLine1 : "Oops, there's nothing to see here... yet"}
        </TextNothingHere>
        <TextNothingHere>{displayTextLine2 ? displayTextLine2 : ''}</TextNothingHere>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  margin-top: 75px;
  flex: 1;
  align-items: center;
  padding-top: 100px; // added
`;

const TextNothingHere = styled.Text`
  color: ${(props) => `${props.theme.textOnBackground}40`};
  font-size: 20px;
  margin-top: 15px;
`;
