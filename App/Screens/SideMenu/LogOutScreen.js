import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { ScaleSize } from "../../Resources/ScaleSize";
import { Colors } from "../../Resources/Colors";
import { AppFonts } from "../../Resources/AppFonts";
import { useDispatch, useSelector } from "react-redux";
import { TextFontSize } from "../../Resources/TextFontSize";
import { Strings } from "../../Resources/Strings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../Actions/authentication";
import Utils from "../../Helpers/Utils";

const LogOutScreen = ({ navigation, route }) => {
  const { userData } = useSelector((state) => state.Authentication);
  const dispatch = useDispatch();

  /////////////// Fuction for Logout ///////////////
  const handleLogout = async () => {
    try {
      const userId = await AsyncStorage.getItem("@id");
      var body = {
        user_id: userId,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          logout(body, async (data, isSuccess) => {
            if (isSuccess === true) {
              handleLogoutSuccess(data, isSuccess);
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutSuccess = async (data, isSuccess) => {
    await AsyncStorage.clear();
    setTimeout(
      () => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "AuthenticationNavigator",
              state: {
                routes: [
                  {
                    name: "SignInScreen",
                  },
                ],
              },
            },
          ],
        });
      },
      Platform.OS === "ios" ? 1000 : 0
    );
  };

  return (
    // <Modal
    //   animationType="fade"
    //   transparent={true}
    //   visible={visible}
    //   onRequestClose={() => {}}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{Strings.logout}</Text>
        <Text style={styles.modalText}>{Strings.logout_alert_message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.cancelBtn,
              {
                borderRadius: ScaleSize.spacing_medium,
                borderColor: Colors.gray,
                borderWidth: ScaleSize.smallest_border_width,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>{Strings.cancel}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            style={[
              styles.multipleDateBtnContainer,
              {
                backgroundColor: Colors.primary,
              },
            ]}
          >
            <Text style={styles.primaryBtnText}>{Strings.logout}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </Modal>
  );
};

export default LogOutScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingHorizontal: ScaleSize.spacing_large,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: ScaleSize.small_border_radius + 5,
    padding: ScaleSize.spacing_medium,
    justifyContent: "center",
    alignItems: "flex-start",
    elevation: 5,
  },
  modalTitle: {
    fontFamily: AppFonts.semi_bold,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: ScaleSize.spacing_very_small - 2,
    fontSize: TextFontSize.small_text + 2,
    textAlign: "center",
  },
  modalText: {
    fontFamily: AppFonts.medium,
    color: Colors.black,
    fontSize: TextFontSize.small_text,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: ScaleSize.spacing_small + 2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancelText: {
    fontFamily: AppFonts.medium,
    color: Colors.gray,
    top: ScaleSize.font_spacing,
    textAlign: "center",
    width: "50%",
    fontSize: TextFontSize.small_text - 3,
  },
  multipleDateBtnContainer: {
    alignSelf: "center",
    borderRadius: ScaleSize.spacing_semi_medium,
    justifyContent: "center",
    height: ScaleSize.spacing_medium * 2,
    alignItems: "center",
    width: "48%",
    borderRadius: 50,
    alignItems: "center",
  },
  cancelBtn: {
    justifyContent: "center",
    height: ScaleSize.spacing_medium * 2,
    fontFamily: AppFonts.medium,
    alignItems: "center",
    width: "48%",
    borderRadius: 50,
  },
  primaryBtnText: {
    fontSize: TextFontSize.small_text - 3,
    fontFamily: AppFonts.medium,
    top: ScaleSize.font_spacing,
    color: Colors.white,
  },
});
