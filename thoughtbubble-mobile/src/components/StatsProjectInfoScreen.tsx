import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { StatsProjectInfoScreenProps } from '../interfaces/componentProps';

export const StatsProjectInfoScreen: FC<StatsProjectInfoScreenProps> = function ({ route, navigation }) {
  const { projectId } = route.params;
  return (
    <View>
      <Text>hello from stats project info screen</Text>
      <Text>{projectId}</Text>
    </View>
  );
};
