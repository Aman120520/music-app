import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { ScaleSize } from "../../Resources/ScaleSize";
import CommonHeader from "../../Components/Comman/CommonHeader";
import { Images } from "../../Resources/Images";
import { Colors } from "../../Resources/Colors";
import { AppFonts } from "../../Resources/AppFonts";
import { TextFontSize } from "../../Resources/TextFontSize";
import { Strings } from "../../Resources/Strings";
import VideoPlayer from "react-native-video-player";
import Utils from "../../Helpers/Utils";

const ProdutDetailScreen = ({ navigation, route }) => {
  const [count, setCount] = useState(1);
  const [displayImage, setDisplayImage] = useState(Images.product1);
  const background = require("../../assets/speakerTutorial.mp4");

  const productData = [
    { id: 1, image: Images.product1 },
    { id: 2, image: Images.product2 },
    { id: 3, image: Images.product3 },
  ];

  const [selectedProduct, setSelectedProduct] = useState(1);

  const [showPlayButton, setShowPlayButton] = useState(true);

  const videoPlayerRef = useRef(null);

  const handlePlayPress = () => {
    if (Utils.isNetworkConnected()) {
      setShowPlayButton(false);
    } else {
      Alert.alert("Please check your internet conncection");
    }
  };

  const handleButtonPress = ({ item }) => {
    setSelectedProduct(item.id);
    setDisplayImage(item.image);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"} />
        <CommonHeader
          leftIcon={Images.back_icon}
          onLeftButtonPress={() => navigation.goBack()}
        />
        <Image style={styles.productMainImage} source={displayImage} />
        <ScrollView
          horizontal
          style={styles.differentPreviewContainer}
          showsHorizontalScrollIndicator={false}
        >
          {productData.map((item, index) => {
            const isSelected = selectedProduct === item.id;
            return (
              <TouchableOpacity
                style={[
                  styles.previewImgButton,
                  {
                    borderWidth: isSelected ? 2 : 0,
                    borderColor: Colors.primary,
                  },
                ]}
                onPress={() => handleButtonPress({ item })}
              >
                <Image source={item.image} style={styles.diffrentImage} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text style={styles.productName}>Little Bible Stories Speaker</Text>
        <Text style={styles.productPrice}>$69.99</Text>
        <Text style={styles.productDescription}>
          {Strings.get_it_between}{" "}
          <Text style={styles.productBoldDescription}>
            Saturday, October 12th{" "}
          </Text>
          and
        </Text>
        <Text style={styles.productBoldDescription}>
          Wednesday, October 16th
        </Text>
        <Text style={styles.quantityTitle}>{Strings.quantity}</Text>
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
            <Image source={Images.add_icon} style={styles.quantityChangeIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.shippingDetailsContanier}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <Text style={styles.productDescription}>
              {Strings.delivery_to}:{" "}
              <Text style={styles.productBoldDescription}> Smith</Text>
            </Text>
            <View style={styles.homebatch}>
              <Text style={styles.homebatchText}>{Strings.home}</Text>
            </View>
          </View>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressText}>
              3986 Green Hill Road Salus, AR 72854
            </Text>
            <TouchableOpacity style={styles.changeBtn}>
              <Text style={styles.changeBtnText}>{Strings.change}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productDetailsContanier}>
          <Text style={styles.quantityTitle}>{Strings.product_details}</Text>
          <Text style={styles.productDetailDescription}>
            The little bible stories Speaker brings over 30 classic Bible tales
            to life for children ages 3-10. With the press of button, kids can
            listen to beloved stories like Noah's Ark,{" "}
            <Text style={styles.productDetailDescription}>more...</Text>
          </Text>
          <View style={styles.videoContainer}>
            {showPlayButton ? (
              <ImageBackground source={Images.demoBg} style={styles.thumbnail}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayPress}
                >
                  <ImageBackground
                    blurRadius={30}
                    source={Images.demoBg}
                    style={styles.blurLayer}
                  >
                    <Image source={Images.overlay} style={styles.overlay} />
                    <Image source={Images.play_icon} style={styles.playIcon} />
                  </ImageBackground>
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <VideoPlayer
                ref={videoPlayerRef}
                source={background}
                thumbnail={Images.demoBg}
                autoplay={true}
                resizeMode="contain"
                showDuration={true}
                onEnd={() => setShowPlayButton(true)}
                customStyles={{
                  controls: styles.controls,
                  seekBarFullWidth: styles.seekBarFullWidth,
                  seekBarBackground: styles.seekBarBackground,
                  seekBarProgress: styles.seekBarProgress,
                  seekBarKnob: styles.seekBarKnob,
                  playButton: {
                    backgroundColor: "transparent",
                    zIndex: 10,
                  },
                  playArrow: {
                    tintColor: "transparent",
                  },
                }}
                style={styles.backgroundVideo}
              />
            )}
          </View>
          {/* <View style={styles.videoContainer}>
            <VideoPlayer
              ref={playerRef}
              source={background}
              thumbnail={Images.demoBg}
              autoplay={false}
              controls={true}
              resizeMode="contain"
              showDuration={true}
              // customStyles={{
              //   controls: styles.controls,
              //   seekBarFullWidth: styles.seekBarFullWidth,
              //   playButton: {
              //     backgroundColor: "transparent",
              //   },
              //   playArrow: {
              //     tintColor: "transparent",
              //   },
              // }}
              style={styles.backgroundVideo}
            />
            {paused && (
              <TouchableOpacity
                style={styles.playButton}
                onPress={onPlayPausePress}
              >
                <ImageBackground
                  blurRadius={30}
                  source={Images.demoBg}
                  style={styles.blurLayer}
                >
                  <Image source={Images.overlay} style={styles.overlay} />
                  <Image source={Images.play_icon} style={styles.playIcon} />
                </ImageBackground>
              </TouchableOpacity>
            )}
          </View> */}
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.addToCartBtn}>
              <Text style={styles.addToCartBtnText}>{Strings.add_to_cart}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyNowBtn}
              onPress={() => navigation.navigate("MyCartScreen")}
            >
              <Text style={styles.buyNowBtnText}>{Strings.buy_now}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProdutDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: ScaleSize.spacing_large,
    paddingBottom: ScaleSize.spacing_large,
  },
  productMainImage: {
    height: ScaleSize.large_image * 1.8,
    width: ScaleSize.large_image * 1.8,
    resizeMode: "contain",
  },
  differentPreviewContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: ScaleSize.spacing_medium * 1.4,
    marginBottom: ScaleSize.spacing_small,
  },
  previewImgButton: {
    height: ScaleSize.large_icon * 3.6,
    width: ScaleSize.large_icon * 3.6,
    borderRadius: ScaleSize.small_border_radius,
    overflow: "hidden",
    marginRight: ScaleSize.spacing_small,
  },
  diffrentImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  productName: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.medium_text - 2,
    alignSelf: "flex-start",
    marginTop: ScaleSize.spacing_small * 1.2,
  },
  productPrice: {
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.medium_text - 1,
    alignSelf: "flex-start",
    marginTop: ScaleSize.spacing_small,
  },
  productDescription: {
    color: Colors.black,
    fontFamily: AppFonts.regular,
    justifyContent: "center",
    fontSize: TextFontSize.small_text - 2,
    top: ScaleSize.spacing_very_small,
    alignSelf: "flex-start",
  },
  productBoldDescription: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text - 1,
    alignSelf: "flex-start",
  },
  quantityTitle: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text,
    alignSelf: "flex-start",
    marginTop: ScaleSize.spacing_very_small,
  },
  quantityButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingVertical: ScaleSize.spacing_medium,
    borderBottomWidth: 1,
    borderColor: Colors.light_gray,
  },
  quantityButton: {
    height: ScaleSize.large_icon * 1.8,
    width: ScaleSize.large_icon * 1.8,
  },
  quantityChangeIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  quantityText: {
    color: Colors.black,
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text,
    marginHorizontal: ScaleSize.spacing_small * 2,
  },
  homebatch: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: ScaleSize.spacing_small,
    marginTop: ScaleSize.spacing_very_small - 2,
    backgroundColor: Colors.light_gray,
    paddingVertical: 2,
    paddingHorizontal: ScaleSize.spacing_small,
    borderRadius: ScaleSize.small_border_radius - 10,
  },
  homebatchText: {
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.small_text - 5,
  },
  addressTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    width: "100%",
    marginTop: ScaleSize.spacing_very_small - 2,
  },
  addressText: {
    color: Colors.gray,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text - 3,
  },
  changeBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: ScaleSize.spacing_small,
    backgroundColor: Colors.primary,
    paddingVertical: 2,
    paddingHorizontal: ScaleSize.spacing_small,
    borderRadius: ScaleSize.small_border_radius - 10,
  },
  changeBtnText: {
    color: Colors.white,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text - 4,
  },
  shippingDetailsContanier: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingVertical: ScaleSize.spacing_small,
    borderBottomWidth: 1,
    borderColor: Colors.light_gray,
  },
  productDetailsContanier: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingVertical: ScaleSize.spacing_small,
  },
  productDetailDescription: {
    color: Colors.black,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.small_text - 2,
    alignSelf: "flex-start",
    marginTop: ScaleSize.spacing_very_small - 2,
  },
  videoContainer: {
    width: "100%",
    height: ScaleSize.spacing_extra_large * 3.5,
    marginTop: ScaleSize.spacing_semi_medium,
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: Colors.black,
    borderRadius: ScaleSize.primary_border_radius * 1.3,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: ScaleSize.spacing_large,
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
  backgroundVideo: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
  },
  controls: {
    width: "90%",
    alignSelf: "center",
    bottom: ScaleSize.spacing_medium,
  },
  seekBarFullWidth: {
    width: "90%",
    alignSelf: "center",
    bottom: ScaleSize.spacing_medium,
  },
  seekBarProgress: {
    backgroundColor: Colors.primary,
  },
  seekBarKnob: {
    backgroundColor: Colors.primary,
  },
  thumbnail: {
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
  },
  playButton: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    height: ScaleSize.large_icon,
    width: ScaleSize.large_icon,
    left: ScaleSize.spacing_very_small - 3,
  },
  blurLayer: {
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    height: ScaleSize.large_icon * 3,
    width: ScaleSize.large_icon * 3,
  },
  overlay: {
    padding: 10,
    height: "100%",
    width: "100%",
    position: "absolute",
    tintColor: "rgba(255,255,255,0.5)",
  },
});
