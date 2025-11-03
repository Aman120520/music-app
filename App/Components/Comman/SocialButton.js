import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {
  Colors,
  Strings,
  ScaleSize,
  TextFontSize,
  Images,
  AppFonts,
} from '../../Resources';

const SocialButton = ({
  onGoogleSignInPress,
  onFacebookSignInPress,
  onAppleSignInPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.socialBtn} onPress={onGoogleSignInPress}>
        <Image style={styles.social_media_icon} source={Images.google_icon} />
        <Text style={styles.connectText}>{Strings.sigin_with_google}</Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <TouchableOpacity style={styles.socialBtn} onPress={onAppleSignInPress}>
          <Image style={styles.social_media_icon} source={Images.apple_icon} />
          <Text style={styles.connectText}>{Strings.signin_with_apple}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  container: {
    width: '105%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ScaleSize.spacing_large,
  },
  socialBtn: {
    width: '100%',
    margin: ScaleSize.spacing_very_small,
    height: ScaleSize.spacing_extra_large,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: ScaleSize.spacing_semi_medium,
    borderRadius: ScaleSize.primary_border_radius,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.light_gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  social_media_icon: {
    height: ScaleSize.large_icon + 1,
    width: ScaleSize.large_icon + 1,
    resizeMode: 'contain',
    marginHorizontal: ScaleSize.spacing_small + 4,
  },
  connectText: {
    fontFamily: AppFonts.semi_bold,
    color: Colors.black,
    top: ScaleSize.font_spacing,
    fontSize: TextFontSize.small_text + 1,
  },
});
