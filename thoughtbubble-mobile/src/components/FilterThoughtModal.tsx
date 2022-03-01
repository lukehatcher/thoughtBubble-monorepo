import React, { FC } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { filterProjectAction } from '../actions/projectActions';
import { darkMode, lightMode, tagColorsDark } from '../constants/colors';
import { FilterThoughtModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';
import { clearTagsAction, updateFiltersAction } from '../actions/filterActions';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { chipStyle, StatusFilters, Tags } from '../interfaces/stringLiteralTypes';
import { BlurOverlay } from './BlurOverlay';

export const FilterThoughtModal: FC<FilterThoughtModalProps> = function ({
  projectId,
  filterModalVisible,
  setFilterModalVisible,
}) {
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();
  const useTheme = (name: chipStyle) => (isDarkMode ? stylesDark[name] : stylesLight[name]);
  const filters = useSelector((state: RootState) => state.filters);

  const handleThoughtFilter = async (typeOfFilter: Tags | StatusFilters) => {
    await dispatch(updateFiltersAction(projectId, typeOfFilter));
    await dispatch(filterProjectAction(projectId, filters)); // do I HAVE to pass filters here?
  };

  const handleClearTags = async () => {
    await dispatch(clearTagsAction(projectId));
    await dispatch(filterProjectAction(projectId, filters));
  };

  const isStatusSelected = (status: StatusFilters) => {
    if (!filters.length) return false;
    return filters.find((proj) => proj.id === projectId)?.status === status;
  };

  const isTagSelected = (tag: Tags) => {
    if (!filters.length) return false;
    return filters.find((proj) => proj.id === projectId)?.tags.includes(tag);
  };

  const chipTextStyle = { color: isDarkMode ? 'white' : undefined, fontFamily: 'Inter' };

  return (
    <Modal animationType="fade" visible={filterModalVisible} transparent>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <BlurOverlay pressOutCallback={() => setFilterModalVisible(false)} />

        <ContentContainer>
          <IconButton
            icon="close"
            size={30}
            color={isDarkMode ? darkMode.primary : lightMode.primary}
            style={styles.closeBtn}
            onPress={() => setFilterModalVisible(false)}
          />
          <TitleText>Add filters</TitleText>
          <ChipContainer>
            <Chip
              selected={isStatusSelected('completed')}
              style={isStatusSelected('completed') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              selectedColor={isDarkMode ? darkMode.textOnBackground87 : 'grey'} // TODO: find a real color
              icon="check"
              onPress={() => handleThoughtFilter('completed')}
            >
              completed
            </Chip>
            <Chip
              selected={isStatusSelected('incomplete')}
              style={isStatusSelected('incomplete') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              selectedColor={isDarkMode ? darkMode.textOnBackground87 : 'grey'}
              icon="close"
              onPress={() => handleThoughtFilter('incomplete')}
            >
              incomplete
            </Chip>
            <Chip
              selected={isStatusSelected('all')}
              style={isStatusSelected('all') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              selectedColor={isDarkMode ? darkMode.textOnBackground87 : 'grey'}
              icon="eye-outline"
              onPress={() => handleThoughtFilter('all')}
            >
              view all
            </Chip>
            <Chip
              selected={isTagSelected('red')}
              style={isTagSelected('red') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              icon="tag"
              selectedColor={tagColorsDark.red}
              onPress={() => handleThoughtFilter('red')}
            >
              red
            </Chip>
            <Chip
              selected={isTagSelected('orange')}
              style={isTagSelected('orange') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              icon="tag"
              selectedColor={tagColorsDark.orange}
              onPress={() => handleThoughtFilter('orange')}
            >
              orange
            </Chip>
            <Chip
              selected={isTagSelected('green')}
              style={isTagSelected('green') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              icon="tag"
              selectedColor={tagColorsDark.green}
              onPress={() => handleThoughtFilter('green')}
            >
              green
            </Chip>
            <Chip
              selected={isTagSelected('blue')}
              style={isTagSelected('blue') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              icon="tag"
              selectedColor={tagColorsDark.blue}
              onPress={() => handleThoughtFilter('blue')}
            >
              blue
            </Chip>
            <Chip
              selected={isTagSelected('purple')}
              style={isTagSelected('purple') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              icon="tag"
              selectedColor={tagColorsDark.purple}
              onPress={() => handleThoughtFilter('purple')}
            >
              purple
            </Chip>
            <Chip
              selected={isTagSelected('favorite')}
              style={isTagSelected('favorite') ? useTheme('chipSelected') : useTheme('chip')}
              textStyle={chipTextStyle}
              icon="star"
              selectedColor={tagColorsDark.gold}
              onPress={() => handleThoughtFilter('favorite')}
            >
              favorites
            </Chip>
            <Chip
              icon="tag-off-outline"
              onPress={() => handleClearTags()}
              style={useTheme('chip')}
              textStyle={chipTextStyle}
              selectedColor={isDarkMode ? darkMode.textOnBackground87 : 'grey'}
            >
              remove all tags
            </Chip>
          </ChipContainer>
        </ContentContainer>
      </View>
    </Modal>
  );
};

const ContentContainer = styled.View`
  align-items: center;
  background-color: ${(props) => props.theme.background};
  padding-bottom: 15px;
  margin: 15px;
  margin-top: 300px;
  border-radius: 15px;
`;

const TitleText = styled.Text`
  font-family: Inter;
  color: ${(props) => props.theme.textOnBackground};
  font-size: 17px;
  margin: 15px;
`;

const ChipContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const stylesDark = StyleSheet.create({
  chip: {
    margin: 5,
    backgroundColor: darkMode.dp2,
    borderColor: darkMode.dp2,
    borderWidth: 1,
  },
  chipSelected: {
    margin: 5,
    borderColor: darkMode.primary,
    borderWidth: 1,
    backgroundColor: darkMode.dp2,
  },
});

const stylesLight = StyleSheet.create({
  chip: {
    backgroundColor: lightMode.background,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  chipSelected: {
    backgroundColor: '#eee', // TODO: extract
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  closeBtn: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    height: 35,
    width: 35,
  },
});
