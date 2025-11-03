import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {ScaleSize} from '../../Resources/ScaleSize';
import {TextFontSize} from '../../Resources/TextFontSize';
import {Colors} from '../../Resources/Colors';
import {AppFonts} from '../../Resources/AppFonts';

const CommonHeader = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={props.onLeftButtonPress}>
        <Image style={styles.leftIcon} source={props.leftIcon} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{props.title}</Text>
      <TouchableOpacity
        style={styles.rightButton}
        onPress={props.onRightButtonPress}>
        <Image style={styles.rightIcon} source={props.rightIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ScaleSize.spacing_extra_large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftButton: {
    paddingRight: ScaleSize.spacing_small,
    paddingVertical: ScaleSize.spacing_large,
    borderRadius: ScaleSize.small_border_radius,
  },
  leftIcon: {
    height: ScaleSize.large_icon * 1.2,
    width: ScaleSize.large_icon * 1.2,
    resizeMode: 'contain',
  },
  titleText: {
    color: Colors.black,
    top: ScaleSize.font_spacing,
    fontSize: TextFontSize.medium_text + 2,
    fontFamily: AppFonts.bold,
  },
  rightButton: {
    paddingRight: ScaleSize.spacing_small,
  },
  rightIcon: {
    height: ScaleSize.large_icon,
    width: ScaleSize.large_icon,
    borderRadius: ScaleSize.very_small_border_radius,
    resizeMode: 'contain',
  },
});
