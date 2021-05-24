import React, { FC, forwardRef } from 'react';
import { Animated, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { colors } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

interface ProjectListProps {
  userProjectsData: any[];
  handleScroll: any;
}

const SwipeListViewAnimated = Animated.createAnimatedComponent(SwipeListView);

export class ProjectList extends React.Component<ProjectListProps> {
  constructor(props) {
    super(props);
  }

  // private isDarkMode = useDarkCheck();
  private isDarkMode = true;
  private useTheme = (name: string) => (this.isDarkMode ? stylesDark[name] : stylesLight[name]);
  // private navigation = useNavigation();

  private renderItem = (data) => (
    // for slidables
    <TouchableHighlight
      // onPress={() => this.navigation.navigate('Thoughts', { projectId: data.item.id })}
      style={this.useTheme('rowFront')}
      underlayColor={'grey'}
    >
      <View style={sharedStyles.chevronContainer}>
        <TextStyled>{data.item.projectName}</TextStyled>
        <MaterialCommunityIcons
          name="chevron-right"
          size={40}
          color={this.isDarkMode ? colors.darkMode.primary : colors.lightMode.primary}
        />
      </View>
    </TouchableHighlight>
  );

  private renderHiddenItem = (data, _rowMap) => (
    // for slidables
    <View
      style={{
        ...this.useTheme('rowFront'),
        backgroundColor: this.isDarkMode ? colors.darkMode.error : colors.lightMode.error,
      }}
    >
      {/* to match height of back view to the dynamic front view height,
      add random view below with same text (but invisable) to get same height */}
      <View>
        {console.log('hihihi')}
        <Text style={this.useTheme('hiddenBackText')}>{data.item.projectName}</Text>
      </View>
      <TouchableOpacity
        style={[this.useTheme('backRightBtn'), this.useTheme('backRightBtnRight')]}
        // onPress={() => handleProjectDeletion(data.item.id)}
      >
        <MaterialCommunityIcons name="trash-can-outline" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <SwipeListViewAnimated
        data={this.props.userProjectsData.map((i) => ({ ...i, key: i.id }))} // swipeviewlist api requires key prop
        renderItem={this.renderItem}
        renderHiddenItem={this.renderHiddenItem}
        recalculateHiddenLayout
        disableRightSwipe
        closeOnScroll
        closeOnRowBeginSwipe
        closeOnRowPress
        rightOpenValue={-150}
        previewOpenValue={-40}
        onScroll={this.props.handleScroll}
        scrollEventThrottle={1}
        style={{ flex: 1, paddingTop: 130 }}
      />
    );
  }
}

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
    flex: 1,
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
    flex: 1,
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
