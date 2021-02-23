import React from 'react';
import { View, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { _onLogIn } from '../utils/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <>
      <View style={styles.container}>
        <MaterialCommunityIcons name="thought-bubble" size={90} color="#6200EE" />
        <Text style={styles.logoText}>thoughtBubble</Text>
        <TouchableHighlight style={styles.btn1}>
          <Button title="login" color="white" onPress={() => _onLogIn()} />
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
    bottom: 40,
    backgroundColor: '#212121',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
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
    color: '#6200EE',
    fontSize: 40,
  },
});
