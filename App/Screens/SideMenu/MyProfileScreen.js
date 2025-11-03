import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DrawerSceneWrapper from "../../Components/Comman/DrawerSceneWrapper";
import { Images } from "../../Resources/Images";
import { ScaleSize } from "../../Resources/ScaleSize";
import Header from "../../Components/Comman/Drawer/Header";
import { AppFonts } from "../../Resources/AppFonts";
import { Colors } from "../../Resources/Colors";
import { TextFontSize } from "../../Resources/TextFontSize";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import {
  ImagePickerDilouge,
  ModalProgressLoader,
  Textinput,
} from "../../Components/Comman";
import { Strings } from "../../Resources/Strings";
import AlertBox from "../../Components/Comman/AlertBox";
import Utils from "../../Helpers/Utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  changePassword,
  editProfile,
  userDetails,
} from "../../Actions/authentication";
import { sha512 } from "js-sha512";

const MyProfileScreen = ({ navigation, route }) => {
  const { openDrawer } = navigation;

  ///////////////// States /////////////////
  const { isLoading, userData } = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(userData?.email);
  const [fullName, setFullName] = useState(userData?.full_name);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [images, setImages] = useState(userData?.profile_picture_thumb || null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  ///////////////// Refs /////////////////
  const emailRef = useRef(null);
  const fullNameRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const imageRef = useRef(null);
  const scrollViewRef = useRef(null);

  ///////////////// Error States /////////////////
  const [emailError, setEmailError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
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
        setIsImageChanged(true);
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
            setIsImageChanged(true);
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

  useFocusEffect(
    React.useCallback(() => {
      getUser();
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsImageChanged(false);
      setEmailError("");
      setFullNameError("");
      setCurrentPasswordError("");
      setNewPasswordError("");
      setConfirmPasswordError("");
      setImageError("");
    }, [])
  );

  const getUser = async () => {
    try {
      const UserId = await AsyncStorage.getItem("@id");
      var body = {
        user_id: UserId,
      };
      dispatch(
        userDetails(body, async (data, isSuccess) => {
          if (isSuccess === true) {
            setFullName(data?.data?.full_name);
            setEmail(data?.data?.email);
            setImages(data?.data?.profile_picture_thumb);
          }
        })
      );
    } catch (Err) {}
  };

  ///////////// Function for Validation /////////=/////
  const handleSubmitPassword = async () => {
    var isValid = true;

    try {
      const UserId = await AsyncStorage.getItem("@id");
      const currentUserId = JSON.parse(UserId);

      if (Utils.isNull(currentPassword)) {
        isValid = false;
        currentPasswordRef.current.focus();
        setCurrentPasswordError(Strings.blank_field_error);
      } else if (!Utils.isPasswordValid(currentPassword)) {
        isValid = false;
        currentPasswordRef.current.focus();
        setCurrentPasswordError(Strings.invalid_password);
      } else {
        setCurrentPasswordError(null);
      }

      if (Utils.isNull(newPassword)) {
        isValid = false;
        newPasswordRef.current.focus();
        setNewPasswordError(Strings.blank_field_error);
      } else if (!Utils.isPasswordValid(newPassword)) {
        isValid = false;
        newPasswordRef.current.focus();
        setNewPasswordError(Strings.invalid_password);
      } else if (currentPassword === newPassword) {
        isValid = false;
        newPasswordRef.current.focus();
        setNewPasswordError(Strings.unique_password_alert);
      } else {
        setNewPasswordError(null);
      }

      if (Utils.isNull(confirmPassword)) {
        isValid = false;
        confirmPasswordRef.current.focus();
        setConfirmPasswordError(Strings.blank_field_error);
      } else if (!Utils.isPasswordValid(confirmPassword)) {
        isValid = false;
        confirmPasswordRef.current.focus();
        setConfirmPasswordError(Strings.invalid_password);
      } else if (newPassword !== confirmPassword) {
        isValid = false;
        confirmPasswordRef.current.focus();
        setConfirmPasswordError(Strings.same_confirm_password);
      } else {
        setConfirmPasswordError(null);
      }

      if (
        Utils.isNull(currentPassword) &&
        Utils.isNull(newPassword) &&
        Utils.isNull(confirmPassword)
      ) {
        currentPasswordRef.current?.focus();
      }
      var body = {
        password: sha512(currentPassword),
        new_password: sha512(newPassword),
        user_id: currentUserId,
      };

      if (isValid) {
        if (await Utils.isNetworkConnected()) {
          dispatch(
            changePassword(body, async (data, isSuccess) => {
              if (isSuccess === true) {
              }
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////// Function for validation //////////////////
  const handleUpdateProfile = async () => {
    var isValid = true;

    if (Utils.isNull(fullName)) {
      isValid = false;
      setFullNameError(Strings.blank_field_error);
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
    } else {
      setEmailError(null);
    }

    try {
      let body = new FormData();
      const UserId = await AsyncStorage.getItem("@id");
      body.append("user_id", UserId);
      body.append("full_name", fullName);
      body.append("email", email);
      if (userData?.current_image !== null) {
        body.append("current_image", userData?.current_image);
      }
      if (isImageChanged) {
        body.append("profile_picture", {
          uri: images.path,
          type: "image/jpg",
          name: images.path.replace(/^.*[\\/]/, ""),
          filename: images.path.replace(/^.*[\\/]/, ""),
        });
      }

      if (isValid) {
        if (await Utils.isNetworkConnected()) {
          dispatch(
            editProfile(body, async (data, isSuccess) => {
              if (isSuccess === true) {
                const UserId = await AsyncStorage.getItem("@id");
                var body = {
                  user_id: UserId,
                };
                dispatch(
                  userDetails(body, async (data, isSuccess) => {
                    if (isSuccess === true) {
                    }
                  })
                );
              }
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerSceneWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View>
            <ScrollView
              contentContainerStyle={styles.contentContainerStyle}
              showsVerticalScrollIndicator={false}
              ref={scrollViewRef}
            >
              <StatusBar
                backgroundColor={Colors.statusbar}
                barStyle={"dark-content"}
              />
              <ImageBackground source={Images.bg} style={styles.container}>
                <ModalProgressLoader visible={isLoading} />
                <Header
                  title={"My Profile"}
                  onLeftButtonPress={openDrawer}
                  leftIcon={Images.menu_icon}
                />
                <View style={styles.textInputArea}>
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
                          {images !== null ? (
                            isImageChanged ? (
                              <Image
                                style={styles.profileImage}
                                source={{ uri: images?.path }}
                              />
                            ) : (
                              <Image
                                style={styles.profileImage}
                                source={{ uri: userData?.profile_picture }}
                              />
                            )
                          ) : (
                            <Image
                              style={styles.placeholderImage}
                              source={Images.doll_placeholder_logo}
                            />
                          )}
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.usernameText}>
                      {userData?.full_name}
                    </Text>
                    <Text style={styles.emailText}>{userData?.email}</Text>
                  </View>
                  {/* {imageError ? (
                  <View style={styles.errorTextArea}>
                    <Text style={styles.errorText}>{imageError}</Text>
                  </View>
                ) : null} */}

                  {userData?.is_subscribed === 0 && (
                    <View style={styles.upgradePremiumTab}>
                      <View style={{ width: "20%" }}>
                        <Image
                          style={styles.premiumIcon}
                          source={Images.premium_icon}
                        />
                      </View>
                      <View style={styles.premiumTextContainer}>
                        <Text style={styles.upgradePremiumText}>
                          {Strings.upgrade_premium}
                        </Text>
                        <Text style={styles.exclusiveText}>
                          {Strings.exclusive_early_adfree}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.purchaseBtn}
                        onPress={() => {
                          navigation.navigate("HomeNavigator", {
                            screen: "UnlockPremiumScreen",
                          });
                        }}
                      >
                        <Text style={styles.purchaseBtnText}>
                          {Strings.purchase}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <Text style={styles.titleText}>{Strings.edit_profile}</Text>
                  <Textinput
                    placeholder={Strings.placeholder_fullname}
                    placeholderTextColor={Colors.black}
                    refs={fullNameRef}
                    autoCapitalize="none"
                    value={fullName}
                    error={fullNameError}
                    title={Strings.full_name}
                    returnKeyType={"next"}
                    keyboardType="email-address"
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
                  />

                  <TouchableOpacity
                    style={styles.outlineBtn}
                    onPress={handleUpdateProfile}
                  >
                    <Text style={styles.outlineBtnText}>
                      {Strings.save_changes}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.titleText}>
                    {Strings.change_password}
                  </Text>
                  <Textinput
                    placeholder={Strings.placeholder_current_password}
                    placeholderTextColor={Colors.black}
                    value={currentPassword}
                    autoCapitalize="none"
                    error={currentPasswordError}
                    onChangeText={(text) => {
                      setCurrentPassword(text.trim());
                      setCurrentPasswordError(false);
                    }}
                    title={Strings.current_password}
                    refs={currentPasswordRef}
                    returnKeyType={"next"}
                    secureTextEntry={true}
                    keyboardType="default"
                    onSubmitEditing={() => {
                      newPasswordRef.current.focus();
                    }}
                  />
                  <Textinput
                    placeholder={Strings.placeholder_new_password}
                    placeholderTextColor={Colors.black}
                    value={newPassword}
                    autoCapitalize="none"
                    error={newPasswordError}
                    onChangeText={(text) => {
                      setNewPassword(text.trim());
                      setNewPasswordError(false);
                    }}
                    title={Strings.new_password}
                    refs={newPasswordRef}
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
                    returnKeyType={"next"}
                    secureTextEntry={true}
                    keyboardType="default"
                  />

                  <TouchableOpacity
                    style={styles.outlineBtn}
                    onPress={handleSubmitPassword}
                  >
                    <Text style={styles.outlineBtnText}>
                      {Strings.update_password}
                    </Text>
                  </TouchableOpacity>
                </View>
                <ImagePickerDilouge
                  popupOpen={popupOpen}
                  handlePopup={() => setPopupOpen(false)}
                  handleTakePicture={handleTakePicture}
                  handleChooseFromGallery={handleChooseFromGallery}
                />
                <View style={styles.footerContainer}>
                  <TouchableOpacity
                    style={styles.addToCartBtn}
                    onPress={openDrawer}
                  >
                    <Text style={styles.addToCartBtnText}>
                      {Strings.cancel}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buyNowBtn}
                    onPress={() => {
                      handleUpdateProfile();
                    }}
                    // onPress={() => navigation.navigate("HomeScreen")}
                  >
                    <Text style={styles.buyNowBtnText}>
                      {Strings.save_changes}
                    </Text>
                  </TouchableOpacity>
                </View>
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
    </DrawerSceneWrapper>
  );
};

export default MyProfileScreen;

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
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: ScaleSize.spacing_large,
    alignItems: "center",
    paddingVertical: ScaleSize.spacing_semi_medium,
  },
  // container: {
  //   flexGrow: 1,
  //   alignItems: "center",
  //   backgroundColor: Colors.white,
  //   paddingHorizontal: ScaleSize.spacing_large,
  // },
  textInputArea: {
    flex: 1,
    width: "100%",
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
    alignItems: "center",
  },
  usernameText: {
    color: Colors.black,
    textTransform: "capitalize",
    fontFamily: AppFonts.extra_bold,
    fontSize: TextFontSize.large_text + 2,
  },
  emailText: {
    color: Colors.black,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text - 2,
    bottom: ScaleSize.spacing_small,
  },
  upgradePremiumTab: {
    backgroundColor: "#fff2b7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: ScaleSize.spacing_semi_medium - 4,
    borderRadius: ScaleSize.small_border_radius,
    marginVertical: ScaleSize.spacing_medium,
  },
  premiumIcon: {
    height: ScaleSize.large_icon * 2,
    width: ScaleSize.large_icon * 2,
    resizeMode: "contain",
  },
  premiumTextContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "50%",
    right: ScaleSize.spacing_small,
  },
  upgradePremiumText: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text - 2,
  },
  exclusiveText: {
    color: Colors.black,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.extra_small_text - 1,
  },
  purchaseBtn: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: ScaleSize.spacing_semi_medium,
    paddingHorizontal: ScaleSize.spacing_small * 3,
    borderRadius: ScaleSize.small_border_radius - 5,
  },
  purchaseBtnText: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.extra_small_text - 2,
  },
  outlineBtn: {
    height: ScaleSize.spacing_extra_large,
    width: "100%",
    marginVertical: ScaleSize.spacing_medium,
    alignSelf: "center",
    backgroundColor: Colors.white,
    padding: ScaleSize.spacing_medium,
    borderRadius: ScaleSize.primary_border_radius,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  outlineBtnText: {
    fontFamily: AppFonts.bold,
    color: Colors.primary,
    fontSize: TextFontSize.small_text + 1,
  },
  titleText: {
    fontFamily: AppFonts.bold,
    color: Colors.black,
    fontSize: TextFontSize.small_text + 1,
    alignSelf: "flex-start",
    marginBottom: ScaleSize.spacing_small,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ScaleSize.spacing_small,
    marginBottom: ScaleSize.spacing_large * 1.3,
    width: "100%",
  },
  addToCartBtn: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light_gray,
    paddingVertical: ScaleSize.spacing_semi_medium,
    borderRadius: ScaleSize.small_border_radius - 5,
  },
  addToCartBtnText: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text,
  },
  buyNowBtn: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingVertical: ScaleSize.spacing_semi_medium,
    borderRadius: ScaleSize.small_border_radius - 5,
  },
  buyNowBtnText: {
    color: Colors.white,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text,
  },
});
