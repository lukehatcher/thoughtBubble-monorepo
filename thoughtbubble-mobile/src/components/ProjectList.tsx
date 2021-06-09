import React, { FC, useState, memo } from 'react';
import { Animated, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { darkMode, lightMode } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { ArchiveDeleteModal } from './ArchiveDeleteModal';
import { ProjectListProps } from '../interfaces/componentProps';
import { ProjectLongPressModal } from './ProjectLongPressModal';

const SwipeListViewAnimated = Animated.createAnimatedComponent(SwipeListView);

export const ProjectList: FC<ProjectListProps> = memo(function ({ userProjectsData, handleScroll, isDarkMode }) {
  const [longPressModalVisible, setLongPressModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [focusedProjectId, setFocusedProjectId] = useState('');
  const [focusedRowMap, setFocusedRowMap] = useState(null); // needs better typing
  const [focusedRowKey, setFocusedRowKey] = useState('');
  const useTheme = (name: string) => (isDarkMode ? stylesDark[name] : stylesLight[name]);
  const navigation = useNavigation();
  const firstItem = userProjectsData[0].id;
  const lastItem = userProjectsData[userProjectsData.length - 1].id;

  const handleProjectDeletionPress = function (projectId: string, rowMap: any, rowKey: string): void {
    // on press, want to render modal to give user option to archive, delete, or cancel
    setFocusedProjectId(projectId);
    setFocusedRowMap(rowMap);
    setFocusedRowKey(rowKey);
    setModalVisible(true);
  };

  const handleLongPress = function (projectId: string): void {
    setFocusedProjectId(projectId);
    setLongPressModalVisible(true);
  };

  const closeRow = (rowMap, rowKey): void => {
    // for slidables
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = (data) => (
    // for slidables
    <>
      {data.item.id === firstItem ? <PaddingView /> : <></>}
      <TouchableHighlight
        onPress={() => navigation.navigate('Thoughts', { projectId: data.item.id })}
        style={useTheme('rowFront')}
        underlayColor={isDarkMode ? darkMode.dp2 : '#eee'}
        onLongPress={() => handleLongPress(data.item.id)}
      >
        <View style={sharedStyles.chevronContainer}>
          <TextStyled>{data.item.projectName}</TextStyled>
          {data.item.pinned ? (
            <MaterialCommunityIcons
              name="pin-outline"
              size={30}
              color={isDarkMode ? darkMode.error : lightMode.error}
            />
          ) : (
            <></>
          )}
          <MaterialCommunityIcons
            name="chevron-right"
            size={40}
            color={isDarkMode ? darkMode.primary : lightMode.primary}
          />
        </View>
      </TouchableHighlight>
      {/* add padding to the end of the scrollview */}
      {data.item.id === lastItem ? <PaddingViewBottom /> : <></>}
    </>
  );

  const renderHiddenItem = (data, rowMap) => (
    // for slidables
    <>
      {/* add padding to the top of the scrollview */}
      {data.item.id === firstItem ? <PaddingView /> : <></>}
      <View
        style={{
          ...useTheme('rowFront'),
        }}
      >
        {/* to match height of back view to the dynamic front view height,
      add random view below with same text (but invisible) to get same height */}
        <View>
          <Text style={useTheme('hiddenBackText')}>{data.item.projectName}</Text>
        </View>
        <TouchableOpacity
          style={[useTheme('backRightBtn')]}
          onPress={() => handleProjectDeletionPress(data.item.id, rowMap, data.item.key)}
        >
          <MaterialCommunityIcons name="minus-circle-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* add padding to the end of the scrollview */}
      {data.item.id === lastItem ? <PaddingViewBottom /> : <></>}
    </>
  );

  return (
    <>
      <SwipeListViewAnimated
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
        onScroll={handleScroll}
        scrollEventThrottle={1}
        style={{ flex: 1 }}
      />
      <ArchiveDeleteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        focusedProjectId={focusedProjectId}
        focusedRowMap={focusedRowMap}
        focusedRowKey={focusedRowKey}
        closeRow={closeRow}
      />
      <ProjectLongPressModal
        longPressModalVisible={longPressModalVisible}
        setLongPressModalVisible={setLongPressModalVisible}
        focusedProjectId={focusedProjectId}
      />
    </>
  );
});

const PaddingView = styled.View`
  height: 120px;
`;
const PaddingViewBottom = styled.View`
  margin-top: 10px;
  height: 78px;
`;

const sharedStyles = StyleSheet.create({
  chevronContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const stylesDark = StyleSheet.create({
  rowFront: {
    backgroundColor: darkMode.dp1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto', // !!!!!!!!!
    flexWrap: 'wrap',
    // shape below
    marginTop: 11.5,
    marginHorizontal: 15,
    borderRadius: 17.5,
    padding: 10,
  },
  backRightBtn: {
    position: 'absolute',
    paddingRight: 20,
    top: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '99%',
    backgroundColor: darkMode.error,
    // change colors to see why all these styles are necesary
    // backgroundColor: darkMode.error,
    right: 0,
    borderBottomRightRadius: 17.5,
    borderTopRightRadius: 17.5,
    // helps remove red edge but doesnt solve it 100%
    borderColor: darkMode.background,
    borderWidth: 1,
  },
  hiddenBackText: {
    fontSize: 20,
    padding: 15,
    color: 'rgba(0, 0, 0, 0)',
  },
});

const stylesLight = StyleSheet.create({
  rowFront: {
    backgroundColor: lightMode.background,
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto', // !!!!!!!!!
    flexWrap: 'wrap',
    // shape below
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 17.5,
    padding: 10,
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
    width: '99%',
    backgroundColor: lightMode.error,
    // change colors to see why all these styles are necesary
    // backgroundColor: lightMode.error,
    right: 0,
    borderBottomRightRadius: 17.5,
    borderTopRightRadius: 17.5,
    // helps remove red edge but doesnt solve it 100%
    borderColor: lightMode.background,
    borderWidth: 1,
  },
  hiddenBackText: {
    fontSize: 20,
    padding: 15,
    color: 'rgba(0, 0, 0, 0)',
  },
});

const TextStyled = styled.Text`
  font-size: 20px;
  flex: 1;
  padding: 15px;
  color: ${(props) => props.theme.textOnSurface};
`;
