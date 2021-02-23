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
      underlayColor={'grey'}
    >
      <Text style={styles.text}>{data.item.projectName}</Text>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    // for slidables
    <View style={styles.rowFront2}>
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
            keyboardAppearance="dark"
            placeholderTextColor="rgb(199, 199, 204)"
          />
          <TouchableOpacity style={styles.btn1}>
            <Button
              title="submit"
              color="#121212"
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
        <Ionicon name="add-circle" size={80} style={styles.plusBtn} color="#6200EE" />
        {/* "rgb(58, 58, 60)" */}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  dark: {
    backgroundColor: 'rgb(44, 44, 46)',
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: 'rgb(199, 199, 204)',
    // textAlign: 'left',
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
    backgroundColor: '#121212',
  },
  textInput: {
    borderBottomColor: 'rgb(199, 199, 204)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 250,
    color: 'rgb(199, 199, 204)',
  },
  btn1: {
    backgroundColor: '#6A0DAD',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
  },
  btn2: {
    // color: '#6A0DAD',
    borderRadius: 15,
    borderColor: '#6A0DAD',
    borderWidth: 2,
    padding: 6,
    margin: 8,
    width: 250,
  }, // new ================
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  rowFront: {
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    // shadow
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5.46,
    elevation: 9,
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
    // ====
    // backgroundColor: 'rgb(0, 122, 255)',
  },
  backRightBtnLeft: {
    backgroundColor: 'rgb(0, 122, 255)', // apple ios colors (light)
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'rgb(255, 59, 48)', // apple ios colors (light)
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  rowFront2: {
    backgroundColor: 'rgb(0, 122, 255)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    // shadow
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
