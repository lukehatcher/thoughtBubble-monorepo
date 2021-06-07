import React, { FC, memo } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { darkMode, lightMode } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import styled from 'styled-components/native';
import { ThoughtsListProps } from '../interfaces/componentProps';

const SwipeListViewAnimated = Animated.createAnimatedComponent(SwipeListView);

export const ThoughtsList: FC<ThoughtsListProps> = memo(function ({
  renderModal,
  isDarkMode,
  thoughts,
  handleThoughtStatusChange,
  handleThoughtDelete,
  handleScroll,
}) {
  // console.log(thoughts);
  const useTheme = (name: string) => (isDarkMode ? stylesDark[name] : stylesLight[name]);
  const firstItem = thoughts[0].id;
  const lastItem = thoughts[thoughts.length - 1].id;

  const confirmDeletion = (thoughtId: string, rowMap: any, rowKey: string) => {
    Alert.alert(
      // alert color syncs with iphone dark/lightmode setting
      'Are you sure you want to delete this thought?',
      '',
      [
        {
          text: 'Confirm',
          onPress: () => {
            handleThoughtDelete(thoughtId);
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => closeRow(rowMap, rowKey),
          style: 'cancel',
        },
      ],
      { cancelable: false }, // android option
    );
  };

  const closeRow = (rowMap, rowKey) => {
    // for slidables
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

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
      add random view below with same text (but invisable) to get same height */}
        <View>
          <Text style={sharedStyles.hiddenBackText}>{data.item.text}</Text>
        </View>
        <TouchableOpacity
          style={[useTheme('backRightBtn'), useTheme('backRightBtnRight')]}
          onPress={() => {
            handleThoughtStatusChange(data.item.id);
            closeRow(rowMap, data.item.key);
          }}
        >
          <MaterialCommunityIcons name="checkbox-marked-outline" size={25} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[useTheme('backRightBtn'), useTheme('backRightBtnLeft')]}
          onPress={() => confirmDeletion(data.item.id, rowMap, data.item.key)}
        >
          <MaterialCommunityIcons name="trash-can-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* add padding to the end of the scrollview */}
      {data.item.id === lastItem ? <PaddingViewBottom /> : <></>}
    </>
  );

  const renderItem = (data) => (
    // for slidables
    // thought is data.item.text
    <>
      {/* add padding to the top of the scrollview */}
      {data.item.id === firstItem ? <PaddingView /> : <></>}
      <TouchableHighlight style={useTheme('rowFront')} underlayColor={'grey'}>
        <>
          <Text style={data.item.completed ? useTheme('textCompleted') : useTheme('text')}>{data.item.text}</Text>
          {data.item.tag ? (
            <TouchableOpacity style={sharedStyles.tagIcon} onPress={() => renderModal(data.item.key)}>
              {data.item.tag !== 'star' ? (
                <MaterialCommunityIcons name="tag" size={25} color={data.item.tag} />
              ) : (
                <MaterialCommunityIcons name="star" size={25} color="#D4AF37" />
              )}
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity style={sharedStyles.moreBtn} onPress={() => renderModal(data.item.key)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={35}
              color={isDarkMode ? darkMode.primary : lightMode.primary}
            />
          </TouchableOpacity>
        </>
      </TouchableHighlight>
      {/* add padding to the end of the scrollview */}
      {data.item.id === lastItem ? <PaddingViewBottom /> : <></>}
    </>
  );

  return (
    <>
      {/* {console.log('ThoughtList rendered')} */}
      <SwipeListViewAnimated
        data={thoughts.map((i) => ({ ...i, key: i.id }))} // SwipeListView api requires key prop
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
});

const PaddingView = styled.View`
  height: 120px;
`;

const PaddingViewBottom = styled.View`
  margin-top: 10px;
  height: 78px;
`;

const sharedStyles = StyleSheet.create({
  hiddenBackText: {
    // see notes in code
    fontSize: 20,
    padding: 15,
    color: 'rgba(0, 0, 0, 0)',
  },
  moreBtn: {
    position: 'absolute',
    right: 0,
  },
  tagIcon: {
    position: 'absolute',
    right: 30,
  },
  nothingHere: {
    marginTop: 75,
    flex: 1,
    alignItems: 'center',
  },
});

const stylesDark = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: darkMode.background,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    paddingEnd: 35,
    color: darkMode.textOnSurface,
  },
  textNothingHere: {
    color: `${darkMode.textOnBackground}40`,
    fontSize: 20,
    marginTop: 20,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    padding: 15,
    paddingEnd: 35,
    color: `${darkMode.textOnSurface}50`,
    fontSize: 20,
    flex: 1,
  },
  // === SwipeListView styles ===
  rowFront: {
    backgroundColor: darkMode.dp1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    // shape below
    marginHorizontal: 15,
    padding: 2.5,
    marginTop: 11.5,
    borderRadius: 17.5,
  },
  backRightBtn: {
    backgroundColor: 'pink',
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: darkMode.error,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    right: 50,
    width: '82%',
  },
  backRightBtnRight: {
    backgroundColor: darkMode.secondary,
    right: 0,
    borderBottomRightRadius: 17.5,
    borderTopRightRadius: 17.5,
  },
});

const stylesLight = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: lightMode.background,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    paddingEnd: 35,
    color: lightMode.textOnSurface,
  },
  textNothingHere: {
    color: `${lightMode.textOnBackground}40`,
    fontSize: 20,
    marginTop: 20,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    padding: 15,
    paddingEnd: 35,
    color: `${lightMode.textOnSurface}50`,
    fontSize: 20,
    flex: 1,
  },
  // === SwipeListView styles ===
  rowFront: {
    backgroundColor: lightMode.background,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    // shape below
    marginHorizontal: 15,
    padding: 2.5,
    marginTop: 11.5,
    borderRadius: 17.5,
    shadowColor: '#000',
    // shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
    backgroundColor: lightMode.error,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    right: 50,
    width: 100,
  },
  backRightBtnRight: {
    backgroundColor: lightMode.secondary,
    right: 0,
    borderBottomRightRadius: 17.5,
    borderTopRightRadius: 17.5,
  },
});
