import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerSceneWrapper from "../../Components/Comman/DrawerSceneWrapper";
import { Images } from "../../Resources/Images";
import { ScaleSize } from "../../Resources/ScaleSize";
import Header from "../../Components/Comman/Drawer/Header";
import { AppFonts } from "../../Resources/AppFonts";
import { Colors } from "../../Resources/Colors";
import { TextFontSize } from "../../Resources/TextFontSize";
import { SafeAreaView } from "react-native";

const RateUsScreen = ({ navigation, route }) => {
  const { openDrawer } = navigation;
  return (
    <DrawerSceneWrapper>
      {/* <ScrollView style={{flexGrow: 1}}> */}
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <ImageBackground style={styles.container} source={Images.bg}>
          <Header
            title={"Rate Us"}
            onLeftButtonPress={openDrawer}
            leftIcon={Images.menu_icon}
          />
          <Text
            style={{
              fontSize: TextFontSize.medium_text * 1.5,
              fontFamily: AppFonts.regular,
              color: Colors.black,
              top: 250,
            }}
          >
            COMING SOON
          </Text>
        </ImageBackground>
      </SafeAreaView>
      {/* </ScrollView> */}
    </DrawerSceneWrapper>
  );
};

export default RateUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: ScaleSize.spacing_large,
    paddingVertical: ScaleSize.spacing_semi_medium,
  },
});
