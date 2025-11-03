import {
  Image,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  Colors,
  ScaleSize,
  TextFontSize,
  Images,
  AppFonts,
} from "../../Resources";
import {
  ModalProgressLoader,
  PrimaryButton,
  SocialButton,
  Textinput,
} from "../../Components/Comman";
import Utils from "../../Helpers/Utils";
import { SignIn, checkSocialId } from "../../Actions/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../../Resources/Languages/index";
import { useTranslation } from "react-i18next";
import { sha512 } from "js-sha512";
import AlertBox from "../../Components/Comman/AlertBox";
import { useIsFocused } from "@react-navigation/native";
import { Strings } from "../../Resources/Strings";
import { useDispatch, useSelector } from "react-redux";
// import SocialLoginHelperService from '../../Helpers/SocialLoginHelper';

const SignInScreen = ({ navigation, route }) => {
  ////////////// States ///////////////
  const { t, i18n } = useTranslation();
  const { isLoading } = useSelector((state) => state.Authentication);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();

  ////////////// Erros //////////////
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  ////////////// Refs ///////////////
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const scrollViewRef = useRef(null);

  ////////////// Function for validation /////////////
  const valid = async () => {
    try {
      var isValid = true;

      const hashedPassword = sha512(password);

      if (Utils.isNull(email)) {
        isValid = false;
        emailRef.current.focus();
        setEmailError(Strings.blank_field_error);
      } else if (!Utils.isEmailValid(email)) {
        isValid = false;
        emailRef.current.focus();
        setEmailError(Strings.invalid_email);
      } else if (Utils.isEmojis(email)) {
        isValid = false;
        emailRef.current.focus();
        setEmailError(Strings.emojis_error);
      } else {
        setEmailError(null);
      }

      if (Utils.isNull(password)) {
        isValid = false;
        passwordRef.current.focus();
        setPasswordError(Strings.blank_field_error);
      } else if (!Utils.isPasswordValid(password)) {
        isValid = false;
        passwordRef.current.focus();
        setPasswordError(Strings.invalid_password);
      } else if (Utils.isEmojis(password)) {
        isValid = false;
        passwordRef.current.focus();
        setPasswordError(Strings.emojis_error);
      } else {
        setPasswordError(null);
      }

      if (Utils.isNull(email) && Utils.isNull(password)) {
        scrollViewRef.current?.scrollTo({ y: emailRef.current?.y || 0 });
        emailRef.current?.focus();
      }
      var body = {
        email: email,
        password: hashedPassword,
        device_type: Platform.OS === "ios" ? 1 : 0,
        device_token: Platform.OS === "ios" ? "android" : 123456,
      };
      // fetch("https://bknd.wpwings.net/app/authentication/login", {
      //   method: "POST", // Specify the method as POST
      //   headers: {
      //     "Content-Type": "application/json", // Specify the content type as JSON
      //   },
      //   body: JSON.stringify(body), // Convert the data to JSON format
      // })
      //   .then((response) => response.json()) // Parse the JSON response
      //   .then((data) => {
      //     console.log("Success:", data); // Handle the response data
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error); // Handle any errors
      //   });

      if (isValid) {
        if (await Utils.isNetworkConnected()) {
          dispatch(
            SignIn(body, async (data, isSuccess) => {
              if (isSuccess === true) {
                console.log("DATAAAAAA", data?.data);

                await AsyncStorage.setItem(
                  "@userData",
                  JSON.stringify(data?.data)
                );
                await AsyncStorage.setItem("@id", data?.data?.id + "");
                await AsyncStorage.setItem(
                  "@authorization_token",
                  data?.data?.authorization_token
                );
                navigation.reset({
                  index: 0,
                  routes: [{ name: "DrawerNavigator" }],
                });
              } else {
                setAlertMessage(data.data.message || "Something went wrong");
                setAlertVisible(true);
              }
            })
          );
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  /////////////// Functions for social login //////////////
  ////// For Google ///////
  function doGoogleLogin() {
    SocialLoginHelperService.signInGoogle()
      .then((socialData) => {
        doSocialLogin(1, socialData);
      })
      .catch(function (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          Utils.DialogBox(t("you_have_cancel_login"));
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Utils.DialogBox(t("unable_to_support_device_login"));
        } else {
          Utils.DialogBox(t("some_thing_went_wrong_please_try_later"));
        }
      });
  }

  //////// For Apple Login ///////
  function doAppleLogin() {
    SocialLoginHelperService.onAppleButtonPress()
      .then((data) => doSocialLogin(3, data))
      .catch(function (error) {
        if (error && error !== "") {
          Utils.DialogBox(error);
        }
      });
  }

  async function doSocialLogin(type, socialData) {
    if (Platform.OS === "android") {
      await messaging().registerDeviceForRemoteMessages();
    }
    var token = await messaging().getToken();
    const language = await AsyncStorage.getItem("@language");
    var body = {
      social_type: type,
      social_id: socialData.id,
      device_token: token,
      device_type: Platform.OS === "ios" ? 0 : 1,
      email: socialData.email,
      currnet_language: language,
    };
    dispatch(
      checkSocialId(body, async (data, isSuccess) => {
        if (isSuccess === true) {
          if (data.data.is_exists === 0) {
            navigation.navigate("SignUpScreen", {
              isFromSocial: true,
              social_id: socialData.social_id,
              name: socialData.name,
              firstName: socialData.first_name,
              lastName: socialData.last_name,
              email: socialData.email,
              gender: socialData.gender,
              socialProfile: socialData.socialProfilePicture,
              social_type: type,
            });
          } else {
            await AsyncStorage.setItem("@userData", JSON.stringify(data.data));
            await AsyncStorage.setItem("@referral", data.data.my_referral_code);
            await AsyncStorage.setItem("@id", data.data.id + "");
            await AsyncStorage.setItem(
              "@platform",
              JSON.stringify(data.data.authorization_platform)
            );
            await AsyncStorage.setItem("@isSocialLogin", "true");
            await AsyncStorage.setItem(
              "@authorization_token",
              data.data.authorization_token
            );
            navigation.reset({
              index: 0,
              routes: [{ name: "BottomTabNavigator" }],
            });
          }
        }
      })
    );
  }

  const isFocused = useIsFocused();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <StatusBar
            backgroundColor={Colors.statusbar}
            barStyle={"dark-content"}
          />
          <ImageBackground source={Images.bg} style={styles.container}>
            <Image source={Images.doll_logo} style={styles.logo} />

            <ModalProgressLoader visible={isLoading && isFocused} />

            <View style={styles.headerTextArea}>
              <Text style={styles.headerText}>
                {Strings.signin_screen_header}
              </Text>
              <Text style={styles.descriptionText}>
                "{Strings.signin_screen_appreciation}"
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                paddingHorizontal: ScaleSize.spacing_medium,
              }}
            >
              <Textinput
                placeholder={Strings.placeholder_email}
                placeholderTextColor={Colors.black}
                source={Images.email_icon}
                refs={emailRef}
                value={email}
                inputMode={"email"}
                error={emailError}
                title={Strings.email_address}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType={"next"}
                onChangeText={(text) => {
                  setEmail(text.trim());
                  setEmailError(false);
                }}
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
              />

              <Textinput
                placeholder={Strings.placeholder_password}
                placeholderTextColor={Colors.black}
                source={Images.password_icon}
                value={password}
                error={passwordError}
                title={Strings.password}
                autoCapitalize="none"
                refs={passwordRef}
                secureTextEntry={true}
                keyboardType="default"
                onChangeText={(text) => {
                  setPassword(text.trim());
                  setPasswordError(false);
                }}
                onSubmitEditing={valid}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => navigation.navigate("ForgotPasswordScreen")}
            >
              <Text style={styles.forgotBtnText}>
                {Strings.forget_password}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: "100%",
                paddingHorizontal: ScaleSize.spacing_medium,
              }}
            >
              <PrimaryButton string={Strings.signin} onPress={valid} />
            </View>

            <View style={styles.sepraterArea}>
              <View style={styles.sepraterLine}></View>
              <Text style={styles.sepraterHeadingText}>{Strings.or}</Text>
              <View style={styles.sepraterLine}></View>
            </View>

            <SocialButton
              onGoogleSignInPress={() => {
                Alert.alert("Coming Soon...");
              }}
              // onAppleSignInPress={doAppleLogin}
            />

            <View style={styles.termsOfSerivceArea}>
              <Text style={styles.termsOfSerivceText}>
                {Strings.terms_of_service_description}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  bottom: ScaleSize.spacing_semi_medium,
                  marginBottom: -ScaleSize.spacing_semi_medium,
                }}
              >
                <TouchableOpacity
                  style={styles.termsTextBtn}
                  onPress={async () => {
                    if (await Utils.isNetworkConnected()) {
                      setTimeout(
                        () => {
                          navigation.navigate("Webview", {
                            type: 1,
                            title: Strings.terms_of_service_btn,
                          });
                        },
                        Platform.OS === "ios" ? 1000 : 0
                      );
                    }
                  }}
                >
                  <Text style={styles.termText}>{Strings.terms}</Text>
                </TouchableOpacity>
                <Text style={styles.andText}>and</Text>
                <TouchableOpacity
                  style={styles.termsTextBtn}
                  onPress={async () => {
                    if (await Utils.isNetworkConnected()) {
                      setTimeout(
                        () => {
                          navigation.navigate("Webview", {
                            type: 2,
                            title: Strings.privacy_policy,
                          });
                        },
                        Platform.OS === "ios" ? 0 : 0
                      );
                    }
                  }}
                >
                  <Text style={styles.termText}>{Strings.privacy_policy}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.signupArea}>
              <Text style={styles.dontHaveAccText}>
                {Strings.dont_have_an_account}
              </Text>
              <TouchableOpacity
                style={styles.signupBtn}
                onPress={() =>
                  navigation.navigate("SignUpScreen", { isFromSocial: false })
                }
              >
                <Text style={styles.signupBtnText}>{Strings.signup}</Text>
              </TouchableOpacity>
            </View>
            <AlertBox
              visible={alertVisible}
              title="Alert"
              error={true}
              message={alertMessage}
              positiveBtnText="OK"
              onPress={() => setAlertVisible(false)}
            />
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: ScaleSize.spacing_semi_medium,
    alignItems: "center",
  },
  logo: {
    marginTop: ScaleSize.spacing_large,
    height: ScaleSize.very_small_image - 15,
    alignSelf: "flex-start",
    width: ScaleSize.very_small_image - 15,
    resizeMode: "contain",
    left: ScaleSize.spacing_medium,
  },
  headerTextArea: {
    width: "100%",
    marginVertical: ScaleSize.spacing_semi_medium,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: ScaleSize.spacing_medium,
  },
  headerText: {
    fontFamily: AppFonts.extra_bold,
    fontSize: TextFontSize.very_large_text + 2,
    color: Colors.black,
  },
  descriptionText: {
    fontFamily: AppFonts.medium_italic,
    fontSize: TextFontSize.small_text + 2,
    color: Colors.black,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: ScaleSize.spacing_large,
    paddingBottom: ScaleSize.spacing_small,
  },
  forgotBtnText: {
    color: Colors.black,
    top: ScaleSize.font_spacing + 2,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.very_small_text - 1,
  },
  sepraterArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: ScaleSize.spacing_small,
    marginBottom: ScaleSize.spacing_medium,
    paddingHorizontal: ScaleSize.spacing_medium,
  },
  sepraterLine: {
    backgroundColor: Colors.light_gray,
    height: 1,
    flex: 0.2,
  },
  sepraterHeadingText: {
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.small_text - 1,
    marginHorizontal: ScaleSize.spacing_medium,
  },
  signupArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: ScaleSize.spacing_semi_medium,
  },
  dontHaveAccText: {
    color: Colors.black,
    fontSize: TextFontSize.small_text,
    fontFamily: AppFonts.medium,
  },
  signupBtn: {
    padding: ScaleSize.spacing_small,
  },
  signupBtnText: {
    color: Colors.secondary,
    fontSize: TextFontSize.small_text,
    fontFamily: AppFonts.bold,
    textTransform: "capitalize",
  },
  termsOfSerivceArea: {
    marginTop: ScaleSize.spacing_medium,
    justifyContent: "center",
    alignItems: "center",
  },
  termsOfSerivceText: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.black,
    marginBottom: 10,
    fontFamily: AppFonts.regular,
    fontSize: TextFontSize.small_text,
  },
  andText: {
    top: ScaleSize.spacing_very_small,
    color: Colors.black,
    fontFamily: AppFonts.regular,
    fontSize: TextFontSize.small_text,
  },
  termsTextBtn: {
    borderBottomWidth: 1,
    margin: ScaleSize.spacing_small,
  },
  termText: {
    fontFamily: AppFonts.bold,
    color: Colors.black,
    top: ScaleSize.spacing_very_small,
    fontSize: TextFontSize.small_text,
  },
});
