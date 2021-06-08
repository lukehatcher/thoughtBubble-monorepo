import React, { FC } from 'react';
import { IconButton } from 'react-native-paper';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { darkMode, lightMode } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { StackBackButtonProps } from '../interfaces/componentProps';

export const StackBackButton: FC<StackBackButtonProps> = function ({ location }) {
  const isDarkMode = useDarkCheck();
  const navigation = useNavigation();
  return (
    <IconButton
      icon="chevron-left"
      color={isDarkMode ? darkMode.secondary : lightMode.textOnBackground}
      size={35}
      onPress={() => navigation.navigate(`${location}`)}
      style={{
        marginLeft: 10,
        marginBottom: 10,
        width: 35,
        height: 35,
        borderRadius: 10,
      }}
      animated={true}
    />
  );
};
