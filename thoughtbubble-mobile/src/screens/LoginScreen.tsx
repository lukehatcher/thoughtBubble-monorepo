import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LoginScreenProps } from '../interfaces/screenProps';
import { TextTB } from '../components/Text';
import { _openGithubAuth } from '../utils/auth';
import { darkMode } from '../constants/colors';

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <>
      <View style={styles.container}>
        <MaterialCommunityIcons name="thought-bubble" size={90} color={darkMode.primary} />
        <Text style={styles.logoText}>thoughtBubble</Text>
        <TouchableHighlight style={styles.btn1} underlayColor="#21212190" onPress={_openGithubAuth}>
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
    backgroundColor: '#121212',
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
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  logoText: {
    color: darkMode.primary,
    fontSize: 40,
  },
});
