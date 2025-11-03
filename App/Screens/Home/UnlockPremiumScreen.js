import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScaleSize } from "../../Resources/ScaleSize";
import { Colors } from "../../Resources/Colors";
import { Images } from "../../Resources/Images";
import { AppFonts } from "../../Resources/AppFonts";
import { TextFontSize } from "../../Resources/TextFontSize";
import { PrimaryButton } from "../../Components/Comman";
import { Strings } from "../../Resources/Strings";

const OrderSuccessScreen = ({ navigation, route }) => {
  const [selectedButton, setSelectedButton] = useState(2);
  const buttonData = [
    { id: 1, title: "Monthly Membership", price: "$4.99" },
    { id: 2, title: "Yearly Membership", price: "$49.99" },
  ];
  const handleButtonPress = (id) => {
    setSelectedButton(id);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.safeAreaBg }}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground style={styles.container} source={Images.bg}>
          <StatusBar
            backgroundColor={Colors.statusbar}
            barStyle={"dark-content"}
          />
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.goBack()}
          >
            <Image source={Images.close_icon} style={styles.closeIcon} />
          </TouchableOpacity>
          <Image source={Images.premium_icon} style={styles.premiumIcon} />
          <Text style={styles.headerTitleText}>
            {Strings.unlock_premium_features}
          </Text>
          <View
            style={{
              width: "100%",
              marginVertical: ScaleSize.spacing_small + 2,
            }}
          >
            <View style={styles.footerRaw}>
              <Image style={styles.checkiIcon} source={Images.check_ic} />
              <Text style={styles.detailText}>
                {Strings.enhance_your_experience}
              </Text>
            </View>
            <View style={styles.footerRaw}>
              <Image style={styles.checkiIcon} source={Images.check_ic} />
              <Text style={styles.detailText}>
                {Strings.ad_free_experience}
              </Text>
            </View>
            <View style={styles.footerRaw}>
              <Image style={styles.checkiIcon} source={Images.check_ic} />
              <Text style={styles.detailText}>{Strings.early_access}</Text>
            </View>
            <View style={styles.footerRaw}>
              <Image style={styles.checkiIcon} source={Images.check_ic} />
              <Text style={styles.detailText}>
                {Strings.personalized_learning}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {buttonData.map((item) => {
              const isSelected = selectedButton === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.itemButton,
                    {
                      borderColor: isSelected ? Colors.orange : Colors.primary,
                    },
                  ]}
                  onPress={() => handleButtonPress(item.id)}
                >
                  {item.id === 2 && (
                    <View style={styles.discountBatch}>
                      <Text style={styles.discountText}>
                        {Strings.save} 20%
                      </Text>
                    </View>
                  )}
                  <Text style={styles.itemTitleText}>{item.title}</Text>
                  <Text style={styles.itemPriceText}>{item.price}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <PrimaryButton
            isOrange={true}
            string={"Purchase Now"}
            onPress={() => navigation.navigate("PremiumSuccessScreen")}
          />
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: ScaleSize.spacing_large,
  },
  closeBtn: {
    position: "absolute",
    right: ScaleSize.spacing_large,
    top: ScaleSize.spacing_large,
    paddingLeft: ScaleSize.spacing_extra_large,
    paddingBottom: ScaleSize.spacing_extra_large,
  },
  closeIcon: {
    height: ScaleSize.large_icon,
    width: ScaleSize.large_icon,
    resizeMode: "contain",
  },
  premiumIcon: {
    height: ScaleSize.large_image,
    width: ScaleSize.medium_image * 1.3,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  headerTitleText: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.extra_large_text,
  },
  footerRaw: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    width: "100%",
    marginVertical: ScaleSize.spacing_small,
  },
  checkiIcon: {
    height: ScaleSize.large_icon * 1.25,
    width: ScaleSize.large_icon * 1.25,
    marginRight: ScaleSize.spacing_small * 1.3,
  },
  detailText: {
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.medium_text - 2,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    width: "100%",
  },
  itemButton: {
    width: "100%",
    borderWidth: 1.5,
    marginVertical: ScaleSize.spacing_semi_medium - 1,
    paddingVertical: ScaleSize.spacing_semi_medium,
    paddingHorizontal: ScaleSize.spacing_large,
    borderRadius: ScaleSize.primary_border_radius,
  },
  itemTitleText: {
    color: Colors.black,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text,
    alignSelf: "flex-start",
  },
  itemPriceText: {
    color: Colors.black,
    fontSize: TextFontSize.large_text + 2,
    fontFamily: AppFonts.bold,
  },
  discountBatch: {
    backgroundColor: Colors.orange,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingVertical: ScaleSize.spacing_very_small * 1.8,
    paddingHorizontal: ScaleSize.spacing_semi_medium * 1.5,
    borderRadius: ScaleSize.very_small_border_radius,
    right: ScaleSize.spacing_large - 4,
    top: -ScaleSize.spacing_medium,
  },
  discountText: {
    color: Colors.white,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.small_text - 4,
  },
});
