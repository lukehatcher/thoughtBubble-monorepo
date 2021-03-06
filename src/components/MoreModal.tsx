import React, { useState } from 'react';
import { Modal, Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { editThoughtAction } from '../actions/todoActions';

interface MoreModalProps {
  moreModalView: boolean;
  setMoreModalView: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  thoughtId: string;
}

export const MoreModal: React.FC<MoreModalProps> = ({
  moreModalView,
  setMoreModalView,
  projectId,
  thoughtId,
}) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleThoughtEdit = (newThought: string, id: string) => {
    dispatch(editThoughtAction(newThought, projectId, id));
  };

  return (
    <Modal visible={moreModalView} animationType="fade">
      <View style={styles.modal}>
        <Text>Edit thought: {thoughtId}</Text>
        <TextInput
          onChangeText={(text) => {
            setInput(text);
          }}
          placeholder="edit your thought..."
          multiline
          keyboardAppearance="dark"
          placeholderTextColor="white"
          style={styles.textInput}
        />
        <Button onPress={() => handleThoughtEdit(input, thoughtId)} title="submit" />
        <Button onPress={() => setMoreModalView(false)} title="close" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  textInput: {
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 250,
    color: 'white',
  },
});
