import React, { FC } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Chip, IconButton } from 'react-native-paper';
import { filterProjectAction } from '../actions/projectActions';
import { colors } from '../constants/colors';
import { SortThoughtModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';
import { clearTagsAction, updateFiltersAction } from '../actions/filterActions';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { StatusFilters } from '../interfaces/stringLiteralTypes';

const { darkMode, lightMode } = colors;

export const SortThoughtModal: FC<SortThoughtModalProps> = function ({ projectId, sortModalView, setSortModalView }) {
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();
  const useTheme = (name: string) => (isDarkMode ? stylesDark[name] : stylesLight[name]);
  const filters = useSelector((state: RootState) => state.filters);

  const handleThoughtFilter = async function (typeOfFilter: string) {
    await dispatch(updateFiltersAction(projectId, typeOfFilter));
    await dispatch(filterProjectAction(projectId, filters)); // do I HAVE to pass filters here?
  };

  const handleClearTags = async function () {
    await dispatch(clearTagsAction(projectId));
    await dispatch(filterProjectAction(projectId, filters));
  };

  const isStatusSelected = function (status: StatusFilters) {
    if (!filters.length) return false;
    return filters.find((proj) => proj.id === projectId).status === status;
  };

  const isTagSelected = function (tag: string) {
    if (!filters.length) return false;
    return filters.find((proj) => proj.id === projectId).tags.includes(tag);
  };

  return (
    <Modal animationType="slide" visible={sortModalView}>
      {/* note: adding the modal flex styles to the parent modal did not work, needs child view modal */}
      <View style={useTheme('modal')}>
        <Text style={useTheme('text')}>add filters</Text>
        <View style={sharedStyles.chipContainer}>
          <Chip
            selected={isStatusSelected('completed')}
            style={isStatusSelected('completed') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            selectedColor={isDarkMode ? darkMode.textOnBackground87 : null}
            icon="check"
            onPress={() => handleThoughtFilter('completed')}
          >
            completed
          </Chip>
          <Chip
            selected={isStatusSelected('incomplete')}
            style={isStatusSelected('incomplete') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            selectedColor={isDarkMode ? darkMode.textOnBackground87 : null}
            icon="close"
            onPress={() => handleThoughtFilter('incomplete')}
          >
            incomplete
          </Chip>
          <Chip
            selected={isStatusSelected('all')}
            style={isStatusSelected('all') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            selectedColor={isDarkMode ? darkMode.textOnBackground87 : null}
            icon="eye-outline"
            onPress={() => handleThoughtFilter('all')}
          >
            view all
          </Chip>
          <Chip
            selected={isTagSelected('red')}
            style={isTagSelected('red') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            selectedColor="red"
            icon="tag"
            onPress={() => handleThoughtFilter('red')}
          >
            red
          </Chip>
          <Chip
            selected={isTagSelected('orange')}
            style={isTagSelected('orange') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            icon="tag"
            selectedColor="orange"
            onPress={() => handleThoughtFilter('orange')}
          >
            orange
          </Chip>
          <Chip
            selected={isTagSelected('green')}
            style={isTagSelected('green') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            icon="tag"
            selectedColor="green"
            onPress={() => handleThoughtFilter('green')}
          >
            green
          </Chip>
          <Chip
            selected={isTagSelected('blue')}
            style={isTagSelected('blue') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            icon="tag"
            selectedColor="blue"
            onPress={() => handleThoughtFilter('blue')}
          >
            blue
          </Chip>
          <Chip
            selected={isTagSelected('purple')}
            style={isTagSelected('purple') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            icon="tag"
            selectedColor="purple"
            onPress={() => handleThoughtFilter('purple')}
          >
            purple
          </Chip>
          <Chip
            selected={isTagSelected('star')}
            style={isTagSelected('star') ? useTheme('chipSelected') : useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            icon="star"
            selectedColor="#D4AF37"
            onPress={() => handleThoughtFilter('star')}
          >
            favorites
          </Chip>
          <Chip
            icon="tag-off-outline"
            onPress={() => handleClearTags()}
            style={useTheme('chip')}
            textStyle={isDarkMode ? { color: 'white' } : null}
            selectedColor={isDarkMode ? darkMode.textOnBackground87 : null}
          >
            remove all tags
          </Chip>
        </View>
      </View>
      <IconButton
        icon="close"
        size={50}
        color={isDarkMode ? darkMode.primary : lightMode.primary}
        style={sharedStyles.closeBtn}
        onPress={() => setSortModalView(false)}
      />
    </Modal>
  );
};

const sharedStyles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesDark = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkMode.background,
  },
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
  text: {
    fontSize: 17.5,
    marginBottom: 25,
    color: darkMode.textOnBackground,
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightMode.background,
  },
  text: {
    fontSize: 17.5,
    marginBottom: 25,
    color: lightMode.textOnBackground,
  },
});
