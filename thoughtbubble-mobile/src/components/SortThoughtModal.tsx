import React, { FC, useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectDataAction } from '../actions/fetchProjectDataAction';
import { filterThoughtsAction } from '../actions/filterActions';
import { colors } from '../constants/colors';
import { SortThoughtModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';
import { Chip, IconButton } from 'react-native-paper';

interface Filters {
  status: string;
  tags: string[];
}

const statusFilters = ['all', 'incomplete', 'completed'];

export const SortThoughtModal: FC<SortThoughtModalProps> = function ({ projectId, sortModalView, setSortModalView }) {
  const dispatch = useDispatch();
  const userSub = useSelector((state: RootState) => state.storedUser.sub);
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);
  // const [red, setRed] = useState(false);
  const filters: Filters = { status: 'all', tags: [] };
  // keep filters in redux state

  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);

  const handleThoughtFilter = (typeOfFilter: string) => {
    if (statusFilters.includes(typeOfFilter)) {
      filters.status = typeOfFilter;
    } else {
      if (filters.tags.includes(typeOfFilter)) filters.tags.filter((i) => i !== typeOfFilter);
      // toggle
      else filters.tags.push(typeOfFilter);
    }
    dispatch(filterThoughtsAction(projectId, filters));
  };

  return (
    <>
      <Modal animationType="fade" visible={sortModalView}>
        <View style={useTheme('modal')}>
          <Text style={useTheme('text')}>add filters</Text>
          <Chip icon="check" onPress={() => handleThoughtFilter('completed')}>
            completed
          </Chip>
          <Chip icon="close" onPress={() => handleThoughtFilter('incomplete')}>
            incomplete
          </Chip>
          <Chip icon="eye-outline" onPress={() => handleThoughtFilter('all')}>
            view all
          </Chip>
          <Chip selected={true} selectedColor="red" icon="tag" onPress={() => handleThoughtFilter('red')}>
            red
          </Chip>
          <Chip icon="tag" selectedColor="orange" onPress={() => handleThoughtFilter('orange')}>
            orange
          </Chip>
          <Chip icon="tag" selectedColor="green" onPress={() => handleThoughtFilter('green')}>
            green
          </Chip>
          <Chip icon="tag" selectedColor="blue" onPress={() => handleThoughtFilter('blue')}>
            blue
          </Chip>
          <Chip icon="tag" selectedColor="purple" onPress={() => handleThoughtFilter('purple')}>
            purple
          </Chip>
          <Chip icon="star" selectedColor="#D4AF37" onPress={() => handleThoughtFilter('purple')}>
            favorites
          </Chip>
          <Chip
            icon="alert-circle-outline"
            onPress={() => console.log('Pressed')}
            onClose={() => console.log('closed')}
          >
            remove all filters
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
