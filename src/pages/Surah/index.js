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
        <View style={{flexDirection: 'row',flex: 1}}>
          <TextRegular
            type="Body 2"
            text={number}
            color={colors['primary-500']}
            style={{width: '15%'}}
          />
          <View>
            <TextRegular
              type="Body 2"
              text={surah}
              color={colors['primary-500']}
            />
            <View style={{flexDirection: 'row'}}>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextBold text={arab} type="Body 1" color={colors['primary-500']} />
          <Gap width={18} />
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={Speaker} style={{width: 18, height: 16}} />
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
                <Image source={Book} style={{width: 20, height: 20}} />
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
              <Image source={Quran} style={{width: 107, height: 90}} />
            </View>
          </View>
          <Gap height={24} />

          <View style={styles.searchBox}>
            <TextInput placeholder="Cari" style={{width: '90%'}} />
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={SearchIcon} style={{width: 25, height: 24}} />
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
});
