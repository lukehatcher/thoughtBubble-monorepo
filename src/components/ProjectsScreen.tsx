import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer'; // type
import { StackParamList } from './ProjectsNavStack';
import { useDispatch } from 'react-redux';
import { addProjectAction, deleteProjectAction } from '../actions/projectActions';

interface ProjectsScreenProps {
  // all good here
  // https://reactnavigation.org/docs/typescript/ & ben a
  navigation: StackNavigationProp<StackParamList, 'Projects'>;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ navigation }) => {
  const [modalView, setModalView] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const selector = (state: RootState) => state.userData;
  const userProjectsData = useSelector(selector);
  // if i have trouble with rerender, might want to just pass the id via params and then
  // find the correct todo after searching throuch state from useSelector()

  const handleProjectAddition = function (projectName) {
    dispatch(addProjectAction(projectName));
  };

  const handleProjectDeletion = function (projectName) {
    dispatch(deleteProjectAction(projectName));
  };

  return (
    <ScrollView>
      <ScrollView>
        {userProjectsData.map((project) => (
          <TouchableOpacity
            key={Math.random()}
            style={styles.view}
            onPress={() => navigation.navigate('Todos', { projectTodos: project })} // pass project todos to todo view
          >
            <Text style={styles.text}>{project.projectName}</Text>
            <Button
              title="🗑"
              onPress={() => {
                handleProjectDeletion(project.projectName);
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          setModalView(true);
        }}
      >
        <Text>+</Text>
        {/* <Ionicon name="add-circle" size={34} /> */}
      </TouchableOpacity>
      <Modal style={styles.modal} animationType="slide" visible={modalView}>
        <View style={styles.modal}>
          <TextInput
            onChangeText={(text) => setInput(text)}
            placeholder="add a new project"
            multiline
          />
          <TouchableOpacity>
            <Button
              title="submit"
              onPress={() => {
                setModalView(false);
                handleProjectAddition(input.trim());
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              title="cancel"
              onPress={() => {
                setModalView(false);
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
  },
  plusButton: {
    alignItems: 'center',
    padding: 15,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
