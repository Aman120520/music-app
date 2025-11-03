import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import DrawerSceneWrapper from "../../Components/Comman/DrawerSceneWrapper";
import { Images } from "../../Resources/Images";
import { ScaleSize } from "../../Resources/ScaleSize";
import Header from "../../Components/Comman/Drawer/Header";
import { AppFonts } from "../../Resources/AppFonts";
import { Colors } from "../../Resources/Colors";
import { TextFontSize } from "../../Resources/TextFontSize";
import { SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from "react-native-render-html";
import { useDispatch, useSelector } from "react-redux";
import { privacyPolicy } from "../../Actions/authentication";
import { ModalProgressLoader } from "../../Components/Comman";

const PrivacyPolicyScreen = ({ navigation, route }) => {
  const { openDrawer } = navigation;
  const { privayPolicyData, isLoading } = useSelector(
    (state) => state.Authentication
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(privacyPolicy());
  }, []);

  const { width, height } = useWindowDimensions();

  const customHTMLElementModels = {
    "blue-circle": HTMLElementModel.fromCustomModel({
      tagName: "blue-circle",
      mixedUAStyles: {
        width: ScaleSize.spacing_very_large,
        height: ScaleSize.spacing_very_large,
        borderRadius: ScaleSize.semi_medium_radius,
        alignSelf: "center",
      },
      contentModel: HTMLContentModel.block,
    }),
  };
  const htmlStyles = {
    p: {
      fontSize: TextFontSize.small_text,
      lineHeight: 24,
      color: Colors.black,
      fontFamily: AppFonts.regular,
      marginVertical: 8,
    },
    strong: {
      fontWeight: "bold",
      color: Colors.black,
      fontFamily: AppFonts.bold,
      fontSize: TextFontSize.medium_text - 3,
    },
    h1: {
      fontSize: TextFontSize.heading_large,
      fontFamily: AppFonts.semi_bold,
      color: Colors.black,
      marginVertical: 10,
    },
    h2: {
      fontSize: TextFontSize.heading_medium,
      fontFamily: AppFonts.semi_bold,
      color: Colors.black,
      marginVertical: 8,
    },
    a: {
      color: Colors.primary,
      textDecorationLine: "underline",
      fontFamily: AppFonts.regular,
    },
    ul: {
      marginLeft: 20,
      marginVertical: 10,
    },
    li: {
      fontSize: TextFontSize.medium_text,
      color: Colors.black,
      fontFamily: AppFonts.regular,
      marginVertical: 4,
    },
    img: {
      maxWidth: "100%",
      height: undefined,
      width: undefined,
      marginVertical: 10,
    },
  };

  return (
    <DrawerSceneWrapper>
      {/* <ScrollView style={{flexGrow: 1}}> */}
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <ImageBackground style={styles.container} source={Images.bg}>
          <Header
            title={"Privacy Policy"}
            onLeftButtonPress={openDrawer}
            leftIcon={Images.menu_icon}
          />
          {/* <Text
            style={{
              fontSize: TextFontSize.medium_text * 1.5,
              fontFamily: AppFonts.regular,
              color: Colors.black,
              top: 250,
            }}
          >
            COMING SOON
          </Text> */}
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <ModalProgressLoader visible={isLoading} />

            <RenderHtml
              contentWidth={width}
              contentHeight={height}
              customHTMLElementModels={customHTMLElementModels}
              source={{
                html: privayPolicyData?.content,
              }}
              tagsStyles={htmlStyles}
            />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
      {/* </ScrollView> */}
    </DrawerSceneWrapper>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: ScaleSize.spacing_large,
    paddingVertical: ScaleSize.spacing_semi_medium,
  },
  scrollView: {
    flexGrow: 1,
  },
});
