import React, { useState } from 'react';
import { Modal, Button, View, Alert, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectAction } from '../actions/projectActions';
import { colors } from '../constants/colors';
import { AddProjectModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';

export const AddProjectModal: React.FC<AddProjectModalProps> = function ({ addProjModalView, setAddProjModalView }) {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);

  const handleProjectAddition = function (projectName: string) {
    setInput('');
    if (!projectName) {
      Alert.alert('invalid input');
      return;
    }
    dispatch(addProjectAction(projectName));
  };

  return (
    <>
      <Modal animationType="slide" visible={addProjModalView}>
        <View style={useTheme('modal')}>
          <TextInput
            onChangeText={(text) => setInput(text)}
            placeholder="Add a new project"
            multiline
            style={useTheme('textInput')}
            keyboardAppearance="dark"
            placeholderTextColor="rgb(199, 199, 204)"
          />
          <TouchableOpacity style={useTheme('btn')}>
            <Button
              title="submit"
              color={theme ? colors.darkMode.textOnPrimary : colors.lightMode.textOnPrimary}
              onPress={() => {
                setAddProjModalView(false);
                handleProjectAddition(input.trim());
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={useTheme('btn')}>
            <Button
              title="cancel"
              color={theme ? colors.darkMode.textOnPrimary : colors.lightMode.textOnPrimary}
              onPress={() => {
                setAddProjModalView(false);
              }}
            />
          </TouchableOpacity>
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
  textInput: {
    paddingTop: 15,
    paddingBottom: 15,
    padding: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.darkMode.primary,
    width: 250,
    color: colors.darkMode.textOnBackground,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: colors.darkMode.primary,
    borderRadius: 10,
    padding: 6,
    margin: 10,
    marginBottom: 10,
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
  textInput: {
    paddingTop: 15,
    paddingBottom: 15,
    padding: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.lightMode.primary,
    width: 250,
    color: colors.lightMode.textOnBackground,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: colors.lightMode.primary,
    borderRadius: 10,
    padding: 6,
    margin: 10,
    marginBottom: 10,
    width: 250,
  },
});
