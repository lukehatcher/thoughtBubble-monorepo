import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer'; // type
import { StackParamList } from './ProjectsNavStack';

interface ProjectsScreenProps {
  // all good here
  // https://reactnavigation.org/docs/typescript/ & ben a
  navigation: StackNavigationProp<StackParamList, 'Projects'>;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ navigation }) => {

  const selector = (state: RootState) => state.userData;
  const userData = useSelector(selector);

  return (
    <ScrollView>
      {console.log('userData', userData)}
      <View style={styles.centerView}>
        <Text>{JSON.stringify(userData)}</Text>
        <Button title="navigate to todos" onPress={() => navigation.navigate('Todos')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
