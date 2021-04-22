import React, { useState, FC } from 'react';
import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addThoughtAction } from '../actions/thoughtActions';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';

interface AddThoughtModalProps {
  projectId: string;
  addThoughtModalView: boolean;
  setAddThoughtModalView: React.Dispatch<React.SetStateAction<boolean>>;
}

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
            onChangeText={(text) => setInput(text)}
            placeholder="Add a new thought"
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
                setAddThoughtModalView(false);
                handleThoughtAddition(input.trim());
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={useTheme('btn')}>
            <Button
              title="cancel"
              color={theme ? colors.darkMode.textOnPrimary : colors.lightMode.textOnPrimary}
              onPress={() => {
                setAddThoughtModalView(false);
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
