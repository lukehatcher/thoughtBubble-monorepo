import React, { FC } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ThoughtShape } from '../interfaces/data';
import styled from 'styled-components/native';

const { darkMode, lightMode } = colors;

const SwipeListViewAnimated = Animated.createAnimatedComponent(SwipeListView);

interface ThoughtsListProps {
  renderModal: (thoughtId: string) => void;
  isDarkMode: boolean;
  thoughts: ThoughtShape[];
  handleThoughtStatusChange: (thoughtId: string) => void;
  handleThoughtDelete: (thoughtId: string) => void;
  handleScroll: any;
}

export const ThoughtsList: FC<ThoughtsListProps> = function ({
  renderModal,
  isDarkMode,
  thoughts,
  handleThoughtStatusChange,
  handleThoughtDelete,
  handleScroll,
}) {
  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);
  const theme = {
    // for styled-components ThemeProvider
    background: isDarkMode ? darkMode.background : lightMode.background,
    primary: isDarkMode ? darkMode.primary : lightMode.primary,
    primaryVariant: isDarkMode ? darkMode.primaryVariant : lightMode.primaryVariant,
    secondary: isDarkMode ? darkMode.secondary : lightMode.secondary,
    textOnBackground: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
    textOnSurface: isDarkMode ? darkMode.textOnSurface : lightMode.textOnSurface,
    dp1: isDarkMode ? darkMode.dp1 : lightMode.background,
  };
  const firstItem = thoughts[0].id;

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
          backgroundColor: theme ? colors.darkMode.error : colors.lightMode.error,
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
          onPress={() => handleThoughtDelete(data.item.id)}
        >
          <MaterialCommunityIcons name="trash-can-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
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
              color={theme ? colors.darkMode.primary : colors.lightMode.primary}
            />
          </TouchableOpacity>
        </>
      </TouchableHighlight>
    </>
  );

  return (
    <>
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
};

const PaddingView = styled.View`
  height: 120px;
`;

const sharedStyles = StyleSheet.create({
  // styles not effected by light/dark mode
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
  },
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
    backgroundColor: colors.darkMode.background,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    paddingEnd: 35,
    color: colors.darkMode.textOnSurface,
  },
  textNothingHere: {
    color: `${colors.darkMode.textOnBackground}40`,
    fontSize: 20,
    marginTop: 20,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    padding: 15,
    paddingEnd: 35,
    color: `${colors.darkMode.textOnSurface}50`,
    fontSize: 20,
    flex: 1,
  },
  // === SwipeListView styles ===
  rowFront: {
    backgroundColor: colors.darkMode.dp1,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
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
    backgroundColor: colors.darkMode.error,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    right: 50,
    width: 100,
  },
  backRightBtnRight: {
    backgroundColor: colors.darkMode.secondary,
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});

// ============================================================================

const stylesLight = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightMode.background,
  },
  text: {
    fontSize: 20,
    flex: 1,
    padding: 15,
    paddingEnd: 35,
    color: colors.lightMode.textOnSurface,
  },
  textNothingHere: {
    color: `${colors.lightMode.textOnBackground}40`,
    fontSize: 20,
    marginTop: 20,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    padding: 15,
    paddingEnd: 35,
    color: `${colors.lightMode.textOnSurface}50`,
    fontSize: 20,
    flex: 1,
  },
  // === SwipeListView styles ===
  rowFront: {
    backgroundColor: colors.lightMode.background,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
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
    backgroundColor: colors.lightMode.error,
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
    right: 50,
    width: 100,
  },
  backRightBtnRight: {
    backgroundColor: colors.lightMode.secondary,
    right: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
