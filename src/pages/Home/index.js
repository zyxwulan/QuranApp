import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Book, Book2, Head, SearchPrimary} from '../../assets';
import {Gap, TextBold, TextRegular, TextSemiBold} from '../../components';
import {colors} from '../../utils';
import React, {useEffect, useState} from 'react';

const RenderCard = ({text, img, onPress, bg}) => {
  return bg === 'white' ? (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.whiteCard}>
        <Image source={img} style={styles.whiteCardImage} />
        <Gap height={56} />
        <TextRegular
          type="Subtitle"
          text={text}
          color={colors['primary-500']}
        />
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.primaryCard}>
        <Image source={img} style={styles.primaryCardImage} />
        <Gap height={75} />
        <TextRegular type="Subtitle" text={text} color={colors.white} />
      </View>
    </TouchableOpacity>
  );
};

const Home = ({navigation}) => {
  const [user, setUser] = useState('');
  const handleLogOut = () => {
    AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  const getUser = async () => {
    const data = await AsyncStorage.getItem('user');
    setUser(JSON.parse(data));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.body}>
      <Gap height={48} />
      <TextBold
        text={`Welcome ${user.name}!`}
        type="H6"
        color={colors['primary-500']}
        style={styles.title}
      />
      <Gap height={28} />

      <View style={styles.quote}>
        <View style={styles.quoteCard}>
          <View style={styles.quoteTitle}>
            <Image source={Book} style={styles.quoteImage} />
            <Gap width={8} />
            <TextSemiBold type="Body 2" text="Motivasi" color={colors.white} />
          </View>
          <Gap height={10} />
          <TextRegular
            text="Sebaik - baik manusia diantara kamu adalah yang mempelajari Al-Quran dan mengajarkannya (HR Bukhori)"
            type="Caption"
            color={colors.white}
          />
        </View>
      </View>

      <Gap height={28} />

      <View style={styles.cards}>
        <RenderCard
          text="Al Quran"
          img={Book2}
          onPress={() => navigation.navigate('Surah')}
        />
        <Gap width={22} />
        <RenderCard bg="white" text="Hafalan" img={Head} />
        <RenderCard bg="white" text="Pencarian" img={SearchPrimary} />
        <Gap width={22} />
        <RenderCard text="Dashbord" img={Book2} />
      </View>
      <Gap height={22} />

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogOut}>
        <View style={styles.button}>
          <TextRegular type="Body 1" text="Logout" style={styles.logOut} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFFDF5',
    paddingHorizontal: 24,
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  quoteCard: {
    padding: 24,
    backgroundColor: '#DA8856',
    borderRadius: 25,
  },
  quoteTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteImage: {
    width: 20,
    height: 20,
  },
  logOut: {
    color: 'white',
    alignSelf: 'center',
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  primaryCard: {
    backgroundColor: '#DA8856',
    borderRadius: 25,
    padding: 18,
    width: 152,
    marginBottom: 22,
  },
  whiteCard: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 18,
    width: 152,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#DA8856',
  },
  whiteCardImage: {
    width: 51,
    height: 51,
  },
  primaryCardImage: {
    width: 42,
    height: 34,
  },
  button: {
    paddingVertical: 9,
    backgroundColor: '#DA8856',
    marginHorizontal: 38,
    borderRadius: 9,
    textAlign: 'center',
  },
});
