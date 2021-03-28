import React, { useState } from 'react';
import { Modal, Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { editThoughtAction } from '../actions/thoughtActions';

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
    if (!newThought) {
      setMoreModalView(false);
      return;
    }
    dispatch(editThoughtAction(newThought, projectId, id));
    setMoreModalView(false);
  };

  return (
    <Modal visible={moreModalView} animationType="fade" transparent>
      <View style={styles.modal}>
        <View style={styles.innerView}>
          <TextInput
            onChangeText={(text) => {
              setInput(text.trim());
            }}
            placeholder="edit your thought..."
            multiline
            keyboardAppearance="dark"
            placeholderTextColor="white"
            style={styles.textInput}
          />
          <Button
            onPress={() => handleThoughtEdit(input, thoughtId)}
            title="submit"
            color="white"
          />
          <Button onPress={() => setMoreModalView(false)} title="cancel" color="white" />
          <Text>add a color tag (coming soon)</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textInput: {
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 250,
    color: 'white',
  },
  text: {
    color: 'white',
  },
  innerView: {
    backgroundColor: '#303030',
    padding: 40,
    borderRadius: 15,
  },
});
