import {
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ImageBackground,
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  Colors,
  ScaleSize,
  TextFontSize,
  Images,
  AppFonts,
} from "../../Resources";
import {
  PrimaryButton,
  ImagePickerDilouge,
  ModalProgressLoader,
  Textinput,
} from "../../Components/Comman";
import Utils from "../../Helpers/Utils";
import { sha512 } from "js-sha512";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertBox from "../../Components/Comman/AlertBox";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Strings } from "../../Resources/Strings";
import { SignUp, userDetails } from "../../Actions/authentication";

const SignUpScreen = ({ navigation, route }) => {
  ///////////////// States /////////////////
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [images, setImages] = useState();
  const { isLoading } = useSelector((state) => state.Authentication);
  // const {isFromSocial} = route.params;
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  ///////////////// Refs /////////////////
  const emailRef = useRef(null);
  const fullNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const imageRef = useRef(null);
  const scrollViewRef = useRef(null);

  ///////////////// Error States /////////////////
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [imageError, setImageError] = useState("");

  ///////////////// Function for Image Picker /////////////////
  const handleTakePicture = () => {
    setPopupOpen(false);
    ImagePicker.openCamera({
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.4,
    })
      .then((selectedImages) => {
        setImages(selectedImages);
        setImageError(false);
      })

      .catch((error) => {
        console.log("Image picker error: ", error);
      });
  };

  const handleChooseFromGallery = () => {
    setPopupOpen(false);
    setTimeout(
      () => {
        ImagePicker.openPicker({
          mediaType: "photo",
          cropping: true,
          cropperCircleOverlay: true,
          compressImageQuality: 0.4,
        })
          .then((selectedImages) => {
            setImages(selectedImages);
            setImageError(false);
          })
          .catch((error) => {
            console.log("Image picker error: ", error);
          });
      },
      Platform.OS === "ios" ? 1500 : 0
    );
  };

  useEffect(() => {
    requestPermission();
  }, []);

  // async function requestPermission() {
  //   try {
  //     if (Platform.OS === 'android') {
  //       // For Android 6.0 and above (API level 23+), we need to request permissions at runtime.

  //       // Request CAMERA and READ_EXTERNAL_STORAGE permissions
  //       const cameraPermission = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //       );
  //       const storagePermission = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       );

  //       // Check if both permissions were granted
  //       if (
  //         cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
  //         storagePermission === PermissionsAndroid.RESULTS.GRANTED
  //       ) {
  //         console.log('Camera and Storage permission granted');
  //       } else {
  //         console.log('Camera or Storage permission denied');
  //       }

  //       // For Android 11 and above (API level 30+), request "MANAGE_EXTERNAL_STORAGE" for broader file access
  //       if (Platform.Version >= 30) {
  //         const manageStoragePermission = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
  //         );

  //         if (manageStoragePermission === PermissionsAndroid.RESULTS.GRANTED) {
  //           console.log('Manage external storage permission granted');
  //         } else {
  //           console.log('Manage external storage permission denied');
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.warn('Permission request failed: ', err);
  //   }
  // }

  async function requestPermission() {
    if (Platform.OS === "android") {
      try {
        // Request CAMERA and READ_EXTERNAL_STORAGE permissions
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        const storagePermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );

        // If both permissions are granted, log success
        if (
          cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
          storagePermission === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Camera and Storage permission granted");
        } else {
          console.log("Camera or Storage permission denied");
        }
      } catch (err) {
        console.warn("Permission request failed: ", err);
      }
    }
  }

  ///////////////// Function for Validation /////////////////
  const valid = async () => {
    const hashedPassword = sha512(password);

    var isValid = true;

    if (Utils.isNull(fullName)) {
      isValid = false;
      fullNameRef.current.focus();
      setFullNameError(Strings.blank_field_error);
    } else if (Utils.isEmojis(email)) {
      isValid = false;
      fullNameRef.current.focus();
      setFullNameError(Strings.emojis_error);
    } else {
      setFullNameError(null);
    }

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
      setPasswordError(Strings.blank_field_error);
    } else {
      setPasswordError(null);
    }

    if (Utils.isNull(confirmPassword)) {
      isValid = false;
      confirmPasswordRef.current.focus();
      setConfirmPasswordError(Strings.blank_field_error);
    } else if (confirmPassword !== password) {
      isValid = false;
      confirmPasswordRef.current.focus();
      setConfirmPasswordError(Strings.unique_password_alert);
    } else if (Utils.isEmojis(confirmPassword)) {
      isValid = false;
      confirmPasswordRef.current.focus();
      setConfirmPasswordError(Strings.blank_field_error);
    } else {
      setConfirmPasswordError(null);
    }

    if (
      Utils.isNull(fullName) &&
      Utils.isNull(email) &&
      Utils.isNull(password) &&
      Utils.isNull(confirmPassword)
    ) {
      scrollViewRef.current?.scrollTo({ y: fullNameRef.current?.y || 0 });
      fullNameRef.current?.focus();
    }

    let body = new FormData();
    body.append("full_name", fullName);
    body.append("email", email);
    body.append("password", hashedPassword);
    body.append("device_token", Platform.OS === "ios" ? "android" : 123456);
    body.append("device_type", Platform.OS === "ios" ? 1 : 0);
    if (images) {
      body.append("profile_picture", {
        uri: images.path,
        type: "image/jpg",
        name: images.path.replace(/^.*[\\/]/, ""),
        filename: images.path.replace(/^.*[\\/]/, ""),
      });
    }

    // var endPoint = 'sign_up';
    // if (route.params && route.params.social_id) {
    //   endPoint = 'social_signup';
    //   body.social_id = route.params.social_id;
    //   body.social_type = route.params.social_type;
    //   body.socialProfile = route.params.socialProfile;
    // } else {
    //   body.password = hashedPassword;
    // }

    if (isValid) {
      if (await Utils.isNetworkConnected()) {
        dispatch(
          SignUp(body, async (data, isSuccess) => {
            if (isSuccess === true) {
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
              // var body = {
              //   user_id: data.data.id,
              // };
              // dispatch(
              //   userDetails(body, async (data, isSuccess) => {
              //     if (isSuccess === true) {
              //       // navigation.reset({
              //       //   index: 0,
              //       //   routes: [{ name: "DrawerNavigator" }],
              //       // });
              //       // setLoaderVisible(false);
              //     }
              //   })
              // );
              // if (
              //   route.params &&
              //   route.params.social_id &&
              //   (!images || !images.path)
              // ) {
              //   await AsyncStorage.setItem(
              //     '@userProfile',
              //     JSON.stringify(data.data.profile_picture),
              //   );
              //   var body = {
              //     user_id: data.data.user_id,
              //   };
              //   dispatch(
              //     userDetails(body, async (data, isSuccess) => {
              //       if (isSuccess === true) {
              //         setLoaderVisible(false);
              //         setTimeout(
              //           () => {
              //             navigation.replace('MobileVerification', {
              //               isFromAccountScreen: false,
              //               isFromSignUp: true,
              //               isFromEditProfile: false,
              //               isFromMyBookings: true,
              //             });
              //           },
              //           Platform.OS === 'ios' ? 1000 : 0,
              //         );
              //       }
              //     }),
              //   );
              // } else {
              //   handleComplete(data);
              // }
            } else {
              setAlertMessage(data.data.message || "Something went wrong");
              setAlertVisible(true);
            }
          })
        );
      }
    }
  };

  return (
    <>
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
          <View>
            <ScrollView
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              ref={scrollViewRef}
            >
              <StatusBar
                backgroundColor={Colors.statusbar}
                barStyle={"dark-content"}
              />
              <ImageBackground source={Images.bg} style={styles.container}>
                <ModalProgressLoader visible={isLoading} />

                <View style={styles.textInputArea}>
                  <View style={styles.headerTextArea}>
                    <Text style={styles.createAccountText}>
                      {Strings.signup_screen_header}
                    </Text>
                    <Text style={styles.descriptionText}>
                      "{Strings.signup_screen_description}"
                    </Text>
                  </View>

                  <View style={styles.profileImageArea}>
                    <View>
                      <Image
                        source={Images.plus_icon}
                        style={styles.cameraIcon}
                      />
                      <TouchableOpacity
                        style={[
                          styles.profileImageBtn,
                          {
                            borderWidth: ScaleSize.spacing_very_small + 1,
                            borderColor: imageError
                              ? Colors.red
                              : Colors.primary,
                          },
                        ]}
                        onPress={() => {
                          setPopupOpen(true);
                        }}
                      >
                        <ImageBackground
                          ref={imageRef}
                          source={Images.profilePlaceholder}
                          style={{
                            borderRadius: ScaleSize.primary_border_radius,
                          }}
                        >
                          {images ? (
                            <Image
                              style={styles.profileImage}
                              source={{ uri: images.path }}
                            />
                          ) : (
                            <Image
                              style={styles.placeholderImage}
                              source={Images.doll_placeholder_logo}
                            />
                          )}
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {imageError ? (
                    <View style={styles.errorTextArea}>
                      <Text style={styles.errorText}>{imageError}</Text>
                    </View>
                  ) : null}

                  <Textinput
                    placeholder={Strings.placeholder_fullname}
                    placeholderTextColor={Colors.black}
                    refs={fullNameRef}
                    autoCapitalize="words"
                    value={fullName}
                    error={fullNameError}
                    title={Strings.full_name}
                    returnKeyType={"next"}
                    keyboardType="default"
                    onChangeText={(text) => {
                      setFullName(text.trim());
                      setFullNameError(false);
                    }}
                    onSubmitEditing={() => {
                      emailRef.current.focus();
                    }}
                  />

                  <Textinput
                    placeholder={Strings.placeholder_email}
                    placeholderTextColor={Colors.black}
                    value={email}
                    autoCapitalize="none"
                    error={emailError}
                    onChangeText={(text) => {
                      setEmail(text.trim());
                      setEmailError(false);
                    }}
                    refs={emailRef}
                    title={Strings.email_address}
                    returnKeyType={"next"}
                    keyboardType="email-address"
                    onSubmitEditing={() => {
                      passwordRef.current.focus();
                    }}
                  />

                  <Textinput
                    placeholder={Strings.placeholder_password}
                    placeholderTextColor={Colors.black}
                    value={password}
                    autoCapitalize="none"
                    error={passwordError}
                    onChangeText={(text) => {
                      setPassword(text.trim());
                      setPasswordError(false);
                    }}
                    title={Strings.password}
                    refs={passwordRef}
                    returnKeyType={"next"}
                    secureTextEntry={true}
                    keyboardType="default"
                    onSubmitEditing={() => {
                      confirmPasswordRef.current.focus();
                    }}
                  />
                  <Textinput
                    placeholder={Strings.placeholder_confirm_password}
                    placeholderTextColor={Colors.black}
                    value={confirmPassword}
                    autoCapitalize="none"
                    error={confirmPasswordError}
                    title={Strings.confirm_password}
                    onChangeText={(text) => {
                      setConfirmPassword(text.trim());
                      setConfirmPasswordError(false);
                    }}
                    refs={confirmPasswordRef}
                    returnKeyType={"done"}
                    secureTextEntry={true}
                    keyboardType="default"
                    onSubmitEditing={valid}
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
                            navigation.navigate("Webview", {
                              type: 1,
                              title: Strings.terms_of_service_btn,
                            });
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
                            navigation.navigate("Webview", {
                              type: 2,
                              title: Strings.privacy_policy,
                            });
                          }
                        }}
                      >
                        <Text style={styles.termText}>
                          {Strings.privacy_policy}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.signinBtnPrimary}>
                    <PrimaryButton
                      string={Strings.signup}
                      onPress={() => {
                        valid();
                      }}
                    />
                  </View>

                  <View style={styles.signinArea}>
                    <Text style={styles.alreadyHaveAccText}>
                      {Strings.already_have_an_account}
                    </Text>
                    <TouchableOpacity
                      style={styles.signinBtn}
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={styles.signinBtnText}>
                        {Strings.signin_here}.
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <ImagePickerDilouge
                  popupOpen={popupOpen}
                  handlePopup={() => setPopupOpen(false)}
                  handleTakePicture={handleTakePicture}
                  handleChooseFromGallery={handleChooseFromGallery}
                />
              </ImageBackground>
            </ScrollView>
            <AlertBox
              visible={alertVisible}
              title="Alert"
              error={true}
              message={alertMessage}
              positiveBtnText="OK"
              onPress={() => setAlertVisible(false)}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  optionalText: {
    fontFamily: AppFonts.medium_italic,
    color: Colors.gray,
    fontSize: TextFontSize.extra_small_text,
    textAlign: "left",
    width: "100%",
    paddingHorizontal: ScaleSize.spacing_medium,
  },
  webView: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {
    flexGrow: 1,
    // alignItems: 'center',
    backgroundColor: Colors.white,
  },
  container: {
    flexGrow: 1,
    // alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: ScaleSize.spacing_semi_medium,
  },
  textInputArea: {
    flex: 1,
    width: "100%",
    paddingHorizontal: ScaleSize.spacing_semi_medium,
    alignItems: "center",
  },
  headerTextArea: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    marginVertical: ScaleSize.spacing_small,
  },
  createAccountText: {
    width: "100%",
    fontFamily: AppFonts.extra_bold,
    fontSize: TextFontSize.very_large_text + 2,
    color: Colors.black,
  },
  descriptionText: {
    fontFamily: AppFonts.medium_italic,
    fontSize: TextFontSize.small_text + 2,
    color: Colors.black,
  },
  horizontalTextinputArea: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dropDown: {
    width: ScaleSize.spacing_large * 2,
    marginRight: -ScaleSize.spacing_semi_medium,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dateArea: {
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: TextFontSize.small_text,
    fontFamily: AppFonts.semi_bold,
    textAlignVertical: "center",
    verticalAlign: "center",
    left: ScaleSize.spacing_very_small - 5,
    color: Colors.primary,
    position: "absolute",
  },
  item: {
    fontFamily: AppFonts.medium,
  },
  phoneNumberArea: {
    width: "65%",
    alignItems: "flex-end",
  },
  termsOfSerivceArea: {
    alignSelf: "flex-start",
    flexDirection: "row",
    top: ScaleSize.font_spacing,
    marginVertical: ScaleSize.spacing_small,
    paddingRight: ScaleSize.spacing_small,
    alignItems: "flex-start",
  },
  termsOfSerivceBtnText: {
    fontSize: TextFontSize.small_text,
    fontFamily: AppFonts.semi_bold,
    color: Colors.secondary,
    right: ScaleSize.spacing_medium,
  },
  termsOfSerivceText: {
    fontSize: TextFontSize.small_text,
    fontFamily: AppFonts.semi_bold,
    color: Colors.black,
    right: ScaleSize.spacing_medium,
  },
  signinArea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: ScaleSize.spacing_semi_medium,
  },
  alreadyHaveAccText: {
    color: Colors.black,
    fontSize: TextFontSize.small_text,
    fontFamily: AppFonts.medium,
  },
  signinBtn: {
    padding: ScaleSize.spacing_very_small,
  },
  signinBtnText: {
    color: Colors.secondary,
    fontSize: TextFontSize.small_text,
    fontFamily: AppFonts.bold,
    textTransform: "capitalize",
  },
  signinBtnPrimary: {
    width: "100%",
    marginVertical: -ScaleSize.spacing_very_small,
    marginBottom: -ScaleSize.spacing_small,
  },
  errorTextArea: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    bottom: ScaleSize.spacing_very_small,
    width: "100%",
    paddingLeft: ScaleSize.spacing_medium + 2,
  },
  errorText: {
    fontFamily: AppFonts.medium,
    color: Colors.red,
    alignSelf: "flex-start",
  },

  callIcon: {
    width: ScaleSize.large_icon,
    height: ScaleSize.large_icon,
    left: ScaleSize.spacing_semi_medium,
    resizeMode: "contain",
    tintColor: Colors.primary,
  },
  dropSelectedItemContainer: {
    width: "70%",
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ScaleSize.spacing_semi_medium + 2,
    paddingRight: ScaleSize.spacing_large,
  },
  dropDownSelectedItemText: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: TextFontSize.small_text,
    fontFamily: AppFonts.semi_bold,
    color: Colors.primary,
  },
  dropDownMenuStyle: {
    margin: ScaleSize.spacing_small + 2,
    flex: 1,
  },
  dropDownMenuText: {
    color: "black",
    fontSize: TextFontSize.very_small_text,
    fontFamily: AppFonts.semi_bold,
  },
  dropDownStyle: {
    width: "40%",
    flex: 1,
    justifyContent: "center",
    marginTop: ScaleSize.spacing_semi_medium,
    alignSelf: "flex-start",
    borderRadius: ScaleSize.small_border_radius,
    elevation: 10,
    padding: ScaleSize.spacing_small + 2,
  },
  dropDownIcon: {
    height: ScaleSize.spacing_small + 4,
    tintColor: Colors.primary,
    width: ScaleSize.spacing_small + 4,
    marginLeft: ScaleSize.spacing_very_small,
    resizeMode: "contain",
  },
  dropDownArea: {
    width: "35%",
    height: ScaleSize.spacing_extra_large - 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.textinput_low_opacity,
    borderWidth: ScaleSize.primary_border_width,
    marginRight: ScaleSize.spacing_small,
    marginVertical: ScaleSize.spacing_small,
    paddingHorizontal: ScaleSize.spacing_very_small,
    borderColor: Colors.primary,
    borderRadius: ScaleSize.primary_border_radius,
  },
  cameraIcon: {
    position: "absolute",
    height: ScaleSize.extra_large_icon - 5,
    width: ScaleSize.extra_large_icon - 5,
    right: -ScaleSize.spacing_semi_medium + 10,
    bottom: ScaleSize.spacing_semi_medium + 5,
    zIndex: 1,
  },
  profileImage: {
    height: "100%",
    zIndex: 1,
    borderRadius: ScaleSize.primary_border_radius,
    width: "100%",
  },
  placeholderImage: {
    height: "70%",
    width: "70%",
    top: ScaleSize.spacing_small + 3,
    alignSelf: "center",
    resizeMode: "contain",
  },
  profileImageBtn: {
    height: ScaleSize.spacing_extra_large * 2.1,
    width: ScaleSize.spacing_extra_large * 2.1,
    overflow: "hidden",
    justifyContent: "center",
    borderColor: Colors.primary,
    marginVertical: ScaleSize.spacing_medium,
    borderRadius: ScaleSize.primary_border_radius * 1.5,
  },
  profileImageArea: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
  },
  termsOfSerivceArea: {
    marginVertical: ScaleSize.spacing_medium,
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
    marginVertical: 2,
  },
  termText: {
    fontFamily: AppFonts.bold,
    color: Colors.black,
    top: ScaleSize.spacing_very_small,
    fontSize: TextFontSize.small_text,
  },
});
