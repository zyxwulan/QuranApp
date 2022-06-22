import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Gap,
  Header,
  TextBold,
  TextRegular,
  TextSemiBold,
} from '../../components';
import {colors} from '../../utils';
import axios from 'axios';

const Detail = ({navigation, route}) => {
  const RenderAyat = ({arab, meaning, number}) => {
    return (
      <View style={styles.ayat}>
        <TextSemiBold
          text={number}
          type="Body 2"
          color={colors['primary-500']}
        />
        <View style={styles.fullContainer}>
          <TextSemiBold text={arab} type="Body 1" style={styles.textBlack} />
          <Gap height={8} />
          <TextRegular text={meaning} type="Body 2" style={styles.textBlack} />
        </View>
      </View>
    );
  };

  const [ayat, setAyat] = useState({});

  const id = route?.params;

  const getAyat = async () => {
    const response = await axios.get(
      `https://api.quran.sutanlab.id/surah/${id}`,
    );
    setAyat(response.data.data);
  };

  useEffect(() => {
    getAyat();
  });

  return (
    <>
      <Header
        text={ayat?.name?.transliteration?.id}
        onPress={() => navigation.navigate('Surah')}
      />
      <View style={styles.body}>
        <ScrollView>
          <View style={styles.header}>
            <TextRegular
              type="Caption"
              text={ayat?.revelation?.id}
              color={colors.white}
            />
            <TextBold
              type="Body 2"
              text={ayat?.name?.translation?.id}
              color={colors.white}
            />
            <TextBold
              type="Caption"
              text={`${ayat?.numberOfVerses} Ayat`}
              color={colors.white}
            />
          </View>
          <Gap height={19} />

          <View>
            {ayat?.verses?.map((item, index) => {
              console.log(item);
              return (
                <RenderAyat
                  key={index}
                  arab={item?.text?.arab}
                  meaning={item?.translation?.id}
                  number={item?.number?.inSurah}
                />
              );
            })}
          </View>
          <Gap height={65} />
        </ScrollView>
      </View>
    </>
  );
};

export default Detail;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFFDF5',
  },
  header: {
    width: '115%',
    backgroundColor: '#DA8856',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 40,
    marginHorizontal: -24,
    alignSelf: 'center',
  },
  ayat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  textBlack: {
    color: 'black',
  },
  fullContainer: {
    flex: 1,
  },
});
