import {
  Image,
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

const OrderSuccessScreen = ({ navigation, route }) => {
  return (
    <LinearGradient
      colors={["#77c3e1", "#379bca", "#77c3e1"]}
      style={styles.linearGradient}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor={"#77c3e1"} barStyle={"light-content"} />
        <View style={styles.cardContainer}>
          <Image
            source={Images.success_invoice_icon}
            style={styles.successIcon}
          />
          <Text style={styles.orderStatusText}>
            {Strings.order_successful}!
          </Text>
          <Text style={styles.appreciationText}>
            {Strings.purchase_appreciation_msg}
          </Text>
          <View style={styles.seprator} />
          <View>
            <View style={styles.footerRaw}>
              <Text style={styles.detailTitleText}>{Strings.date}:</Text>
              <Text style={styles.detailText}>Tuesday, 21 Oct, 2024</Text>
            </View>
            <View style={styles.footerRaw}>
              <Text style={styles.detailTitleText}>
                {Strings.order_number}:
              </Text>
              <Text style={styles.detailText}>#123456</Text>
            </View>
            <View style={styles.footerRaw}>
              <Text style={styles.detailTitleText}>
                {Strings.item_ordered}:
              </Text>
              <Text style={styles.detailText}>x 1</Text>
            </View>
            <View style={styles.footerRaw}>
              <Text style={styles.detailTitleText}>
                {Strings.total_amount}:
              </Text>
              <Text style={styles.detailText}>$69.99</Text>
            </View>
          </View>
          <Text style={styles.orderArriveText}>
            {Strings.your_order_will_arrive_by} 23 oct 2024
          </Text>
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
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: ScaleSize.spacing_large,
    paddingBottom: ScaleSize.spacing_extra_large,
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
    fontSize: TextFontSize.extra_small_text + 1,
    alignSelf: "flex-start",
  },
  detailText: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.extra_small_text + 1,
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
