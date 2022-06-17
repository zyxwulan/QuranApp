import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {scaleFont} from '../utils';

const getSize = type => {
  switch (type) {
    case 'H1':
      return 96;
    case 'H2':
      return 60;
    case 'H3':
      return 44;
    case 'H4':
      return 40;
    case 'H5':
      return 28;
    case 'H6':
      return 24;
    case 'Subtitle':
      return 20;
    case 'Body 1':
      return 16;
    case 'Body 2':
      return 14;
    case 'Caption':
      return 12;
    case 'Overline':
      return 10;
  }
};

const getLineHeight = size => {
  switch (size) {
    case 96:
      return size * 1.2;
    case 60:
      return size * 1.2;
    case 48:
      return size * 1.2;
    case 40:
      return size * 1.4;
    case 32:
      return size * 1.4;
    case 24:
      return size * 1.4;
    case 20:
      return size * 1.6;
    case 16:
      return size * 1.6;
    case 14:
      return size * 1.6;
    case 12:
      return 16.34;
    case 10:
      return 13.62;
  }
};

export const TextBold = ({style, type, text, color}) => {
  const size = getSize(type);
  const lineHeight = getLineHeight(size);
  return (
    <Text style={[styles.bold(size, color, lineHeight), style]}>{text}</Text>
  );
};

export const TextSemiBold = ({style, type, text, color}) => {
  const size = getSize(type);
  const lineHeight = getLineHeight(size);
  return (
    <Text style={[styles.semiBold(size, color, lineHeight), style]}>
      {text}
    </Text>
  );
};

export const TextRegular = ({style, type, text, color}) => {
  const size = getSize(type);
  const lineHeight = getLineHeight(size);
  return (
    <Text style={[styles.regular(size, color, lineHeight), style]}>{text}</Text>
  );
};

export const TextLight = ({style, type, text, color}) => {
  const size = getSize(type);
  const lineHeight = getLineHeight(size);
  return (
    <Text style={[styles.light(size, color, lineHeight), style]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  bold: (size, color, lineHeight) => ({
    fontFamily: 'Poppins-Bold',
    fontSize: scaleFont(size),
    color: color,
    lineHeight: lineHeight,
  }),
  semiBold: (size, color, lineHeight) => ({
    fontFamily: 'Poppins-SemiBold',
    fontSize: scaleFont(size),
    color: color,
    lineHeight: lineHeight,
  }),
  regular: (size, color, lineHeight) => ({
    fontFamily: 'Poppins-Regular',
    fontSize: scaleFont(size),
    color: color,
    lineHeight: lineHeight,
  }),
  light: (size, color, lineHeight) => ({
    fontFamily: 'Poppins-Light',
    fontSize: scaleFont(size),
    color: color,
    lineHeight: lineHeight,
  }),
});
