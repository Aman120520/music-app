import {
  Platform,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, ScaleSize, TextFontSize, AppFonts} from '../../Resources';

const PrimaryButton = props => {
  return (
    <TouchableOpacity
      style={
        props.customStyle
          ? props.buttonStyle
          : [
              styles.PrimaryBtn,
              {
                backgroundColor: props.isOrange
                  ? Colors.orange
                  : Colors.primary,
              },
            ]
      }
      {...props}>
      {props.isIcon === true ? (
        <Image source={props.source} style={props.iconStyle} />
      ) : null}
      <Text style={props.customStyle ? props.textStyle : styles.PrimaryBtnText}>
        {props.string}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  PrimaryBtn: {
    // height: ScaleSize.spacing_extra_large * 1.1,
    height: ScaleSize.spacing_extra_large,
    width: '100%',
    margin: ScaleSize.spacing_semi_medium,
    alignSelf: 'center',
    padding: ScaleSize.spacing_medium,
    borderRadius: ScaleSize.primary_border_radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PrimaryBtnText: {
    fontFamily: AppFonts.bold,
    color: Colors.white,
    // bottom: Platform.OS === 'ios' ? null : ScaleSize.font_spacing,
    fontSize: TextFontSize.small_text + 3,
  },
});
