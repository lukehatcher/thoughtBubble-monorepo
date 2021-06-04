import React, { FC } from 'react';
import { Modal, StyleSheet, Alert } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { archiveProjectAction, deleteProjectAction } from '../actions/projectActions';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { colors } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Overlay } from './Overlay';

interface ArchiveDeleteModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  focusedProjectId: string;
  focusedRowMap: any;
  focusedRowKey: string;
  closeRow: (rowMap: any, rowKey: string) => void;
}

export const ArchiveDeleteModal: FC<ArchiveDeleteModalProps> = function ({
  modalVisible,
  setModalVisible,
  focusedProjectId,
  focusedRowMap,
  focusedRowKey,
  closeRow,
}) {
  const dispatch = useDispatch();
  const isDarkMode = useDarkCheck();

  const handleProjectArchive = function () {
    setModalVisible(false);
    dispatch(archiveProjectAction(focusedProjectId));
  };

  const closeBottomSheetAndRow = function () {
    setModalVisible(false);
    closeRow(focusedRowMap, focusedRowKey);
  };

  const handleProjectDeletion = function () {
    // alert color syncs with iphone dark/lightmode setting
    Alert.alert(
      'Are you sure you want to delete this project?',
      '',
      [
        {
          text: 'Confirm',
          onPress: () => {
            dispatch(deleteProjectAction(focusedProjectId));
            closeBottomSheetAndRow();
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => closeBottomSheetAndRow(),
          style: 'cancel',
        },
      ],
      { cancelable: false }, // android option
    );
  };

  return (
    <>
      {modalVisible ? <Overlay /> : <></>}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <InfoModalContainer>
          <IconButton
            icon="close"
            color={isDarkMode ? colors.darkMode.secondary : colors.lightMode.secondary}
            size={35}
            onPress={() => closeBottomSheetAndRow()}
            style={styles.modalCloseIconBtn}
          />
          <ActionsContainer>
            <ModalActionContainer onPress={() => handleProjectDeletion()}>
              <>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={40}
                  // color={isDarkMode ? colors.darkMode.primary : colors.lightMode.primary}
                  color="#808080"
                  style={styles.modalActionIcon}
                />
                <ModalActionText>Delete</ModalActionText>
              </>
            </ModalActionContainer>
            <ModalActionContainer onPress={() => handleProjectArchive()}>
              <>
                <MaterialCommunityIcons
                  name="archive"
                  size={40}
                  // color={isDarkMode ? colors.darkMode.primary : colors.lightMode.primary}
                  color="#F8D775"
                  style={styles.modalActionIcon}
                />
                <ModalActionText>Archive</ModalActionText>
              </>
            </ModalActionContainer>
          </ActionsContainer>
        </InfoModalContainer>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalCloseIconBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  modalActionIcon: {
    marginLeft: 10,
  },
});

const ActionsContainer = styled.View`
  position: absolute;
  bottom: 35px;
`;

const ModalActionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px;
  padding-right: 25px;
`;

const ModalActionText = styled.Text`
  color: ${(props) => props.theme.textOnSurface};
  font-size: 20px;
  padding-left: 20px;
`;

const InfoModalContainer = styled.View`
  height: 180px;
  background-color: ${(props) => props.theme.background};
  margin-top: auto;
  margin-bottom: 0px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
