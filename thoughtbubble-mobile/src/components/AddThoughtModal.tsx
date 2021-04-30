import React, { useState, FC } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { addThoughtAction } from '../actions/thoughtActions';
import { colors } from '../constants/colors';
import { AddThoughtModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';

export const AddThoughtModal: FC<AddThoughtModalProps> = function ({
  projectId,
  addThoughtModalView,
  setAddThoughtModalView,
}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);

  const handleThoughtAddition = (thought: string) => {
    setInput('');
    if (!thought) {
      Alert.alert('invalid input');
      return;
    }
    dispatch(addThoughtAction(projectId, thought));
  };

  return (
    <>
      <Modal animationType="slide" visible={addThoughtModalView}>
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
            icon="file-upload"
            color={theme ? colors.darkMode.primary : colors.lightMode.primary}
            onPress={() => {
              setAddThoughtModalView(false);
              handleThoughtAddition(input.trim());
            }}
            style={useTheme('btn')}
          >
            add thought
          </Button>
          <IconButton
            icon="close"
            size={50}
            color={theme ? colors.darkMode.primary : colors.lightMode.primary}
            style={sharedStyles.closeBtn}
            onPress={() => {
              setAddThoughtModalView(false);
              setInput('');
            }}
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
