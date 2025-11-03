import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from "react-native-render-html";
import { useDispatch, useSelector } from "react-redux";
import { privacyPolicy, termsOfSerivce } from "../../Actions/authentication";
import { ModalProgressLoader } from "../../Components/Comman";
import { ScaleSize } from "../../Resources/ScaleSize";
import { Colors } from "../../Resources/Colors";
import { AppFonts } from "../../Resources/AppFonts";
import { TextFontSize } from "../../Resources/TextFontSize";
import { Images } from "../../Resources/Images";

const Webview = ({ navigation, route }) => {
  const { tosData, privayPolicyData, isLoading } = useSelector(
    (state) => state.Authentication
  );
  const dispatch = useDispatch();
  const { title, type } = route.params;

  useEffect(() => {
    if (type === 1) {
      dispatch(termsOfSerivce());
    } else {
      dispatch(privacyPolicy());
    }
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
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingBottom: ScaleSize.spacing_large,
          backgroundColor: "white",
        }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.leftButton}
            onPress={() => navigation.goBack()}
          >
            <Image style={styles.leftIcon} source={Images.back_icon} />
          </TouchableOpacity>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <ModalProgressLoader visible={isLoading} />

          <RenderHtml
            contentWidth={width}
            contentHeight={height}
            customHTMLElementModels={customHTMLElementModels}
            source={{
              html: type === 1 ? tosData?.content : privayPolicyData?.content,
            }}
            tagsStyles={htmlStyles}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Webview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: ScaleSize.spacing_large,
  },
  topBar: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: ScaleSize.spacing_large,
    marginBottom: ScaleSize.spacing_small,
  },
  backBtn: {
    position: "absolute",
    left: 0,
  },
  backBtnIcon: {
    height: ScaleSize.medium_icon,
    width: ScaleSize.medium_icon,
    resizeMode: "contain",
  },
  becomeDriverText: {
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.small_text,
    color: Colors.black,
  },
  leftButton: {
    paddingRight: ScaleSize.spacing_small,
    paddingVertical: ScaleSize.spacing_large,
    borderRadius: ScaleSize.small_border_radius,
    left: ScaleSize.spacing_large,
    position: "absolute",
  },
  leftIcon: {
    height: ScaleSize.large_icon * 1,
    width: ScaleSize.large_icon * 1,
    resizeMode: "contain",
  },
  titleText: {
    color: Colors.black,
    top: ScaleSize.font_spacing,
    fontSize: TextFontSize.medium_text,
    fontFamily: AppFonts.bold,
  },
  rightButton: {
    paddingRight: ScaleSize.spacing_small,
  },
  rightIcon: {
    height: ScaleSize.large_icon,
    width: ScaleSize.large_icon,
    borderRadius: ScaleSize.very_small_border_radius,
    resizeMode: "contain",
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: ScaleSize.spacing_large,
    width: "100%",
    height: ScaleSize.spacing_extra_large - 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
