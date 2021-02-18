import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { StackParamList } from './ProjectsNavStack';

interface ProjectsScreenProps {
  // all good here
  navigation: StackNavigationProp<StackParamList, 'Projects'>;
}
// https://reactnavigation.org/docs/typescript/ & b a

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  navigation,
}) => {
  return (
    <ScrollView>
      <View style={styles.centerView}>
        <Text>this is your project data</Text>
        <Button
          title="navigate to todos"
          onPress={() => navigation.navigate('Todos')}
        />
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
