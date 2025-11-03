import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { ScaleSize } from "../../Resources/ScaleSize";
import CommonHeader from "../../Components/Comman/CommonHeader";
import { Images } from "../../Resources/Images";
import { TextFontSize } from "../../Resources/TextFontSize";
import { AppFonts } from "../../Resources/AppFonts";
import { Colors } from "../../Resources/Colors";
import { PrimaryButton } from "../../Components/Comman";
import { Strings } from "../../Resources/Strings";

const MyCartScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(1);
  const data = [
    {
      title: "Little Bible Stories Speaker",
      price: 69.99,
      image: Images.item2,
      id: 1,
    },
    {
      title: "Bundle 1 - The Great Classics + More dasdaddddddas",
      price: 29.98,
      id: 2,
      image: Images.item2,
      orignal: 39.98,
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemImageContainer}>
          <Image style={styles.itemImage} source={item.image} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.itemHeaderTextContainer}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.title}
            </Text>
            <TouchableOpacity style={styles.deleteBtn}>
              <Image source={Images.delete_icon} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.priceTextContainer}>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <View style={styles.quantityButtonContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => {
                  setCount((prevCount) => (prevCount < 2 ? 1 : prevCount - 1));
                }}
              >
                <Image
                  source={Images.remove_icon}
                  style={styles.quantityChangeIcon}
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{count}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setCount(count + 1)}
              >
                <Image
                  source={Images.add_icon}
                  style={styles.quantityChangeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: ScaleSize.spacing_large,
        }}
      >
        <CommonHeader
          leftIcon={Images.back_icon}
          onLeftButtonPress={() => navigation.goBack()}
          title={"My cart"}
        />
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footerRaw}>
          <Text style={styles.detailTitleText}>{Strings.sub_total} x 1</Text>
          <Text style={styles.detailText}>$69.99</Text>
        </View>
        <View style={styles.footerRaw}>
          <Text style={styles.detailTitleText}>{Strings.coupon}</Text>
          <Text style={styles.detailText}>-$00.00</Text>
        </View>
        <View style={styles.footerRaw}>
          <Text style={styles.detailTitleText}>{Strings.delivery_charge}</Text>
          <Text style={styles.detailText}>Free</Text>
        </View>
        <View style={styles.seprator} />
        <View style={styles.footerRaw}>
          <Text style={styles.detailTitleText}>{Strings.total}</Text>
          <Text style={styles.TotalPriceText}>$69.00</Text>
        </View>
        <PrimaryButton
          string={"Checkout"}
          isOrange={true}
          onPress={() => {
            navigation.navigate("OrderSuccessScreen");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  footerContainer: {
    paddingHorizontal: ScaleSize.spacing_large,
    paddingVertical: ScaleSize.spacing_medium,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    borderTopLeftRadius: ScaleSize.primary_border_radius * 2,
    borderTopRightRadius: ScaleSize.primary_border_radius * 2,
    width: "100%",
    backgroundColor: Colors.textinput_bg,
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
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text,
    alignSelf: "flex-start",
  },
  detailText: {
    color: Colors.gray,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text,
    alignSelf: "flex-start",
  },
  TotalPriceText: {
    color: Colors.gray,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text + 3,
    alignSelf: "flex-start",
  },
  seprator: {
    width: "100%",
    height: 2,
    backgroundColor: Colors.gray,
    marginVertical: ScaleSize.spacing_semi_medium,
  },
  flatlist: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: ScaleSize.spacing_extra_large * 5.1,
  },
  itemContainer: {
    width: "100%",
    marginVertical: ScaleSize.spacing_small,
    backgroundColor: Colors.textinput_bg,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: ScaleSize.spacing_small * 1.5,
    borderRadius: ScaleSize.primary_border_radius,
  },
  itemImageContainer: {
    height: ScaleSize.large_icon * 3.5,
    width: ScaleSize.large_icon * 3.5,
    borderRadius: ScaleSize.primary_border_radius,
    marginRight: ScaleSize.spacing_small,
    flex: 0.35,
  },
  itemImage: {
    height: "100%",
    borderRadius: ScaleSize.primary_border_radius - 5,
    width: "100%",
    resizeMode: "contain",
  },
  textContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
  },
  itemName: {
    color: Colors.black,
    textAlign: "start",
    width: "80%",
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.small_text - 1,
  },
  priceTextContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ScaleSize.spacing_very_small,
  },
  itemPrice: {
    color: Colors.black,
    textAlign: "start",
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text,
  },
  itemHeaderTextContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  deleteBtn: {
    padding: ScaleSize.spacing_small,
    justifyContent: "center",
    alignItems: "center",
    left: ScaleSize.spacing_very_small,
  },
  deleteIcon: {
    height: ScaleSize.small_icon * 1.2,
    width: ScaleSize.small_icon * 1.2,
    resizeMode: "contain",
  },
  quantityButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  quantityButton: {
    height: ScaleSize.large_icon * 1.3,
    width: ScaleSize.large_icon * 1.3,
  },
  quantityChangeIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  quantityText: {
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.small_text + 1,
    marginHorizontal: ScaleSize.spacing_semi_medium,
  },
});
