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
import { RouteProp } from '@react-navigation/native'; // type
import { StackParamList } from './ProjectsNavStack';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, deleteTodoAction, todoStatusChangeAction } from '../actions/todoActions';
import { RootState } from '../reducers/rootReducer'; // type

interface TodosScreenProps {
  route: RouteProp<StackParamList, 'Todos'>;
}

export const TodosScreen: React.FC<TodosScreenProps> = ({ route }) => {
  const [modalView, setModalView] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { projectName } = route.params; // should be id being passed D:

  const selector = (state: RootState) =>
    state.userData.find((i) => i.projectName === projectName).todos;
  const todos = useSelector(selector); // retrive which project's todos we're on

  const handleTodoAddition = (todo: string) => {
    dispatch(addTodoAction(projectName, todo));
  };

  const handleTodoDelete = (todo: string) => {
    dispatch(deleteTodoAction(projectName, todo));
  };

  const handleTodoStatusChange = (todo: string) => {
    dispatch(todoStatusChangeAction(projectName, todo));
  };

  return (
    <ScrollView>
      <ScrollView>
        {todos.map((item) => (
          <TouchableOpacity key={Math.random()} style={styles.view}>
            {/* conditional styling (line through) */}
            <Text style={item.completed ? styles.textCompleted : styles.text}>{item.text}</Text>
            <Button
              title="🗑"
              onPress={() => {
                handleTodoDelete(item.text);
              }}
            />
            <Button
              title="✅"
              onPress={() => {
                handleTodoStatusChange(item.text);
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => {
          setModalView(true); // pass param
        }}
      >
        <Text>+</Text>
        {/* <Ionicon name="add-circle" size={34} /> */}
      </TouchableOpacity>
      {/* ============ modal ============ */}
      <Modal style={styles.modal} animationType="slide" visible={modalView}>
        <View style={styles.modal}>
          <TextInput
            onChangeText={(text) => setInput(text)}
            placeholder="add your new todo"
            multiline
          />
          <TouchableOpacity>
            <Button
              title="submit"
              onPress={() => {
                setModalView(false);
                handleTodoAddition(input);
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
  textCompleted: {
    textDecorationLine: 'line-through',
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
