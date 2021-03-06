import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, IconButton, TextInput, HelperText } from 'react-native-paper';
import { addProjectAction } from '../actions/projectActions';
import { darkMode, lightMode } from '../constants/colors';
import { AddProjectModalProps } from '../interfaces/componentProps';
import { useDarkCheck } from '../hooks/useDarkCheck';
import styled from 'styled-components/native';

export const AddProjectModal: React.FC<AddProjectModalProps> = function ({ addProjModalView, setAddProjModalView }) {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();

  const handleProjectAddition = function (): void {
    const newProjectName = input.trim();
    if (!newProjectName || newProjectName.length > 24) {
      return;
    }
    setInput('');
    setAddProjModalView(false);
    dispatch(addProjectAction(newProjectName));
  };

  const inputIsTooLong = function (): boolean {
    return input.trim().length > 24;
  };

  return (
    <Modal animationType="slide" visible={addProjModalView}>
      <ModalContainer>
        <HelperText type="error" visible={inputIsTooLong()} style={{ marginBottom: 15 }}>
          Project name must be less than 25 characters
        </HelperText>
        <TextInput
          mode="outlined"
          label="New project"
          value={input}
          onChangeText={(input) => setInput(input)}
          multiline
          keyboardAppearance="dark"
          style={[
            styles.textInput,
            {
              color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
              backgroundColor: isDarkMode ? darkMode.background : lightMode.background,
            },
          ]}
          theme={{
            colors: {
              primary: isDarkMode ? darkMode.primary : lightMode.primary,
              text: isDarkMode ? darkMode.textOnSurface : lightMode.textOnBackground,
              placeholder: isDarkMode ? `${darkMode.textOnSurface}87` : `${lightMode.textOnBackground}87`,
            },
            fonts: { regular: { fontFamily: 'Inter' } },
          }}
        />
        <Button
          mode="contained"
          icon="folder-upload"
          labelStyle={{ fontFamily: 'Inter' }}
          color={isDarkMode ? darkMode.primary : lightMode.primary}
          onPress={() => handleProjectAddition()}
          style={styles.btn}
        >
          add project
        </Button>
        <IconButton
          icon="close"
          size={50}
          color={isDarkMode ? darkMode.primary : lightMode.primary}
          style={styles.closeBtn}
          onPress={() => {
            setAddProjModalView(false);
            setInput('');
          }}
        />
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`;

const styles = StyleSheet.create({
  textInput: {
    width: 250,
    marginBottom: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  btn: { marginTop: 10 },
});
