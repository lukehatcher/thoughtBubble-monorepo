import React, { FC, useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { editThoughtAction, thoughtTagChangeAction } from '../actions/thoughtActions';
import { darkMode, lightMode, tagColorsDark } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { MoreModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';
import styled from 'styled-components/native';

export const MoreModal: FC<MoreModalProps> = ({ moreModalView, setMoreModalView, projectId, thoughtId }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const tagSelector = (state: RootState) =>
    state.userProjectData
      .find((proj) => proj.id === projectId)
      .projectThoughts.find((thought) => thought.id === thoughtId).tag;
  const tag: string | null = useSelector(tagSelector);
  const isDarkMode = useDarkCheck();

  const handleThoughtEdit = function (newThought: string, id: string) {
    if (!newThought) {
      setMoreModalView(false);
      return;
    }
    dispatch(editThoughtAction(newThought, projectId, id));
    setMoreModalView(false);
  };

  const handleThoughtTag = function (tagColor: string | null) {
    dispatch(thoughtTagChangeAction(projectId, thoughtId, tagColor)); // should take thought id (for db) and maybe project id for the new data in redux
  };

  const generateTagStyle = function () {
    return [styles.currentTag, { borderColor: isDarkMode ? darkMode.primary : lightMode.primary }];
  };

  return (
    <>
      <Modal animationType="slide" visible={moreModalView}>
        <ModalContainer>
          <TextInput
            mode="outlined"
            label="edit thought"
            value={input}
            onChangeText={(input) => setInput(input)}
            placeholder="edit thought"
            multiline
            style={[
              styles.textInput,
              {
                backgroundColor: isDarkMode ? darkMode.dp1 : lightMode.background,
              },
            ]}
            theme={{
              colors: {
                primary: isDarkMode ? darkMode.primary : lightMode.primary,
                text: isDarkMode ? darkMode.textOnSurface : lightMode.textOnBackground,
                placeholder: isDarkMode ? `${darkMode.textOnSurface}87` : `${lightMode.textOnBackground}87`,
              },
            }}
            keyboardAppearance="dark"
          />

          <Button
            mode="contained"
            icon="pencil"
            color={isDarkMode ? darkMode.primary : lightMode.primary}
            onPress={() => {
              setMoreModalView(false);
              handleThoughtEdit(input.trim(), thoughtId);
            }}
          >
            submit change
          </Button>
          <IconButton
            icon="close"
            size={50}
            color={isDarkMode ? darkMode.primary : lightMode.primary}
            style={styles.closeBtn}
            onPress={() => {
              setMoreModalView(false);
              setInput('');
            }}
          />
          <SelectTagText>select tag</SelectTagText>
          <View style={styles.tagContainer}>
            <IconButton
              icon="tag"
              size={27}
              color={tagColorsDark.red}
              style={tag === 'red' ? generateTagStyle() : null}
              onPress={() => handleThoughtTag('red')}
            />
            <IconButton
              icon="tag"
              size={27}
              color={tagColorsDark.orange}
              style={tag === 'orange' ? generateTagStyle() : null}
              onPress={() => handleThoughtTag('orange')}
            />
            <IconButton
              icon="tag"
              size={27}
              color={tagColorsDark.green}
              style={tag === 'green' ? generateTagStyle() : null}
              onPress={() => handleThoughtTag('green')}
            />
            <IconButton
              icon="tag"
              size={27}
              color={tagColorsDark.blue}
              style={tag === 'blue' ? generateTagStyle() : null}
              onPress={() => handleThoughtTag('blue')}
            />
            <IconButton
              icon="tag"
              size={27}
              color={tagColorsDark.purple}
              style={tag === 'purple' ? generateTagStyle() : null}
              onPress={() => handleThoughtTag('purple')}
            />
            <IconButton
              icon="tag-off"
              size={27}
              color={'silver'}
              style={!tag ? generateTagStyle() : null}
              onPress={() => handleThoughtTag(null)}
            />
            <IconButton
              icon="star"
              size={27}
              color={tagColorsDark.gold}
              style={tag === 'favorite' ? generateTagStyle() : null}
              onPress={() => handleThoughtTag('favorite')}
            />
          </View>
        </ModalContainer>
      </Modal>
    </>
  );
};

const SelectTagText = styled.Text`
  color: ${(props) => props.theme.textOnBackground};
  margin-top: 10px;
`;

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`;

const styles = StyleSheet.create({
  textInput: {
    width: 250,
    marginBottom: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  currentTag: {
    borderWidth: 1,
  },
});
