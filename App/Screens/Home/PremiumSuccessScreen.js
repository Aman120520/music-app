import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ScaleSize } from "../../Resources/ScaleSize";
import { Colors } from "../../Resources/Colors";
import { Images } from "../../Resources/Images";
import { AppFonts } from "../../Resources/AppFonts";
import { TextFontSize } from "../../Resources/TextFontSize";
import { PrimaryButton } from "../../Components/Comman";
import { Strings } from "../../Resources/Strings";
import LinearGradient from "react-native-linear-gradient";

const PremiumSuccessScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#77c3e1", flex: 1 }}>
      <LinearGradient
        colors={["#77c3e1", "#379bca", "#77c3e1"]}
        style={styles.linearGradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar backgroundColor={"#77c3e1"} barStyle={"light-content"} />
          <View style={styles.cardContainer}>
            <Image
              source={Images.success_invoice_icon}
              style={styles.successIcon}
            />
            <Text style={styles.orderStatusText}>{Strings.success}!</Text>
            <Text
              style={[
                styles.appreciationText,
                {
                  fontSize: TextFontSize.small_text - 1,
                  width: "110%",
                  fontFamily: AppFonts.bold,
                },
              ]}
            >
              {Strings.active_membership_msg}!.
            </Text>
            <Text style={styles.appreciationText}>
              {Strings.premium_appreciation_msg}
            </Text>
            <View style={styles.seprator} />
            <View>
              <View style={styles.footerRaw}>
                <Text style={styles.detailTitleText}>{Strings.amount}:</Text>
                <Text style={styles.detailText}>$49.99</Text>
              </View>
              <View style={styles.footerRaw}>
                <Text style={styles.detailTitleText}>{Strings.duration}:</Text>
                <Text style={styles.detailText}>1 year</Text>
              </View>
              <View style={styles.footerRaw}>
                <Text style={styles.detailTitleText}>
                  {Strings.next_remewal_date}:
                </Text>
                <Text style={styles.detailText}>Tuesday, 21 Oct, 2024</Text>
              </View>
            </View>

            <PrimaryButton
              string={Strings.back_to_home}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "DrawerNavigator" }],
                })
              }
            />
          </View>
          <Text style={styles.tractionIdText}>Traction ID #1658</Text>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PremiumSuccessScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: ScaleSize.spacing_extra_large,
    padding: ScaleSize.spacing_large,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ScaleSize.spacing_semi_large,
    paddingVertical: ScaleSize.spacing_semi_medium - 4,
    borderRadius: ScaleSize.primary_border_radius * 1.4,
  },
  successIcon: {
    height: ScaleSize.medium_image * 1.4,
    width: ScaleSize.medium_image * 1.4,
    marginVertical: ScaleSize.spacing_small * 1.8,
    resizeMode: "contain",
  },
  orderStatusText: {
    color: Colors.black,
    fontFamily: AppFonts.extra_bold,
    fontSize: TextFontSize.large_text,
  },
  appreciationText: {
    textAlign: "center",
    width: "110%",
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.extra_small_text,
    marginVertical: ScaleSize.spacing_small,
  },
  seprator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.light_gray,
    marginVertical: ScaleSize.spacing_medium,
  },
  footerRaw: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginVertical: ScaleSize.spacing_small,
  },
  detailTitleText: {
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.extra_small_text - 1,
    alignSelf: "flex-start",
  },
  detailText: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.extra_small_text - 1,
    alignSelf: "flex-start",
  },
  orderArriveText: {
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.small_text - 1,
    alignSelf: "center",
    width: "110%",
    textAlign: "center",
    marginTop: ScaleSize.spacing_medium,
  },
  tractionIdText: {
    color: Colors.white,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text + 1,
    top: ScaleSize.spacing_large * 1.4,
  },
});
