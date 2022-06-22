import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Book, Quran, SearchIcon, Speaker} from '../../assets';
import {
  Gap,
  Header,
  TextBold,
  TextRegular,
  TextSemiBold,
} from '../../components';
import {colors} from '../../utils';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RenderSurah = ({number, surah, city, ayat, arab, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.surah}>
        <View style={styles.surahContainer}>
          <TextRegular
            type="Body 2"
            text={number}
            color={colors['primary-500']}
            style={styles.textNumber}
          />
          <View>
            <TextRegular
              type="Body 2"
              text={surah}
              color={colors['primary-500']}
            />
            <View style={styles.surahDetail}>
              <TextRegular
                type="Caption"
                text={city}
                color={colors['primary-50']}
              />
              <TextRegular
                type="Caption"
                text=" - "
                color={colors['primary-50']}
              />
              <TextRegular
                type="Caption"
                text={ayat}
                color={colors['primary-50']}
              />
            </View>
          </View>
        </View>
        <View style={styles.surahContent}>
          <TextBold text={arab} type="Body 1" color={colors['primary-500']} />
          <Gap width={18} />
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={Speaker} style={styles.speakerImage} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RenderSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        width={'100%'}
        height={46}
        borderRadius={8}
        marginBottom={8}
      />
      <SkeletonPlaceholder.Item
        width={'100%'}
        height={46}
        borderRadius={8}
        marginBottom={8}
      />
      <SkeletonPlaceholder.Item
        width={'100%'}
        height={46}
        borderRadius={8}
        marginBottom={8}
      />
      <SkeletonPlaceholder.Item
        width={'100%'}
        height={46}
        borderRadius={8}
        marginBottom={8}
      />
    </SkeletonPlaceholder>
  );
};

const Surah = ({navigation}) => {
  const [surah, setSurah] = useState([]);

  const getSurah = async () => {
    const response = await axios.get('https://api.quran.sutanlab.id/surah');
    setSurah(response.data.data);
  };

  useEffect(() => {
    getSurah();
  }, []);

  return (
    <>
      <Header text="Al Quran" onPress={() => navigation.navigate('Home')} />
      <View style={styles.body}>
        <ScrollView>
          <View style={styles.card}>
            <View>
              <View style={styles.cardTitle}>
                <Image source={Book} style={styles.bookImage} />
                <Gap width={8} />
                <TextSemiBold
                  type="Body 2"
                  text="Terakhir Dibaca"
                  color={colors.white}
                />
              </View>
              <Gap height={39} />
              <TextRegular
                text="Al-Fatihah"
                type="Body 2"
                color={colors.white}
              />
              <TextRegular
                text="Ayat No: 1"
                type="Caption"
                color={colors.white}
              />
            </View>
            <View style={styles.cardImage}>
              <Image source={Quran} style={styles.quranImage} />
            </View>
          </View>
          <Gap height={24} />

          <View style={styles.searchBox}>
            <TextInput placeholder="Cari" style={styles.searhInput} />
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={SearchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
          <Gap height={24} />

          <View style={styles.listSurah}>
            {surah.length > 0 ? (
              surah.map((item, index) => {
                return (
                  <RenderSurah
                    key={index}
                    number={item.number}
                    surah={item.name.transliteration.id}
                    city={item.revelation.id}
                    ayat={`${item.numberOfVerses} Ayat`}
                    arab={item.name.short}
                    onPress={() => navigation.navigate('Detail', item.number)}
                  />
                );
              })
            ) : (
              <RenderSkeleton />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Surah;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#FFFDF5',
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  card: {
    padding: 24,
    backgroundColor: '#DA8856',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#DA8856',
    backgroundColor: 'white',
    borderRadius: 16,
    color: '#DA8856',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '80%',
  },
  tab: {
    borderBottomWidth: 2,
    borderBottomColor: '#DA8856',
  },
  listSurah: {
    flexDirection: 'column',
  },
  surah: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#BBC4CE59',
    justifyContent: 'space-between',
  },
  cardImage: {
    backgroundColor: '#E6DEC7',
    borderTopLeftRadius: 75,
    borderBottomStartRadius: 75,
    paddingHorizontal: 24,
    paddingVertical: 24,
    position: 'absolute',
    right: -1,
    bottom: -1,
    top: -1,
  },
  quranImage: {
    width: 107,
    height: 90,
  },
  surahContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textNumber: {
    width: '15%',
  },
  surahDetail: {
    flexDirection: 'row',
  },
  surahContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speakerImage: {
    width: 18,
    height: 16,
  },
  bookImage: {
    width: 20,
    height: 20,
  },
  searchIcon: {
    width: 25,
    height: 24,
  },
  searchInput: {
    width: '90%',
  },
});
