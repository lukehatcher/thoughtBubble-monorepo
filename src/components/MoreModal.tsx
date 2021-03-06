import React from 'react';
import { Modal, Button, View, Text, TextInput, StyleSheet } from 'react-native';

interface MoreModalProps {
  moreModalView: boolean;
  setMoreModalView: React.Dispatch<React.SetStateAction<boolean>>;
  thoughtId: string;
}

export const MoreModal: React.FC<MoreModalProps> = ({ setMoreModalView, thoughtId, moreModalView }) => {
  return (
    <>
      <Modal visible={moreModalView} animationType="fade">
        <View style={styles.center}>
          {console.log(thoughtId)}
          <Text>this is the more modal</Text>
          <Button onPress={() => setMoreModalView(false)} title="close" />
          <Button onPress={() => console.log(thoughtId)} title="test" />
          {/* <TextInput></TextInput> */}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
