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
    dispatch(addProjectAction(projectName));
  };

  const handleProjectDeletion = function (projectName: string) {
    dispatch(deleteProjectAction(projectName));
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => navigation.navigate('Todos', { projectName: data.item.projectName })}
      style={styles.rowFront}
      underlayColor={'#DDD'} // on press color
    >
      <Text style={styles.text}>{data.item.projectName}</Text>
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
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => handleProjectDeletion(data.item.projectName)}
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
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            setModalView(true);
          }}
        >
          <Ionicon name="add-circle" size={34} />
        </TouchableOpacity>
      </View>
      {/* ===================make modal component======================= */}
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
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
  },
  plusButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f2f2f2',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, // new============= below
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
