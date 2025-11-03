import {
  Image,
  StyleSheet,
  StatusBar,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  Colors,
  ScaleSize,
  TextFontSize,
  Images,
  AppFonts,
} from "../../Resources";
import {
  PrimaryButton,
  ModalProgressLoader,
  Textinput,
} from "../../Components/Comman";
import Utils from "../../Helpers/Utils";
import { ForgotPassword } from "../../Actions/authentication";
import "../../Resources/Languages/index";
import AlertBox from "../../Components/Comman/AlertBox";
import { Strings } from "../../Resources/Strings";
import { useDispatch } from "react-redux";

const ForgotPasswordScreen = ({ navigation, route }) => {
  ///////////////// States /////////////////
  const [email, setEmail] = useState("");
  const [loaderVisible, setLoaderVisible] = useState(false);
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  ///////////////// Error States /////////////////
  const [emailError, setEmailError] = useState("");

  ///////////////// Refs /////////////////
  const emailRef = useRef(null);

  ///////////////// Function for Validation /////////////////
  const valid = async () => {
    var isValid = true;

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

    var body = {
      email: email,
    };
    if (isValid) {
      if (await Utils.isNetworkConnected()) {
        setLoaderVisible(true);
        dispatch(
          ForgotPassword(body, async (data, isSuccess) => {
            setLoaderVisible(false);
            if (isSuccess === true) {
              setSuccessMessage(data.message);
              setSuccessVisible(true);
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
    <SafeAreaView
      style={{
        container: {
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <ImageBackground source={Images.bg} style={styles.container}>
        <StatusBar
          backgroundColor={Colors.statusbar}
          barStyle={"dark-content"}
        />
        <ModalProgressLoader visible={loaderVisible} />
        <View>
          <View style={styles.backBtnArea}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={styles.backBtnIcon} source={Images.back_icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.headerTextArea}>
            <Text style={styles.passwordResetText}>
              {Strings.forgot_password_header}
            </Text>
            <Text style={styles.descriptionText}>
              {Strings.forgot_password_description}
            </Text>
          </View>

          <View style={[styles.textInputContainer]}>
            <Textinput
              placeholder={Strings.forgot_password_email_placeholder}
              placeholderTextColor={Colors.black}
              source={Images.email_icon}
              refs={emailRef}
              value={email}
              keyboardType="email-address"
              error={emailError}
              returnKeyType={"done"}
              onChangeText={(text) => {
                setEmail(text.trim());
                setEmailError(false);
              }}
              onSubmitEditing={valid}
            />
          </View>
        </View>

        <View style={styles.button}>
          <PrimaryButton string={Strings.send_reset_link} onPress={valid} />
        </View>
        <AlertBox
          visible={alertVisible}
          title="Alert"
          error={true}
          message={alertMessage}
          positiveBtnText="OK"
          onPress={() => setAlertVisible(false)}
        />
        <AlertBox
          visible={successVisible}
          title="Success"
          message={successMessage}
          positiveBtnText="OK"
          onPress={() => {
            setSuccessVisible(false);
            navigation.goBack();
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    paddingHorizontal: ScaleSize.spacing_semi_medium,
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtnArea: {
    width: "100%",
    alignItems: "flex-start",
  },
  backBtnIcon: {
    height: ScaleSize.medium_icon,
    width: ScaleSize.medium_icon,
    left: ScaleSize.spacing_very_small,
    resizeMode: "contain",
    tintColor: Colors.black,
    marginTop: ScaleSize.spacing_medium,
    paddingHorizontal: ScaleSize.spacing_medium,
  },
  headerTextArea: {
    width: "100%",
    paddingLeft: ScaleSize.spacing_semi_medium,
    marginTop: ScaleSize.spacing_small,
  },
  passwordResetText: {
    marginTop: ScaleSize.spacing_small,
    fontFamily: AppFonts.extra_bold,
    fontSize: TextFontSize.very_large_text + 2,
    color: Colors.black,
  },
  descriptionText: {
    marginTop: ScaleSize.spacing_very_small,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text - 1,
    color: Colors.black,
  },
  textInputContainer: {
    bottom: ScaleSize.spacing_small * 1.3,
    width: "100%",
    paddingHorizontal: ScaleSize.spacing_semi_medium,
    alignItems: "center",
  },
  button: {
    bottom: ScaleSize.spacing_semi_medium,
    width: "100%",
    paddingHorizontal: ScaleSize.spacing_medium,
  },
});
