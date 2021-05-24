import React, { FC, forwardRef } from 'react';
import { Animated, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { colors } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { ProjectShape } from '../interfaces/data';
import { deleteProjectAction } from '../actions/projectActions';
import { useDispatch } from 'react-redux';

interface ProjectListProps {
  userProjectsData: ProjectShape[];
  handleScroll: any;
  isDarkMode: boolean;
}

const SwipeListViewAnimated = Animated.createAnimatedComponent(SwipeListView);

export const ProjectList: FC<ProjectListProps> = ({ userProjectsData, handleScroll, isDarkMode }) => {
  const useTheme = (name: string) => (isDarkMode ? stylesDark[name] : stylesLight[name]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const firstItem = userProjectsData[0].id;

  const handleProjectDeletion = function (projectId: string) {
    dispatch(deleteProjectAction(projectId));
  };

  // const closeRow = (rowMap, rowKey) => {
  //   // for slidables
  //   if (rowMap[rowKey]) {
  //     rowMap[rowKey].closeRow();
  //   }
  // };

  const renderItem = (data) => (
    // for slidables
    <>
      {data.item.id === firstItem ? <PaddingView /> : <></>}
      <TouchableHighlight
        onPress={() => navigation.navigate('Thoughts', { projectId: data.item.id })}
        style={useTheme('rowFront')}
        underlayColor={'grey'}
      >
        <View style={sharedStyles.chevronContainer}>
          <TextStyled>{data.item.projectName}</TextStyled>
          <MaterialCommunityIcons
            name="chevron-right"
            size={40}
            color={isDarkMode ? colors.darkMode.primary : colors.lightMode.primary}
          />
        </View>
      </TouchableHighlight>
    </>
  );

  const renderHiddenItem = (data, _rowMap) => (
    // for slidables
    <>
      {/* add padding to the top of the scrollview */}
      {data.item.id === firstItem ? <PaddingView /> : <></>}
      <View
        style={{
          ...useTheme('rowFront'),
          backgroundColor: isDarkMode ? colors.darkMode.error : colors.lightMode.error,
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
    </>
  );

  return (
    <>
      {/* <PaddingView /> */}
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
    </>
  );
};

const PaddingView = styled.View`
  height: 120px;
`;

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
    padding: 15,
    color: 'rgba(0, 0, 0, 0)',
  },
});

const stylesLight = StyleSheet.create({
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
