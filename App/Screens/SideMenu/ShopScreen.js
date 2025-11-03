import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import DrawerSceneWrapper from "../../../DrawerSceneWrapper";
import { ScaleSize } from "../../Resources/ScaleSize";
import Header from "../../Components/Comman/Drawer/Header";
import { AppFonts } from "../../Resources/AppFonts";
import { Colors } from "../../Resources/Colors";
import { TextFontSize } from "../../Resources/TextFontSize";
import { FlatList } from "react-native-gesture-handler";
import { Images } from "../../Resources/Images";
import { Strings } from "../../Resources/Strings";

const ShopScreen = ({ navigation, route }) => {
  const { openDrawer } = navigation;

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
    {
      title: "Bundle 2 - The Great Classics + More dasdaddddddas",
      price: 69.99,
      id: 3,
      image: Images.item2,
      orignal: 39.98,
    },
    {
      title: "Bundle 1 - The Great Classics + More dasdaddddddas",
      price: 69.99,
      image: Images.item2,
      id: 4,
    },
    {
      title: "Little Bible Stories Speaker",
      price: 69.99,
      id: 5,
      image: Images.item2,
      orignal: 39.98,
    },
    {
      title: "Bundle 2 - The Great Classics + More dasdaddddddas",
      price: 69.99,
      image: Images.item2,
      id: 6,
    },
    {
      title: "Bundle 1 - The Great Classics + More dasdaddddddas",
      price: 69.99,
      id: 7,
      image: Images.item2,
      orignal: 39.98,
    },
    {
      title: "Little Bible Stories Speaker",
      price: 69.99,
      id: 8,
      image: Images.item2,
      orignal: 39.98,
    },
    {
      title: "Little Bible Stories Speaker",
      price: 69.99,
      id: 9,
      image: Images.item2,
    },
    {
      title: "Bundle 1 - The Great Classics + More dasdaddddddas",
      price: 69.99,
      image: Images.item2,
      id: 10,
      orignal: 39.98,
    },
    {
      title: "Bundle 1 - The Great Classics + More dasdaddddddas",
      price: 69.99,
      image: Images.item2,
      id: 11,
      orignal: 39.98,
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate("HomeNavigator", {
            screen: "ProdutDetailScreen",
          })
        }
      >
        <View style={styles.itemImageContainer}>
          <TouchableOpacity style={styles.cartButton}>
            <Image source={Images.cart_icon} style={styles.cartIcon} />
          </TouchableOpacity>
          <Image style={styles.itemImage} source={item.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.priceTextContainer}>
            <Text style={styles.itemPrice}>${item.price}</Text>
            {item.orignal && (
              <Text style={styles.itemOriginalPrice}>${item.orignal}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <DrawerSceneWrapper>
      <SafeAreaView>
        <ImageBackground style={styles.container} source={Images.bg}>
          <Header
            onLeftButtonPress={() => navigation.goBack()}
            leftIcon={Images.back_icon}
            isProfileShow={false}
            leftIconStyle={{
              height: ScaleSize.large_icon * 1.2,
              width: ScaleSize.large_icon * 1.2,
              resizeMode: "contain",
            }}
            isCartShow={true}
            rightIcon={Images.cart_icon}
            count={1}
          />
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            ListHeaderComponent={() => {
              return (
                <Text style={styles.bibleStoriesTitle}>
                  {Strings.bible_stories_audio}
                </Text>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        </ImageBackground>
      </SafeAreaView>
    </DrawerSceneWrapper>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    paddingHorizontal: ScaleSize.spacing_large,
    paddingTop: ScaleSize.spacing_semi_medium,
  },
  bibleStoriesTitle: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.medium_text - 2,
    alignSelf: "flex-start",
    marginVertical: ScaleSize.spacing_small,
  },
  flatlist: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: ScaleSize.spacing_extra_large * 2,
  },
  itemContainer: {
    width: "47%",
    marginVertical: ScaleSize.spacing_small,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: ScaleSize.primary_border_radius,
  },
  itemImageContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: ScaleSize.medium_image * 2,
    borderRadius: ScaleSize.primary_border_radius,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light_gray,
  },
  itemImage: {
    height: "70%",
    width: "70%",
    objectFit: "cover",
  },
  textContainer: {
    width: "100%",
    flex: 1,
    paddingVertical: ScaleSize.spacing_very_small,
    paddingHorizontal: ScaleSize.font_spacing * 1.4,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    color: Colors.black,
    textAlign: "center",
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.extra_small_text + 1,
  },
  priceTextContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemPrice: {
    color: Colors.black,
    textAlign: "center",
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.extra_small_text + 1,
  },
  itemOriginalPrice: {
    color: Colors.gray,
    marginLeft: ScaleSize.spacing_small,
    textAlign: "center",
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.extra_small_text + 1,
    textDecorationLine: "line-through",
  },
  columnWrapper: {
    justifyContent: "space-between",
    width: "100%",
  },
  cartButton: {
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    paddingVertical: ScaleSize.spacing_small * 1.2,
    paddingHorizontal: ScaleSize.spacing_small * 1.7,
    position: "absolute",
    borderBottomLeftRadius: ScaleSize.primary_border_radius,
    zIndex: 1,
  },
  cartIcon: {
    height: ScaleSize.large_icon * 1.3,
    width: ScaleSize.large_icon * 1.3,
    resizeMode: "contain",
    tintColor: Colors.white,
  },
});
