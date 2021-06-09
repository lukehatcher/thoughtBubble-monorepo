import React, { FC, memo } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../reducers/rootReducer';
import { darkMode, lightMode } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { DateHelper } from '../utils/dateHelpers';
import { archiveProjectAction, deleteProjectAction, pinProjectAction } from '../actions/projectActions';
import { ProjectLongPressProps } from '../interfaces/componentProps';
import { BlurOverlay } from './BlurOverlay';

export const ProjectLongPressModal: FC<ProjectLongPressProps> = memo(function ({
  longPressModalVisible,
  setLongPressModalVisible,
  focusedProjectId,
}) {
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.userProjectData.find((proj) => proj.id === focusedProjectId));

  const generateUnderlayColor = (): string => {
    return isDarkMode ? `${darkMode.dp2}99` : '#eee';
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
            setLongPressModalVisible(false);
            dispatch(deleteProjectAction(focusedProjectId));
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => console.log('cancled'),
          style: 'cancel',
        },
      ],
      { cancelable: false }, // android option
    );
  };

  const handleProjectArchive = function () {
    setLongPressModalVisible(false);
    dispatch(archiveProjectAction(focusedProjectId));
  };

  const handleProjectPin = function () {
    setLongPressModalVisible(false);
    dispatch(pinProjectAction(focusedProjectId));
  };

  return (
    <>
      <Modal
        visible={longPressModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setLongPressModalVisible(false)}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <BlurOverlay pressOutCallback={() => setLongPressModalVisible(false)} />

          <ProjectPreviewContainer>
            <PreviewTitle>{project?.projectName}</PreviewTitle>
            <InfoWrapper>
              <PreviewInfoText>
                Total thoughts: <TextWithColor>{project?.projectThoughts.length}</TextWithColor>
              </PreviewInfoText>
              <PreviewInfoText>
                Date created: <TextWithColor>{DateHelper.parseOutTime(project?.createdDate)}</TextWithColor>
              </PreviewInfoText>
              <PreviewInfoText>
                Last updated: <TextWithColor>{DateHelper.parseOutTime(project?.lastUpdatedDate)}</TextWithColor>
              </PreviewInfoText>
            </InfoWrapper>
          </ProjectPreviewContainer>

          <LongPressModalContainer>
            <LongPressModalItem underlayColor={generateUnderlayColor()} onPress={handleProjectPin}>
              <>
                <LongPressModalItemText>{project?.pinned ? 'Unpin project' : 'Pin project'}</LongPressModalItemText>
                <MaterialCommunityIcons
                  // name={project?.pinned ? 'pin-off-outline' : 'pin-outline'}
                  name="pin"
                  size={20}
                  style={styles.icon}
                  color={isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground}
                />
              </>
            </LongPressModalItem>
            <BottomBorder />
            <LongPressModalItem underlayColor={generateUnderlayColor()} onPress={handleProjectArchive}>
              <>
                <LongPressModalItemText>Archive project</LongPressModalItemText>
                <MaterialCommunityIcons
                  name="archive"
                  size={20}
                  style={styles.icon}
                  color={isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground}
                />
              </>
            </LongPressModalItem>
            <BottomBorder />
            <LongPressModalItem underlayColor={generateUnderlayColor()} onPress={handleProjectDeletion}>
              <>
                <LongPressModalItemText color={isDarkMode ? darkMode.error : lightMode.error}>
                  Delete project
                </LongPressModalItemText>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  style={styles.icon}
                  color={isDarkMode ? darkMode.error : lightMode.error}
                />
              </>
            </LongPressModalItem>
          </LongPressModalContainer>
        </View>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginLeft: 'auto',
  },
});

const TextWithColor = styled.Text`
  color: ${(props) => props.theme.secondary};
`;

const ProjectPreviewContainer = styled.View`
  background-color: ${(props) => props.theme.background};
  height: 300px;
  width: 90%;
  padding: 15px;
  margin-top: 75px;
  border-radius: 15px;
`;

const InfoWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  left: 15px;
`;

const PreviewTitle = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
  font-size: 45px;
  margin-bottom: 40px;
`;

const PreviewInfoText = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
  font-size: 18px;
  margin-bottom: 15px;
`;

const LongPressModalContainer = styled.View`
  background-color: ${(props) => props.theme.background};
  border-radius: 15px;
  width: 250px;
  overflow: hidden;
  margin-top: 15px;
  margin-right: 125px;
`;

const LongPressModalItem = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const LongPressModalItemText = styled.Text`
  color: ${(props) => (props.color ? props.color : props.theme.textOnSurface)};
  margin-left: 10px;
  font-size: 15px;
`;

const BottomBorder = styled.View`
  height: 0.5px;
  background-color: #eee;
`;
