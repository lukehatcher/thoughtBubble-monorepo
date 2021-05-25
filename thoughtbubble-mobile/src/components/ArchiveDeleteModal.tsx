import React, { FC } from 'react';
import { Modal, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { deleteProjectAction } from '../actions/projectActions';

// TODO:
// close row ✅
// delete project
// archive

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

  const handleProjectDeletion = function (projectId: string) {
    setModalVisible(false);
    dispatch(deleteProjectAction(projectId));
  };

  return (
    <>
      {modalVisible ? <Overlay /> : <></>}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <InfoModalContainer>
          <Text style={{ color: 'white' }}>{focusedProjectId}</Text>
          <Button
            mode="contained"
            icon="close"
            onPress={() => {
              setModalVisible(false);
              closeRow(focusedRowMap, focusedRowKey);
            }}
          >
            cancel
          </Button>
          <Button mode="contained" icon="trash-can-outline" onPress={() => handleProjectDeletion(focusedProjectId)}>
            delete
          </Button>
          <Button mode="contained" icon="clock" onPress={() => setModalVisible(false)}>
            archive
          </Button>
        </InfoModalContainer>
      </Modal>
    </>
  );
};

const Overlay = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 723px;
  background-color: #00000095;
  z-index: 999;
`;

const InfoModalContainer = styled.View`
  align-items: center;
  justify-content: center;
  /* background-color: black; */
  background-color: ${(props) => props.theme.background};
  margin-top: auto;
  margin-bottom: 0px;
  height: 300px;
  /* height: 275px; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
