import React from 'react';
import { View, Text } from 'react-native';

interface TodosScreenProps {}

export const TodosScreen: React.FC<TodosScreenProps> = () => {
  return (
    <View>
      <Text>these are your todos</Text>
    </View>
  );
};
