import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, LogBox } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { RootState } from '../reducers/rootReducer'; // type
import { ProjectsScreenProps } from '../interfaces/componentProps'; // type
import { deleteProjectAction } from '../actions/projectActions';
import { colors } from '../constants/colors';
import { AddProjectModal } from './AddProjectModal';

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ navigation }) => {
  const [addProjModalView, setAddProjModalView] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);
  let userProjectsData = useSelector((state: RootState) => state.userProjectData);

  const handleProjectDeletion = function (projectId: string) {
    dispatch(deleteProjectAction(projectId));
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
      onPress={() => navigation.navigate('Thoughts', { projectId: data.item.id })}
      style={styles.rowFront}
      underlayColor={'grey'}
    >
      <Text style={styles.text}>{data.item.projectName}</Text>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    // for slidables
    <View
      style={{
        ...styles.rowFront,
        backgroundColor: theme ? colors.darkMode.primary : colors.lightMode.primary,
      }}
    >
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
        onPress={() => handleProjectDeletion(data.item.id)} // id
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
          data={userProjectsData.map((i) => ({ ...i, key: i.id }))} // swipeviewlist api requires key prop
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          recalculateHiddenLayout
          disableRightSwipe
          closeOnScroll
          closeOnRowBeginSwipe
          closeOnRowPress
          rightOpenValue={-150}
          previewOpenValue={-40}
        />
      </View>
      <AddProjectModal addProjModalView={addProjModalView} setAddProjModalView={setAddProjModalView} />
      <TouchableOpacity style={styles.plusBtnContainer} onPress={() => setAddProjModalView(true)}>
        <Ionicon name="add-circle" size={80} style={styles.plusBtn} color={colors.darkMode.secondary} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // main background
    flex: 1,
    backgroundColor: colors.darkMode.background,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: colors.darkMode.textOnSurface,
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
  rowFront: {
    backgroundColor: colors.darkMode.dp1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto', // !!!!!!!!!
    marginTop: 15,
    marginHorizontal: 10,
    flexWrap: 'wrap',
    borderRadius: 10,
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
    backgroundColor: colors.darkMode.primary,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: colors.darkMode.error,
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
