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
  TouchableHighlight,
  LogBox,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native'; // type
import { StackParamList } from './ProjectsNavStack';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, deleteTodoAction, todoStatusChangeAction } from '../actions/todoActions';
import { RootState } from '../reducers/rootReducer'; // type
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';

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
  let todos = useSelector(selector); // retrive todos for the project we're on

  const handleTodoAddition = (todo: string) => {
    if (!todo) {
      Alert.alert('invalid input');
      return;
    }
    dispatch(addTodoAction(projectName, todo));
  };

  const handleTodoDelete = (todo: string) => {
    dispatch(deleteTodoAction(projectName, todo));
  };

  const handleTodoStatusChange = (todo: string) => {
    dispatch(todoStatusChangeAction(projectName, todo));
  };

  const closeRow = (rowMap, rowKey) => {
    // repeated via proj
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data) => (
    <TouchableHighlight
      style={styles.rowFront}
      underlayColor={'#DDD'} // on press color
    >
      {/* <Text style={styles.text}>{data.item.text}</Text> */}
      <Text style={data.item.completed ? styles.textCompleted : styles.text}>{data.item.text}</Text>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowFront}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Ionicon name="close-circle-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnMid]}
        onPress={() => handleTodoStatusChange(data.item.text)}
      >
        <Ionicon name="checkbox-outline" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleTodoDelete(data.item.text)}
      >
        <Ionicon name="trash-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );

  // 1.) ignore warning since im using a flatlist (SwipeListview) in a scrollview
  // inorder to fix my + button on the bottom
  // 2.) https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested',
    "Sending 'onAnimatedValueUpdate' with no listeners registered",
  ]);

  return (
    <ScrollView>
      {/* =================== */}
      <View style={styles.container}>
        <SwipeListView
          data={todos.map((i) => ({ ...i, key: i._id.toString() }))} // swipeviewlist api requires key prop
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe
          closeOnScroll
          rightOpenValue={-150}
          previewOpenValue={-40}
        />
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            setModalView(true);
          }}
        >
          <Ionicon name="add-circle" size={34} />
        </TouchableOpacity>
      </View>
      {/* ============ modal ============ */}
      <Modal animationType="slide" visible={modalView}>
        <View style={styles.modal}>
          <TextInput
            onChangeText={(text) => setInput(text)}
            placeholder="add a new thought"
            multiline
          />
          <TouchableOpacity style={styles.btn1}>
            <Button
              title="submit"
              color="white"
              onPress={() => {
                setModalView(false);
                handleTodoAddition(input.trim());
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
            <Button
              title="cancel"
              color="grey"
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
    color: 'grey',
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
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 250,
  },
  btn1: {
    backgroundColor: 'grey',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn2: {
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth: 2,
    padding: 6,
    margin: 8,
    width: 250,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }, // new ================
  container: {
    flex: 1,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: 'rgb(0, 122, 255)', // apple ios colors (light)
    right: 100,
  },
  backRightBtnMid: {
    backgroundColor: 'rgb(52, 199, 89)', // ios light green
    right: 50,
  },
  backRightBtnRight: {
    backgroundColor: 'rgb(255, 59, 48)', // apple ios colors (light)
    right: 0,
  },
});
