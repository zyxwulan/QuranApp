import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scaleSize} from '../utils';

const Gap = ({width = 0, height = 0}) => {
  return <View style={styles.gap(width, height)}></View>;
};

const styles = StyleSheet.create({
  gap: (width, height) => ({
    width: scaleSize(width),
    height: scaleSize(height),
  }),
});

export default Gap;
