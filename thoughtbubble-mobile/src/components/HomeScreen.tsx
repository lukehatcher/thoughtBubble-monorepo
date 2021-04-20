import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Switch from 'react-native-switch-pro';
import { RootState } from '../reducers/rootReducer';
import { _onLogOut } from '../utils/auth';
import { HomeScreenProps } from '../interfaces/componentProps';
import { changeEmailSettingsAction, changeDarkModeAction } from '../actions/userInfoActions';

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch();
  let idToken = useSelector((state: RootState) => state.storedUser);
  const dailyEmailSetting = useSelector((state: RootState) => state.userInfo.dailyEmail);
  const weeklyEmailSetting = useSelector((state: RootState) => state.userInfo.weeklyEmail);
  const darkModeSetting = useSelector((state: RootState) => state.userInfo.darkMode);

  const handleEmailSettingToggle = function (emailSetting: string): void {
    if (emailSetting === 'daily') dispatch(changeEmailSettingsAction('daily'));
    else dispatch(changeEmailSettingsAction('weekly'));
  };

  const handleDarkModeToggle = function (): void {
    console.log('changed dark mode');
    dispatch(changeDarkModeAction());
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri: idToken.picture }} style={styles.img} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.text}>Name: {idToken.name}</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.text}>Email: {idToken.email}</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.text}>daily emails: </Text>
          <Switch value={dailyEmailSetting} onSyncPress={() => handleEmailSettingToggle('daily')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.text}>weekly emails </Text>
          <Switch value={weeklyEmailSetting} onSyncPress={() => handleEmailSettingToggle('weekly')} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.text}>dark mode: on</Text>
          <Switch value={darkModeSetting} onSyncPress={() => handleDarkModeToggle()} />
        </View>
        <TouchableOpacity style={styles.btn1}>
          <Button title="logout" onPress={() => _onLogOut()} color="#121212" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    padding: 15,
    // margin: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: 'rgb(44, 44, 46)',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BB86FC', // #6200EE primary, #3700B3 primary variant
  },
  bottomContainer: {
    flex: 2.75,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#121212',
    // height: '75%',
  },
  // infoContainer: {
  //   // deleted
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgb(44, 44, 46)',
  //   padding: 25,
  //   width: '90%',
  //   height: '90%',
  //   borderRadius: 30,
  // },
  text: {
    color: 'rgb(199, 199, 204)',
  },
  btn1: {
    // position: 'absolute',
    // bottom: 15,
    backgroundColor: '#CF6679',
    borderRadius: 15,
    padding: 6,
    margin: 10,
    marginTop: 25,
    width: 250,
  },
});
