import React, { useState, FC } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { addThoughtAction } from '../actions/thoughtActions';
import { colors } from '../constants/colors';
import { AddThoughtModalProps } from '../interfaces/componentProps';
import { useDarkCheck } from '../hooks/useDarkCheck';
import styled from 'styled-components/native';

const { darkMode, lightMode } = colors;

export const AddThoughtModal: FC<AddThoughtModalProps> = function ({
  projectId,
  addThoughtModalView,
  setAddThoughtModalView,
}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const isDarkMode = useDarkCheck();

  const handleThoughtAddition = (): void => {
    const newThought = input.trim();
    if (!newThought) {
      return;
    }
    setInput('');
    setAddThoughtModalView(false);
    dispatch(addThoughtAction(projectId, newThought));
  };

  return (
    <>
      <Modal animationType="slide" visible={addThoughtModalView}>
        <ModalContainer>
          <TextInput
            mode="outlined"
            label="new thought"
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
            icon="file-upload"
            color={isDarkMode ? darkMode.primary : lightMode.primary}
            onPress={() => handleThoughtAddition()}
            style={styles.btn}
          >
            add thought
          </Button>
          <IconButton
            icon="close"
            size={50}
            color={isDarkMode ? darkMode.primary : lightMode.primary}
            style={styles.closeBtn}
            onPress={() => {
              setAddThoughtModalView(false);
              setInput('');
            }}
          />
        </ModalContainer>
      </Modal>
    </>
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
