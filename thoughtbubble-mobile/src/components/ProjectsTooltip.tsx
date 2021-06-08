import React, { FC, memo, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { darkMode, lightMode } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { BlurView } from '@react-native-community/blur';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../reducers/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { DateHelper } from '../utils/dateHelpers';
import { archiveProjectAction, deleteProjectAction } from '../actions/projectActions';

interface ProjectsTooltipProps {
  tooltipVisible: boolean;
  setTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>;
  focusedProjectId: string;
}

export const ProjectsTooltip: FC<ProjectsTooltipProps> = memo(function ({
  tooltipVisible,
  setTooltipVisible,
  focusedProjectId,
}) {
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.userProjectData.find((proj) => proj.id === focusedProjectId));

  const generateUnderlayColor = (): string => {
    return isDarkMode ? `${darkMode.dp1}95` : '#eee';
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
            setTooltipVisible(false);
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
    setTooltipVisible(false);
    dispatch(archiveProjectAction(focusedProjectId));
  };

  const handleProjectPin = function () {
    setTooltipVisible(false);
    // dispatch(pinProjectAction());
  };

  return (
    <>
      <Modal visible={tooltipVisible} animationType="fade" transparent onRequestClose={() => setTooltipVisible(false)}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableWithoutFeedback onPress={() => setTooltipVisible(false)}>
            <BlurView
              style={styles.blurView}
              blurType={isDarkMode ? 'regular' : 'ultraThinMaterialLight'}
              reducedTransparencyFallbackColor={isDarkMode ? 'black' : 'white'}
              blurAmount={1}
            />
          </TouchableWithoutFeedback>

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

          <TooltipContainer>
            <TooltipItem underlayColor={generateUnderlayColor()} onPress={handleProjectPin}>
              <>
                <TooltipItemText>Pin project </TooltipItemText>
                <MaterialCommunityIcons
                  name="pin-outline"
                  size={20}
                  style={styles.icon}
                  color={isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground}
                />
              </>
            </TooltipItem>
            <BottomBorder />
            <TooltipItem underlayColor={generateUnderlayColor()} onPress={handleProjectArchive}>
              <>
                <TooltipItemText>Archive project</TooltipItemText>
                <MaterialCommunityIcons
                  name="archive"
                  size={20}
                  style={styles.icon}
                  color={isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground}
                />
              </>
            </TooltipItem>
            <BottomBorder />
            <TooltipItem underlayColor={generateUnderlayColor()} onPress={handleProjectDeletion}>
              <>
                <TooltipItemText color={isDarkMode ? darkMode.error : lightMode.error}>Delete project</TooltipItemText>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  style={styles.icon}
                  color={isDarkMode ? darkMode.error : lightMode.error}
                />
              </>
            </TooltipItem>
          </TooltipContainer>
        </View>
      </Modal>
    </>
  );
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
// ======

const TooltipContainer = styled.View`
  background-color: ${(props) => props.theme.background};
  border-radius: 15px;
  width: 250px;
  overflow: hidden;
  /* position: absolute; */
  margin-top: 15px;
  margin-right: 125px;
`;

const TooltipItem = styled.TouchableHighlight`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const TooltipItemText = styled.Text`
  color: ${(props) => (props.color ? props.color : props.theme.textOnSurface)};
  margin-left: 10px;
  font-size: 15px;
`;

const BottomBorder = styled.View`
  height: 0.5px;
  background-color: #eee;
`;

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  icon: {
    marginRight: 10,
    marginLeft: 'auto',
  },
});
