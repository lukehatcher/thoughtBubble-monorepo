import React, { FC, useState } from 'react';
import { Modal, View, StyleSheet, Text } from 'react-native';
import { Button, TextInput, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { editThoughtAction, thoughtTagChangeAction } from '../actions/thoughtActions';
import { colors } from '../constants/colors';
import { MoreModalProps } from '../interfaces/componentProps';
import { RootState } from '../reducers/rootReducer';

export const MoreModal: FC<MoreModalProps> = ({ moreModalView, setMoreModalView, projectId, thoughtId }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const tagSelector = (state: RootState) =>
    state.userProjectData
      .find((proj) => proj.id === projectId)
      .projectThoughts.find((thought) => thought.id === thoughtId).tag;
  const tag: string | null = useSelector(tagSelector);
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);

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

  return (
    <>
      <Modal animationType="slide" visible={moreModalView}>
        <View style={useTheme('modal')}>
          <TextInput
            mode="outlined"
            label="edit thought"
            value={input}
            onChangeText={(input) => setInput(input)}
            placeholder="edit thought"
            multiline
            style={useTheme('textInput')}
            theme={{
              colors: {
                primary: theme ? colors.darkMode.primary : colors.lightMode.primary,
                text: theme ? colors.darkMode.textOnSurface : colors.lightMode.textOnBackground,
                placeholder: theme ? `${colors.darkMode.textOnSurface}87` : `${colors.lightMode.textOnBackground}87`,
              },
            }}
            keyboardAppearance="dark"
          />

          <Button
            mode="contained"
            icon="pencil"
            color={theme ? colors.darkMode.primary : colors.lightMode.primary}
            onPress={() => {
              setMoreModalView(false);
              handleThoughtEdit(input.trim(), thoughtId);
            }}
            style={useTheme('btn')}
          >
            submit change
          </Button>
          <IconButton
            icon="close"
            size={50}
            color={theme ? colors.darkMode.primary : colors.lightMode.primary}
            style={sharedStyles.closeBtn}
            onPress={() => {
              setMoreModalView(false);
              setInput('');
            }}
          />
          <Text style={useTheme('text')}>select tag</Text>
          <View style={sharedStyles.tagContainer}>
            <IconButton
              icon="tag"
              size={27}
              color={'red'}
              style={tag === 'red' ? useTheme('currentTag') : null}
              onPress={() => handleThoughtTag('red')}
            />
            <IconButton
              icon="tag"
              size={27}
              color={'orange'}
              style={tag === 'orange' ? useTheme('currentTag') : null}
              onPress={() => handleThoughtTag('orange')}
            />
            <IconButton
              icon="tag"
              size={27}
              color={'green'}
              style={tag === 'green' ? useTheme('currentTag') : null}
              onPress={() => handleThoughtTag('green')}
            />
            <IconButton
              icon="tag"
              size={27}
              color={'blue'}
              style={tag === 'blue' ? useTheme('currentTag') : null}
              onPress={() => handleThoughtTag('blue')}
            />
            <IconButton
              icon="tag"
              size={27}
              color={'purple'}
              style={tag === 'purple' ? useTheme('currentTag') : null}
              onPress={() => handleThoughtTag('purple')}
            />
            <IconButton
              icon="tag-off"
              size={27}
              color={'silver'}
              style={!tag ? useTheme('currentTag') : null}
              onPress={() => handleThoughtTag(null)}
            />
            <IconButton
              icon="star"
              size={27}
              color="#D4AF37"
              style={tag === 'star' ? useTheme('currentTag') : null}
              onPress={() => handleThoughtTag('star')}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const sharedStyles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
  },
  tagContainer: {
    flexDirection: 'row',
  },
});

const stylesDark = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkMode.background,
  },
  textInput: {
    color: 'white',
    backgroundColor: colors.darkMode.dp1,
    width: 250,
    marginBottom: 10,
  },
  btn: {
    marginBottom: 10,
    // width: 250,
  },
  text: {
    color: colors.darkMode.textOnBackground,
  },
  currentTag: {
    borderWidth: 1,
    borderColor: colors.darkMode.primary,
  },
});

const stylesLight = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightMode.background,
  },
  textInput: {
    backgroundColor: colors.lightMode.background,
    width: 250,
    marginBottom: 10,
  },
  btn: {
    marginBottom: 10,
    // width: 250,
  },
  text: {
    color: colors.lightMode.textOnBackground,
  },
  currentTag: {
    borderWidth: 1,
    borderColor: colors.lightMode.primary,
  },
});
