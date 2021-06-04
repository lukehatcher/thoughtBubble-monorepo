import React, { FC, useState, memo } from 'react';
import { LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native';
import { IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { useDispatch } from 'react-redux';
import { unarchiveProjectAction } from '../actions/projectActions';
import { ThoughtShape } from '../interfaces/data';

const { darkMode, lightMode } = colors;

interface ExpandableListItemProps {
  projectId: string;
  projectName: string;
  projectThoughts: ThoughtShape[];
}

export const ExpandableListItem: FC<ExpandableListItemProps> = memo(function ({
  projectId,
  projectName,
  projectThoughts,
}) {
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
    setExpanded(!expanded);
  };

  const handleUnArchive = function () {
    dispatch(unarchiveProjectAction(projectId));
  };

  return (
    <>
      <AccordionContainer>
        <AccordionHeader>
          <MaterialCommunityIcons
            name="folder"
            size={25}
            style={styles.accordionHeaderIcon}
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
          <AccordionHeaderText expanded={expanded}>{projectName}</AccordionHeaderText>
          <IconButton
            icon={expanded ? 'chevron-up' : 'chevron-down'}
            size={25}
            color={isDarkMode ? `${darkMode.textOnBackground}87` : `${lightMode.textOnBackground}87`}
            style={styles.accordionBtn}
            onPress={handleChevronPress}
          />
        </AccordionHeader>
        {expanded && (
          <>
            <UnarchiveBtn
              onPress={() => handleUnArchive()}
              underlayColor={isDarkMode ? `${darkMode.error}87` : `${lightMode.error}87`}
            >
              <UnarchiveBtnText>un-archive</UnarchiveBtnText>
            </UnarchiveBtn>
            {projectThoughts.map((thought) => (
              <AccordionItem key={thought.id}>
                <BulletPoint>{'\u2022'}</BulletPoint>
                <AccordionItemText>{thought.text}</AccordionItemText>
              </AccordionItem>
            ))}
          </>
        )}
      </AccordionContainer>
    </>
  );
});

const styles = StyleSheet.create({
  accordionBtn: {
    marginRight: 12,
    marginLeft: 'auto',
  },
  accordionHeaderIcon: {
    marginLeft: 24,
  },
  unarchiveBtn: {
    // height: 35, default height is 35
    borderRadius: 15,
    width: 115,
    marginRight: 'auto',
    marginLeft: 25,
    height: 30,
  },
});

const UnarchiveBtn = styled.TouchableHighlight`
  margin: 10px;
  background-color: ${(props) => props.theme.error};
  padding: 3px;
  width: 100px;
  margin-left: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const UnarchiveBtnText = styled.Text`
  color: ${(props) => props.theme.textOnError};
  /* font-weight: bold; */
`;

const AccordionContainer = styled.View`
  background-color: ${(props) => props.theme.dp1};
`;

const AccordionHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AccordionHeaderText = styled.Text`
  margin-left: 25px;
  font-size: 15px;
  color: ${(props) => (props.expanded ? props.theme.primary : props.theme.textOnBackground)};
`;

const AccordionItem = styled.View`
  padding: 16px;
  margin-left: 42px;
  z-index: -999;
  flex-direction: row;
`;

const BulletPoint = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
  margin-right: 15px;
`;

const AccordionItemText = styled.Text`
  flex-shrink: 1;
  color: ${(props) => props.theme.textOnBackground};
  font-size: 16px;
`;
