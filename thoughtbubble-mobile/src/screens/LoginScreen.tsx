import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginScreenProps } from '../interfaces/screenProps';
import { TextTB } from '../components/Text';
import { _loginGitHub } from '../utils/auth';
import { darkMode } from '../constants/colors';

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <>
      <View style={styles.container}>
        {/* <MaterialCommunityIcons name="thought-bubble" size={90} color={darkMode.primary} /> */}
        <TextTB style={styles.logoText}>thoughtBubble</TextTB>
        <TouchableHighlight style={styles.btn1} underlayColor="#21212190" onPress={_loginGitHub}>
          <>
            <TextTB style={{ color: 'white', fontWeight: '600', marginRight: 20 }}>Login with GitHub</TextTB>
            <MaterialCommunityIcons name="github" size={30} color="white" />
          </>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkMode.primaryVariant,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn1: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
    backgroundColor: '#212121',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
    height: 50,
  },
  logoText: {
    color: darkMode.textOnBackground,
    fontSize: 40,
    fontWeight: '500',
  },
});
