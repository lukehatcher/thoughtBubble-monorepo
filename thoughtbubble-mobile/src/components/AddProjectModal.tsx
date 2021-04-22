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
            placeholder="add a new project..."
            multiline
            style={useTheme('textInput')}
            keyboardAppearance="dark"
            placeholderTextColor="rgb(199, 199, 204)"
          />
          <TouchableOpacity style={useTheme('btn1')}>
            <Button
              title="submit"
              color="black"
              onPress={() => {
                setAddProjModalView(false);
                handleProjectAddition(input.trim());
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={useTheme('btn2')}>
            <Button
              title="cancel"
              color="white"
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
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 250,
    color: 'white',
  },
  btn1: {
    backgroundColor: '#6200EE',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
  },
  btn2: {
    borderRadius: 15,
    borderColor: '#6200EE',
    borderWidth: 2,
    padding: 6,
    margin: 8,
    width: 250,
  },
});

const stylesLight = StyleSheet.create({
  //
});
