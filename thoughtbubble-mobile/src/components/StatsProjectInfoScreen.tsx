import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { StatsProjectInfoScreenProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';

export const StatsProjectInfoScreen: FC<StatsProjectInfoScreenProps> = function ({ route, navigation }) {
  const userProjectsData = useSelector((state: RootState) => state.userProjectData);
  const { projectId } = route.params;
  const project = userProjectsData.find((i) => i.id === projectId);
  return (
    <View>
      <Text>hello from stats project info screen</Text>
      <Text>{JSON.stringify(project)}</Text>
    </View>
  );
};
