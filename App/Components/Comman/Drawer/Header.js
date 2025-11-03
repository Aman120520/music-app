import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { ScaleSize } from "../../../Resources/ScaleSize";
import { Colors } from "../../../Resources/Colors";
import { AppFonts } from "../../../Resources/AppFonts";
import { TextFontSize } from "../../../Resources/TextFontSize";
import { Images } from "../../../Resources/Images";
import { useSelector } from "react-redux";
import { ImageBackground } from "react-native";

const Header = (props) => {
  const { userData } = useSelector((state) => state.Authentication);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={props.onLeftButtonPress}
      >
        <Image
          style={props.leftIconStyle ? props.leftIconStyle : styles.leftIcon}
          source={props.leftIcon}
        />
      </TouchableOpacity>
      <Text style={styles.titleText}>{props.title}</Text>

      <TouchableOpacity
        style={[
          styles.rightButton,
          {
            backgroundColor: props.isProfileShow ? Colors.light_gray : null,
            elevation: props.isProfileShow ? 10 : null,
          },
        ]}
        onPress={props.onRightButtonPress}
      >
        {props.isProfileShow &&
          (userData?.profile_picture ? (
            <Image style={styles.rightIcon} source={props.rightIcon} />
          ) : (
            <Image
              style={styles.placeHolderIcon}
              source={Images.doll_placeholder_logo}
            />
          ))}

        {props.isCartShow && (
          <ImageBackground
            style={[
              styles.rightIcon,
              {
                height: "90%",
                width: "90%",
              },
            ]}
            source={props.rightIcon}
          >
            {props.count && (
              <View style={styles.badgeIcon}>
                <Text style={styles.countText}>{props.count}</Text>
              </View>
            )}
          </ImageBackground>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: ScaleSize.spacing_extra_large,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftButton: {
    paddingRight: ScaleSize.spacing_small,
    borderRadius: ScaleSize.small_border_radius,
  },
  leftIcon: {
    height: ScaleSize.large_icon * 2,
    width: ScaleSize.large_icon * 2,
    resizeMode: "contain",
  },
  titleText: {
    color: Colors.black,
    fontSize: TextFontSize.medium_text + 2,
    fontFamily: AppFonts.bold,
  },
  rightButton: {
    borderRadius: ScaleSize.very_small_border_radius,
    height: ScaleSize.large_icon * 2,
    width: ScaleSize.large_icon * 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  rightIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  placeHolderIcon: {
    height: "70%",
    width: "70%",
    resizeMode: "contain",
    tintColor: Colors.black,
  },
  badgeIcon: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    right: 0,
    width: "50%",
    height: "50%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    color: Colors.white,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.extra_small_text - 2,
  },
});
