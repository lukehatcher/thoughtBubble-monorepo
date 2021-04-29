import React, { FC } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, IconButton } from 'react-native-paper';
import { filterProjectAction } from '../actions/projectActions';
import { colors } from '../constants/colors';
import { SortThoughtModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';
import { clearTagsAction, updateFiltersAction } from '../actions/filterActions';

export const SortThoughtModal: FC<SortThoughtModalProps> = function ({ projectId, sortModalView, setSortModalView }) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);
  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);
  const filters = useSelector((state: RootState) => state.filters);

  const handleThoughtFilter = async function (typeOfFilter: string) {
    await dispatch(updateFiltersAction(projectId, typeOfFilter));
    await dispatch(filterProjectAction(projectId, filters)); // do I need to pass filters here?
  };

  const handleClearTags = async function () {
    await dispatch(clearTagsAction(projectId));
    await dispatch(filterProjectAction(projectId, filters));
  };

  const isStatusSelected = function (status: string) {
    if (!filters.length) return false;
    return filters.find((proj) => proj.id === projectId).status === status;
  };

  const isTagSelected = function (tag: string) {
    if (!filters.length) return false;
    return filters.find((proj) => proj.id === projectId).tags.includes(tag);
  };

  return (
    <>
      <Modal animationType="fade" visible={sortModalView}>
        <View style={useTheme('modal')}>
          <Text style={useTheme('text')}>add filters</Text>
          <Chip
            selected={isStatusSelected('completed')} //
            icon="check"
            onPress={() => handleThoughtFilter('completed')}
          >
            completed
          </Chip>
          <Chip
            selected={isStatusSelected('incomplete')}
            icon="close"
            onPress={() => handleThoughtFilter('incomplete')}
          >
            incomplete
          </Chip>
          <Chip
            selected={isStatusSelected('all')} //
            icon="eye-outline"
            onPress={() => handleThoughtFilter('all')}
          >
            view all
          </Chip>
          <Chip
            selected={isTagSelected('red')}
            selectedColor="red"
            icon="tag"
            onPress={() => handleThoughtFilter('red')}
          >
            red
          </Chip>
          <Chip
            selected={isTagSelected('orange')}
            icon="tag"
            selectedColor="orange"
            onPress={() => handleThoughtFilter('orange')}
          >
            orange
          </Chip>
          <Chip
            selected={isTagSelected('green')}
            icon="tag"
            selectedColor="green"
            onPress={() => handleThoughtFilter('green')}
          >
            green
          </Chip>
          <Chip
            selected={isTagSelected('blue')}
            icon="tag"
            selectedColor="blue"
            onPress={() => handleThoughtFilter('blue')}
          >
            blue
          </Chip>
          <Chip
            selected={isTagSelected('purple')}
            icon="tag"
            selectedColor="purple"
            onPress={() => handleThoughtFilter('purple')}
          >
            purple
          </Chip>
          <Chip
            selected={isTagSelected('star')}
            icon="star"
            selectedColor="#D4AF37"
            onPress={() => handleThoughtFilter('star')}
          >
            favorites
          </Chip>
          <Chip icon="tag-off-outline" onPress={() => handleClearTags()}>
            remove all tags
          </Chip>
          <IconButton
            icon="close"
            size={50}
            color={theme ? colors.darkMode.primary : colors.lightMode.primary}
            style={sharedStyles.closeBtn}
            onPress={() => setSortModalView(false)}
          />
        </View>
      </Modal>
    </>
  );
};

const sharedStyles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
});

const stylesDark = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkMode.background,
  },
  text: {
    color: colors.darkMode.textOnBackground,
  },
  btn: {
    borderRadius: 15,
    borderColor: colors.darkMode.primary,
    borderWidth: 2,
    padding: 6,
    margin: 8,
    width: 250,
  },
});

const stylesLight = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightMode.background,
  },
  text: {
    color: colors.lightMode.textOnBackground,
  },
  btn: {
    borderRadius: 15,
    borderColor: colors.lightMode.primary,
    borderWidth: 2,
    padding: 6,
    margin: 8,
    width: 250,
  },
});
