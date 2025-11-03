import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Colors, ScaleSize, TextFontSize, AppFonts } from "../../Resources";
import { Strings } from "../../Resources/Strings";
import { Images } from "../../Resources/Images";
import { useFocusEffect } from "@react-navigation/native";

const QuizModal = ({ visible, onClose, navigation, route, onStartQuiz }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const data = [
    { value: 10, key: "1" },
    { value: 20, key: "2" },
    { value: 50, key: "3" },
    { value: 100, key: "4" },
  ];

  useFocusEffect(
    React.useCallback(() => {
      setSelectedIndex(0);
    }, [])
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Image source={Images.close_icon} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{Strings.question_limit}</Text>
          <Text style={styles.modalText}>
            {Strings.choose_the_number_of_que}
          </Text>
          <View style={styles.buttonContainer}>
            {data.map(({ value, key }, index) => {
              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.valueBtn,
                    {
                      borderWidth: selectedIndex === index ? 0 : 1,
                      backgroundColor:
                        selectedIndex === index ? Colors.orange : Colors.white,
                    },
                  ]}
                  onPress={() => setSelectedIndex(index)}
                >
                  <Text
                    style={[
                      styles.valueText,
                      {
                        color:
                          selectedIndex === index ? Colors.white : Colors.black,
                      },
                    ]}
                  >
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.PrimaryBtn}
            onPress={() => {
              setTimeout(
                () => {
                  navigation.navigate("HomeNavigator", {
                    screen: "QuizScreen",
                    params: { totalQuestion: data[selectedIndex]?.value },
                  });
                },
                Platform.OS === "ios" ? 1000 : 0
              );
              onStartQuiz();
            }}
          >
            <Text style={styles.PrimaryBtnText}>{Strings.start_quiz}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QuizModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingHorizontal: ScaleSize.spacing_large - 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: ScaleSize.small_border_radius * 2,
    padding: ScaleSize.spacing_medium * 1.5,
    justifyContent: "center",
    alignItems: "flex-start",
    elevation: 5,
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: ScaleSize.spacing_large - 2,
  },
  closeIcon: {
    height: ScaleSize.small_icon - 5,
    width: ScaleSize.small_icon - 5,
    top: ScaleSize.spacing_very_small * 4,
    resizeMode: "contain",
  },
  modalTitle: {
    fontFamily: AppFonts.bold,
    color: Colors.black,
    alignSelf: "flex-start",
    marginBottom: ScaleSize.spacing_very_small - 2,
    fontSize: TextFontSize.large_text + 4,
    textAlign: "center",
  },
  modalText: {
    fontFamily: AppFonts.medium,
    color: Colors.black,
    fontSize: TextFontSize.small_text - 1,
    marginVertical: ScaleSize.spacing_very_small,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginVertical: ScaleSize.spacing_semi_medium,
  },
  valueBtn: {
    borderRadius: ScaleSize.small_border_radius,
    borderColor: Colors.light_gray,
    justifyContent: "center",
    alignItems: "center",
    height: ScaleSize.spacing_large * 1.9,
    width: "22%",
  },
  valueText: {
    textAlign: "center",
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text - 1,
    top: ScaleSize.font_spacing,
  },
  PrimaryBtn: {
    height: ScaleSize.spacing_extra_large - 10,
    width: "100%",
    marginTop: ScaleSize.spacing_semi_medium,
    alignSelf: "center",
    borderRadius: ScaleSize.primary_border_radius - 5,
    justifyContent: "center",
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  PrimaryBtnText: {
    fontFamily: AppFonts.bold,
    color: Colors.white,
    top: Platform.OS === "ios" ? null : ScaleSize.font_spacing,
    fontSize: TextFontSize.small_text,
  },
});
