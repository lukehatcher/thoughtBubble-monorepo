import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectDataAction } from '../actions/fetchProjectDataAction';
import { filtertThoughtsAction } from '../actions/filterActions';
import { colors } from '../constants/colors';
import { SortThoughtModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';

export const SortThoughtModal: FC<SortThoughtModalProps> = function ({ projectId, sortModalView, setSortModalView }) {
  const dispatch = useDispatch();
  const userSub = useSelector((state: RootState) => state.storedUser.sub);
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);

  const handleThoughtFilter = (typeOfFilter: string) => {
    if (typeOfFilter === 'all') dispatch(fetchProjectDataAction(userSub));
    dispatch(filtertThoughtsAction(projectId, typeOfFilter));
  };

  return (
    <>
      <Modal animationType="fade" visible={sortModalView}>
        <View style={useTheme('modal')}>
          <Text style={useTheme('text')}>filter by status</Text>
          <TouchableOpacity style={useTheme('btn')}>
            <Button
              color={theme ? colors.darkMode.textOnBackground : colors.lightMode.textOnBackground}
              title="completed"
              onPress={() => handleThoughtFilter('completed')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={useTheme('btn')}>
            <Button
              color={theme ? colors.darkMode.textOnBackground : colors.lightMode.textOnBackground}
              title="in progress"
              onPress={() => handleThoughtFilter('incomplete')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={useTheme('btn')}>
            <Button
              color={theme ? colors.darkMode.textOnBackground : colors.lightMode.textOnBackground}
              title="view all"
              onPress={() => handleThoughtFilter('all')}
            />
          </TouchableOpacity>
          <Text style={useTheme('text')}>filter by color</Text>
          <Button color="red" title="close" onPress={() => setSortModalView(false)} />
        </View>
      </Modal>
    </>
  );
};

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
