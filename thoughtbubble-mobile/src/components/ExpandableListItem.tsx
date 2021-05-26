import React, { FC, useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, UIManager, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';

const { darkMode, lightMode } = colors;

interface ExpandableListItemProps {}

export const ExpandableListItem: FC<ExpandableListItemProps> = function () {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const [expanded, setExpanded] = useState(false);
  const [expandedDemo, setExpandedDemo] = useState(false);
  const isDarkMode = useDarkCheck();
  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <>
      <List.Section title="hello there" style={{ backgroundColor: '#eee' }}>
        <List.Accordion
          title="project name here"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expandedDemo}
          onPress={() => setExpandedDemo(!expandedDemo)}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
      <View style={{ height: 30, backgroundColor: 'red' }}></View>
      <AccordianContainer>
        <AccordianHeader>
          <MaterialCommunityIcons
            name="folder"
            size={25}
            style={styles.accordianHeaderIcon}
            color={
              isDarkMode
                ? expanded
                  ? lightMode.primary
                  : `${darkMode.textOnBackground}87`
                : expanded
                ? lightMode.primary
                : `${lightMode.textOnBackground}87`
            }
          />
          <AccordianHeaderText expanded={expanded}>project name here</AccordianHeaderText>
          <IconButton
            icon={expanded ? 'chevron-up' : 'chevron-down'}
            size={25}
            color="black"
            style={styles.accordianBtn}
            onPress={handlePress}
          />
        </AccordianHeader>
        {expanded && (
          <>
            <AccordianItem>
              <AccordianItemText>First item</AccordianItemText>
            </AccordianItem>
            <AccordianItem>
              <AccordianItemText>Second item</AccordianItemText>
            </AccordianItem>
          </>
        )}
      </AccordianContainer>
      <View style={{ height: 30, backgroundColor: 'red' }}></View>
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
});

const AccordianContainer = styled.View`
  background-color: #eee;
`;

const AccordianHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AccordianHeaderText = styled.Text`
  margin-left: 25px;
  font-size: 15px;
  color: ${(props) => (props.expanded ? props.theme.primaryVariant : props.theme.textOnBackground)};
`;

const AccordianItem = styled.View`
  padding: 16px;
  background-color: #eee;
  margin-left: 60px;
`;

const AccordianItemText = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
  font-size: 16px;
`;
