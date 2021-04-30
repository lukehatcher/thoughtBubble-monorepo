import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, LogBox } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB } from 'react-native-paper';
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

  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);

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
      style={useTheme('rowFront')}
      underlayColor={'grey'}
    >
      <View style={sharedStyles.chevronContainer}>
        <Text style={useTheme('text')}>{data.item.projectName}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={40}
          color={theme ? colors.darkMode.primary : colors.lightMode.primary}
        />
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, _rowMap) => (
    // for slidables
    <View
      style={{
        ...useTheme('rowFront'),
        backgroundColor: theme ? colors.darkMode.error : colors.lightMode.error,
      }}
    >
      {/* to match height of back view to the dynamic front view height,
      add random view below with same text (but invisable) to get same height */}
      <View>
        <Text style={useTheme('hiddenBackText')}>{data.item.projectName}</Text>
      </View>
      <TouchableOpacity
        style={[useTheme('backRightBtn'), useTheme('backRightBtnRight')]}
        onPress={() => handleProjectDeletion(data.item.id)}
      >
        <MaterialCommunityIcons name="trash-can-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );

  // https://github.com/jemise111/react-native-swipe-list-view/issues/388
  LogBox.ignoreLogs(["Sending 'onAnimatedValueUpdate' with no listeners registered"]);

  return (
    <>
      <View style={useTheme('mainContainer')}>
        {userProjectsData.length ? (
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
        ) : (
          // if user has no projects, this message + icon pops up
          <View style={sharedStyles.nothingHere}>
            <MaterialCommunityIcons
              name="thought-bubble"
              size={125}
              color={theme ? `${colors.darkMode.textOnBackground}20` : `${colors.lightMode.textOnBackground}20`}
            />
            <Text style={useTheme('textNothingHere')}>oops, theres nothing to see here... yet</Text>
          </View>
        )}
      </View>
      <AddProjectModal addProjModalView={addProjModalView} setAddProjModalView={setAddProjModalView} />
      <FAB style={sharedStyles.fab} icon="plus" onPress={() => setAddProjModalView(true)} label="new project" />
    </>
  );
};

const sharedStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
  },
  nothingHere: {
    marginTop: 75,
    flex: 1,
    alignItems: 'center',
  },
  chevronContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'grey',
  },
});

const stylesDark = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.darkMode.background,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: colors.darkMode.textOnSurface,
  },
  textNothingHere: {
    color: `${colors.darkMode.textOnBackground}40`,
    fontSize: 20,
    marginTop: 20,
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
    position: 'absolute',
    paddingRight: 20,
    top: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 155,
  },
  backRightBtnRight: {
    // change colors to see why all these styles are necesary
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

const stylesLight = StyleSheet.create({
  mainContainer: {
    // main background
    flex: 1,
    backgroundColor: colors.lightMode.background,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    color: colors.lightMode.textOnSurface,
  },
  textNothingHere: {
    color: `${colors.lightMode.textOnBackground}40`,
    fontSize: 20,
    marginTop: 20,
  },
  rowFront: {
    backgroundColor: colors.lightMode.background,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto', // !!!!!!!!!
    marginTop: 15,
    marginHorizontal: 10,
    flexWrap: 'wrap',
    borderRadius: 10,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  backRightBtn: {
    position: 'absolute',
    paddingRight: 20,
    top: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 155,
  },
  backRightBtnRight: {
    backgroundColor: colors.lightMode.error,
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
