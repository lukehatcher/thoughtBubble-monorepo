import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, IconButton, TextInput, HelperText } from 'react-native-paper';
import { addProjectAction } from '../actions/projectActions';
import { colors } from '../constants/colors';
import { AddProjectModalProps } from '../interfaces/componentProps';
import { useDarkCheck } from '../hooks/useDarkCheck';
import styled from 'styled-components/native';

const { darkMode, lightMode } = colors;

export const AddProjectModal: React.FC<AddProjectModalProps> = function ({ addProjModalView, setAddProjModalView }) {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();

  const handleProjectAddition = function (): void {
    const newProjectName = input.trim();
    if (!newProjectName || newProjectName.length > 25) {
      return;
    }
    setInput('');
    setAddProjModalView(false);
    dispatch(addProjectAction(newProjectName));
  };

  const inputIsTooLong = function (): boolean {
    return input.trim().length > 25;
  };

  return (
    <Modal animationType="slide" visible={addProjModalView}>
      <ModalContainer>
        <HelperText type="error" visible={inputIsTooLong()} style={{ marginBottom: 15 }}>
          Error: Project name must be less than 26 characters
        </HelperText>
        <TextInput
          mode="outlined"
          label="new project"
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
          }}
        />
        <Button
          mode="contained"
          icon="folder-upload"
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
