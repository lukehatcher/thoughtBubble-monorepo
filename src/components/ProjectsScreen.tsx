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
  TouchableHighlight,
  LogBox,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer'; // type
import { StackParamList } from './ProjectsNavStack';
import { useDispatch } from 'react-redux';
import { addProjectAction, deleteProjectAction } from '../actions/projectActions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';

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
  let userProjectsData = useSelector(selector);

  const handleProjectAddition = function (projectName: string) {
    if (!projectName) {
      Alert.alert('invalid input');
      return;
    }
    dispatch(addProjectAction(projectName));
  };

  const handleProjectDeletion = function (projectName: string) {
    dispatch(deleteProjectAction(projectName));
  };

  const closeRow = (rowMap, rowKey) => {
    // for slidables
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data) => (
    // for slidables
    <TouchableHighlight
      onPress={() => navigation.navigate('Todos', { projectName: data.item.projectName })}
      style={styles.rowFront}
      underlayColor={'#DDD'}
    >
      <Text style={styles.text}>{data.item.projectName}</Text>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    // for slidables
    <View style={styles.rowFront}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Ionicon name="close-circle-outline" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleProjectDeletion(data.item.projectName)}
      >
        <Ionicon name="trash-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <>
      {/* ========================================== */}
      <View style={styles.container}>
        <SwipeListView
          data={userProjectsData.map((i) => ({ ...i, key: i._id.toString() }))} // swipeviewlist api requires key prop
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe
          closeOnScroll
          rightOpenValue={-150}
          previewOpenValue={-40}
        />
      </View>
      {/* =================== modal component ======================= */}
      <Modal animationType="slide" visible={modalView}>
        <View style={styles.modal}>
          <TextInput
            onChangeText={(text) => setInput(text)}
            placeholder="add a new project"
            multiline
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.btn1}>
            <Button
              title="submit"
              color="white"
              onPress={() => {
                setModalView(false);
                handleProjectAddition(input.trim());
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
      <TouchableOpacity style={styles.plusBtnContainer} onPress={() => setModalView(true)}>
        <Ionicon name="add-circle" size={80} style={styles.plusBtn} color="rgb(58, 58, 60)" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
  },
  plusBtnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  plusBtn: {
    shadowColor: '#000', // improve shadow
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.48,
    shadowRadius: 13.0,
    elevation: 24,
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
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'rgb(0, 122, 255)', // apple ios colors (light)
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'rgb(255, 59, 48)', // apple ios colors (light)
    right: 0,
  },
});
