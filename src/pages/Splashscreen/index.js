import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Quran} from '../../assets';

const Splashscreen = ({navigation}) => {
  const getUser = async () => {
    const data = await AsyncStorage.getItem('user');
    if (data != null) {
      setTimeout(() => {
        navigation.replace('Home');
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.replace('Login');
      }, 2000);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.page}>
      <Image source={Quran} style={styles.image} />
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    alignItems: 'center',
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
