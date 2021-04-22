import React, { useState } from 'react';
import { Modal, View, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextInput } from 'react-native-paper';
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
            mode="outlined"
            label="new project"
            value={input}
            onChangeText={(input) => setInput(input)}
            placeholder="Add a new project"
            multiline
            style={useTheme('textInput')}
            theme={{
              colors: {
                primary: theme ? colors.darkMode.primary : colors.lightMode.primary,
                text: theme ? colors.darkMode.textOnSurface : colors.lightMode.textOnBackground,
                placeholder: theme ? `${colors.darkMode.textOnSurface}87` : `${colors.lightMode.textOnBackground}87`,
              },
            }}
            keyboardAppearance="dark"
          />
          <Button
            mode="contained"
            icon="folder-upload-outline"
            color={theme ? colors.darkMode.primary : colors.lightMode.primary}
            onPress={() => {
              setAddProjModalView(false);
              handleProjectAddition(input.trim());
            }}
            style={useTheme('btn')}
          >
            add project
          </Button>
          <Button
            mode="contained"
            icon="close-thick"
            color={theme ? colors.darkMode.primary : colors.lightMode.primary}
            onPress={() => {
              setAddProjModalView(false);
            }}
            style={useTheme('btn')}
          >
            close
          </Button>
        </View>
      </Modal>
    </>
  );
};

const sharedStyles = StyleSheet.create({
  //
});

const stylesDark = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkMode.background,
  },
  textInput: {
    color: 'white',
    backgroundColor: colors.darkMode.dp1,
    width: 250,
    marginBottom: 10,
  },
  btn: {
    marginBottom: 10,
    // width: 250,
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
    backgroundColor: colors.lightMode.background,
    width: 250,
    marginBottom: 10,
  },
  btn: {
    marginBottom: 10,
    // width: 250,
  },
});
