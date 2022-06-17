import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ArrowBack} from '../assets';
import Gap from './Gap';
import {TextRegular} from './Text';
import {colors} from '../utils';

const Header = ({onPress, text}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Image source={ArrowBack} style={{width: 8, height: 16}} />
      </TouchableOpacity>
      <Gap width={18} />
      <TextRegular type="Body 1" text={text} color={colors['primary-500']} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFDF5',
    paddingHorizontal: 24,
    paddingVertical: 18,
    elevation: 10,
  },
});
