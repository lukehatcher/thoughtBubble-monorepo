import React, { FC, useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, UIManager, View } from 'react-native';
import { Button, IconButton, List } from 'react-native-paper';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { useDispatch } from 'react-redux';
import { unarchiveProjectAction } from '../actions/projectActions';

const { darkMode, lightMode } = colors;

interface ExpandableListItemProps {
  projectId: string;
  projectName: string; // need better typing
  projectThoughts: any[];
}

export const ExpandableListItem: FC<ExpandableListItemProps> = function ({ projectId, projectName, projectThoughts }) {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const [expanded, setExpanded] = useState(false);
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();

  const handleChevronPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpanded(!expanded);
  };

  const handleUnArchive = function () {
    dispatch(unarchiveProjectAction(projectId));
  };

  return (
    <>
      <AccordianContainer>
        <AccordianHeader>
          <MaterialCommunityIcons
            name="folder"
            size={25}
            style={styles.accordianHeaderIcon}
            color={
              isDarkMode
                ? expanded
                  ? darkMode.primary
                  : `${darkMode.textOnBackground}87`
                : expanded
                ? lightMode.primary
                : `${lightMode.textOnBackground}87`
            }
          />
          <AccordianHeaderText expanded={expanded}>{projectName}</AccordianHeaderText>
          <IconButton
            icon={expanded ? 'chevron-up' : 'chevron-down'}
            size={25}
            color={isDarkMode ? `${darkMode.textOnBackground}87` : `${lightMode.textOnBackground}87`}
            style={styles.accordianBtn}
            onPress={handleChevronPress}
          />
        </AccordianHeader>
        {expanded && (
          <>
            {/* <PaddingView></PaddingView> */}
            <Button
              mode="contained"
              onPress={() => handleUnArchive()}
              style={styles.unarchiveBtn}
              uppercase={false}
              labelStyle={{}}
            >
              un-archive
            </Button>
            {projectThoughts.map((thought) => (
              <AccordianItem key={thought.id}>
                <AccordianItemText>{thought.text}</AccordianItemText>
              </AccordianItem>
            ))}
            {/* <PaddingView /> */}
          </>
        )}
      </AccordianContainer>
      {/* <View style={{ height: 30, backgroundColor: 'red' }}></View> */}
    </>
  );
};

const styles = StyleSheet.create({
  accordianBtn: {
    marginRight: 12,
    marginLeft: 'auto',
  },
  accordianHeaderIcon: {
    marginLeft: 24,
  },
  unarchiveBtn: {
    // height: 35, default height is 35
    borderRadius: 15,
    width: 115,
    marginRight: 10,
    marginLeft: 'auto',
  },
});

const PaddingView = styled.View`
  height: 20px;
`;

const AccordianContainer = styled.View`
  background-color: ${(props) => props.theme.dp1};
`;

const AccordianHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AccordianHeaderText = styled.Text`
  margin-left: 25px;
  font-size: 15px;
  color: ${(props) => (props.expanded ? props.theme.primary : props.theme.textOnBackground)};
`;

const AccordianItem = styled.View`
  padding: 16px;
  margin-left: 60px;
  z-index: -999;
`;

const AccordianItemText = styled.Text`
  /* position: absolute; */
  color: ${(props) => props.theme.textOnBackground};
  font-size: 16px;
`;
