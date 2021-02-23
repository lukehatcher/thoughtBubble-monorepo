import { relative } from 'path';
import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { _onLogOut } from '../utils/auth';

interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const selector = (state: RootState) => state.storedUser;
  let idToken = useSelector(selector);

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: idToken.picture }} style={styles.img} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.text}>Name: {idToken.name}</Text>
          </View>
          <View>
            <Text style={styles.text}>Email: {idToken.email}</Text>
          </View>
          <TouchableOpacity style={styles.btn1}>
            <Button title="logout" onPress={() => _onLogOut()} color="#121212" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200EE', // #6200EE primary, #3700B3 primary variant
  },
  bottomContainer: {
    flex: 2.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
    height: '75%',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(44, 44, 46)',
    padding: 25,
    width: '90%',
    height: '90%',
    borderRadius: 30,
  },
  text: {
    color: 'rgb(199, 199, 204)',
  },
  btn1: {
    // alignContent: 'center',
    // justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    backgroundColor: '#CF6679',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
  },
});

// rgb(44, 44, 46)
// rgb(28, 28, 30)
