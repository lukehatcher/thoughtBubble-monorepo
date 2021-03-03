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
import { StackNavigationProp } from '@react-navigation/stack';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { RootState } from '../reducers/rootReducer'; // type
import { StackParamList } from './ProjectsNavStack';
import { addProjectAction, deleteProjectAction } from '../actions/projectActions';

interface ProjectsScreenProps {
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
    setInput('');
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
      onPress={() => navigation.navigate('Thoughts', { projectName: data.item.projectName })}
      style={styles.rowFront}
      underlayColor={'grey'}
    >
      <Text style={styles.text}>{data.item.projectName}</Text>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    // for slidables
    <View style={{ ...styles.rowFront, backgroundColor: 'rgb(0, 122, 255)' }}>
      {/* to match height of back view to the dynamic front view height,
      add random view below with same text (but invisable) to get same height */}
      <View>
        <Text style={styles.hiddenBackText}>{data.item.projectName}</Text>
      </View>
      {/* // to match heights */}
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
      <View style={styles.container}>
        <SwipeListView
          data={userProjectsData.map((i) => ({ ...i, key: i._id.toString() }))} // swipeviewlist api requires key prop
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe
          closeOnScroll
          recalculateHiddenLayout={true}
          rightOpenValue={-150}
          previewOpenValue={-40}
        />
      </View>
      {/* ======= modal ======= */}
      <Modal animationType="slide" visible={modalView}>
        <View style={styles.modal}>
          <TextInput
            onChangeText={(text) => setInput(text)}
            placeholder="add a new project..."
            multiline
            style={styles.textInput}
            keyboardAppearance="dark"
            placeholderTextColor="rgb(199, 199, 204)"
          />
          <TouchableOpacity style={styles.btn1}>
            <Button
              title="submit"
              color="black"
              onPress={() => {
                setModalView(false);
                handleProjectAddition(input.trim());
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn2}>
            <Button
              title="cancel"
              color="white"
              onPress={() => {
                setModalView(false);
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.plusBtnContainer} onPress={() => setModalView(true)}>
        <Ionicon name="add-circle" size={80} style={styles.plusBtn} color="#6200EE" />
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
  },
  plusBtnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  plusBtn: {
    shadowColor: '#000',
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
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 250,
    color: 'white',
  },
  btn1: {
    backgroundColor: '#6200EE',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
  },
  btn2: {
    // color: '#6A0DAD',
    borderRadius: 15,
    borderColor: '#6200EE',
    borderWidth: 2,
    padding: 6,
    margin: 8,
    width: 250,
  }, // new ================
  container: {
    // holds the guys
    flex: 1,
    backgroundColor: '#121212',
  },
  rowFront: {
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto', // !!!!!!!!!
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
    flexWrap: 'wrap',
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
  hiddenBackText: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: 'rgba(0, 0, 0, 0)',
  },
});
