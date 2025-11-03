import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import DrawerSceneWrapper from "../../../DrawerSceneWrapper";
import Header from "../../Components/Comman/Drawer/Header";
import { Images } from "../../Resources/Images";
import LinearGradient from "react-native-linear-gradient";
import { ScaleSize } from "../../Resources/ScaleSize";
import { useDispatch, useSelector } from "react-redux";
import { AppFonts } from "../../Resources/AppFonts";
import { TextFontSize } from "../../Resources/TextFontSize";
import { Colors } from "../../Resources/Colors";
import { PrimaryButton } from "../../Components/Comman";
import { Strings } from "../../Resources/Strings";
import { CategoryListing } from "../../Actions/Categories";
import QuizModal from "../../Components/Quiz/QuizModal";
import { userDetails } from "../../Actions/authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "react-native-reanimated-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
const isSmallDevice = width <= 375;

const HomeScreen = ({ navigation, route }) => {
  const { openDrawer } = navigation;
  const { userData } = useSelector((state) => state.Authentication);
  const { categoryList } = useSelector((state) => state.Categories);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [onFirst, setOnFirst] = useState(false);
  const dispatch = useDispatch();
  const [bgImgIndex, setBgImgIndex] = useState(0);

  useEffect(() => {
    dispatch(CategoryListing());
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
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
    } catch (err) {}
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("HomeNavigator", {
            screen: "PlayerScreen",
            params: {
              id: item?.id,
              title: item?.category_name,
              isFromMyFavorite: false,
            },
          })
        }
      >
        <ImageBackground
          style={[
            styles.itemBgImage,
            {
              width:
                index === 0 || index === categoryList?.length - 1
                  ? width * 0.86
                  : width * 0.85,
              height: height * 0.49,
              marginHorizontal:
                index !== 0 || index !== index.length
                  ? ScaleSize.spacing_very_small + 2
                  : 0,
            },
          ]}
          source={{ uri: item?.category_image_url }}
          key={item.id}
        >
          <Image source={Images.overlay} style={styles.overlay} />
          <TouchableOpacity
            style={styles.playButton}
            onPress={() =>
              navigation.navigate("HomeNavigator", {
                screen: "PlayerScreen",
                params: { id: item?.id, title: item?.category_name },
              })
            }
          >
            <ImageBackground
              style={styles.outerBlur}
              blurRadius={3}
              source={{ uri: item?.category_image_url }}
            >
              <Image source={Images.overlay} style={styles.overlay} />
              <View style={styles.playInnerButton}>
                <ImageBackground
                  source={{ uri: item?.category_image_url }}
                  blurRadius={5}
                  style={styles.innerBlur}
                >
                  <Image source={Images.overlay} style={styles.overlay} />
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.1)"]}
                    style={styles.gradientOverlay}
                  />
                  <Image style={styles.playIcon} source={Images.play_icon} />
                </ImageBackground>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitleText}>{item?.category_name}</Text>
            <Text style={styles.itemDescriptionText}>
              Explore {item?.category_name}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const onScrollEnd = (e) => {
    if (onFirst) {
      setBgImgIndex(0);
    } else {
      const index = Math.floor(e.nativeEvent.contentOffset.x / width);
      console.log("Index", index);
      setBgImgIndex(index + 1);
    }
    setOnFirst(false);
  };

  const footerButtonData = [
    {
      id: 1,
      title: Strings.take_the_quiz,
      icon: Images.quiz_main_icon,
    },
    {
      id: 2,
      title: Strings.shop_now,
      icon: Images.shopNow,
    },
  ];
  const footerRenderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.takeTheQuizButton,
            {
              backgroundColor:
                item?.id === 1 || item.id === "1"
                  ? Colors.primary
                  : Colors.orange,
            },
          ]}
          onPress={() => {
            if (item?.id === 1) {
              setTimeout(
                () => {
                  setShowQuizModal(true);
                },
                Platform.OS === "ios" ? 1000 : 0
              );
            } else {
              navigation.navigate("ShopScreen");
            }
          }}
          key={item?.id}
        >
          <Image
            source={item?.icon}
            style={[
              styles.quizIcon,
              {
                height:
                  item.id === 1
                    ? ScaleSize.small_icon * 5.5
                    : ScaleSize.small_icon * 3.5,
                width:
                  item.id === 1
                    ? ScaleSize.small_icon * 5.5
                    : ScaleSize.small_icon * 3.5,
                bottom: ScaleSize.spacing_medium,
              },
            ]}
          />
          <Text
            style={[
              styles.takeTheQuizText,
              {
                bottom:
                  item.id === 1
                    ? ScaleSize.spacing_medium
                    : ScaleSize.spacing_large * 1.2,
              },
            ]}
          >
            {item?.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <DrawerSceneWrapper>
        <SafeAreaView style={{ backgroundColor: Colors.white }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
              style={styles.container}
              source={{
                uri: categoryList[bgImgIndex + ""]?.category_image_url,
              }}
            >
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.6)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                ]}
                style={styles.gradientOverlay}
              />
              <View style={{ paddingHorizontal: ScaleSize.spacing_large }}>
                <Header
                  onLeftButtonPress={openDrawer}
                  isProfileShow={true}
                  leftIcon={Images.menu_icon}
                  rightIcon={{ uri: userData?.profile_picture_thumb }}
                />
              </View>
              <View
                style={{
                  paddingHorizontal: ScaleSize.spacing_large,
                  marginVertical:
                    Platform.OS === "ios" ? ScaleSize.spacing_semi_medium : 0,
                }}
              >
                <Text style={styles.welcomeText}>{Strings.welcome}</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.userNameText}
                >
                  {userData.full_name}
                </Text>
              </View>
              <FlatList
                horizontal
                data={categoryList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onStartReached={() => setOnFirst(true)}
                contentContainerStyle={styles.flatlist}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                snapToInterval={width * 0.92}
                decelerationRate="fast"
                style={styles.carouselContainer}
                snapToAlignment="center"
              />
              <View style={styles.footerScroll}>
                <Carousel
                  loop={false}
                  width={width}
                  mode="parallax"
                  modeConfig={{
                    parallaxScrollingScale: isSmallDevice
                      ? Platform.OS === "ios"
                        ? 0.875
                        : 0.85
                      : 0.855,
                    parallaxScrollingOffset: isSmallDevice ? 55 : 75,
                  }}
                  panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                  }}
                  autoPlay={false}
                  style={styles.carousal}
                  pagingEnabled={true}
                  snapEnabled={true}
                  data={footerButtonData}
                  onSnapToItem={null}
                  scrollAnimationDuration={1000}
                  renderItem={footerRenderItem}
                />
              </View>
              <QuizModal
                visible={showQuizModal}
                navigation={navigation}
                route={route}
                onClose={() => setShowQuizModal(false)}
                onStartQuiz={() => {
                  setShowQuizModal(false);
                }}
              />
            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      </DrawerSceneWrapper>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    overflow: "scroll",
    paddingVertical: ScaleSize.spacing_medium,
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  welcomeText: {
    color: Colors.black,
    fontFamily: AppFonts.semi_bold,
    letterSpacing: -1,
    fontSize: TextFontSize.medium_text + 2,
  },
  userNameText: {
    fontFamily: AppFonts.extra_bold,
    fontSize: TextFontSize.very_large_text + 1,
    color: Colors.black,
    textTransform: "capitalize",
    width: "90%",
    bottom: ScaleSize.spacing_small,
  },
  item: {
    borderRadius: ScaleSize.primary_border_radius,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.7,
    height: height * 0.4,
  },
  itemBgImage: {
    borderRadius: ScaleSize.primary_border_radius * 1.7,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    overflow: "hidden",
  },
  itemText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: AppFonts.regular,
  },
  flatlist: {
    alignItems: "flex-start",
    marginVertical: ScaleSize.spacing_semi_medium - 5,
    paddingHorizontal: ScaleSize.spacing_large - 10,
  },
  itemTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: ScaleSize.spacing_medium * 1.6,
  },
  itemTitleText: {
    fontFamily: AppFonts.extra_bold,
    fontSize: TextFontSize.very_large_text * 1.5,
    color: Colors.white,
    top: Platform.OS === "ios" ? 0 : ScaleSize.spacing_semi_medium,
  },
  itemDescriptionText: {
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.small_text,
    color: Colors.white,
  },
  outerBlur: {
    height: ScaleSize.large_image * 2,
    width: ScaleSize.large_image * 1.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  innerBlur: {
    height: ScaleSize.large_image * 2,
    width: ScaleSize.large_image * 1.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  playButton: {
    height: ScaleSize.spacing_extra_large * 1.7,
    width: ScaleSize.spacing_extra_large * 1.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 2,
    bottom: ScaleSize.spacing_medium * 1,
    borderColor: Colors.white,
    overflow: "hidden",
  },
  playIcon: {
    height: ScaleSize.large_icon,
    width: ScaleSize.large_icon,
    resizeMode: "contain",
  },
  playInnerButton: {
    height: ScaleSize.spacing_extra_large * 1.2,
    width: ScaleSize.spacing_extra_large * 1.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    overflow: "hidden",
  },
  takeTheQuizButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // marginVertical: ScaleSize.spacing_medium,
    paddingVertical: ScaleSize.spacing_semi_large,
    borderRadius: ScaleSize.primary_border_radius * 1.7,
  },
  shopNowButton: {
    width: "48%",
    height: "100%",
    backgroundColor: Colors.orange,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: ScaleSize.spacing_medium,
    paddingVertical: ScaleSize.spacing_large,
    borderRadius: ScaleSize.primary_border_radius * 1.1,
  },
  quizIcon: {
    height: ScaleSize.very_small_image - 5,
    width: ScaleSize.very_small_image - 5,
    resizeMode: "contain",
  },
  takeTheQuizText: {
    textAlign: "center",
    color: Colors.white,
    textTransform: "uppercase",
    width: "100%",
    position: "absolute",
    fontFamily: AppFonts.bold,
    fontSize: TextFontSize.small_text + 5,
  },
  footerScroll: {
    marginVertical: ScaleSize.spacing_small,
    height: ScaleSize.spacing_extra_large * 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  carousal: {
    alignItems: "flex-start",
  },
});
