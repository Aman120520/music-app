import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DrawerSceneWrapper from "../../Components/Comman/DrawerSceneWrapper";
import { Images } from "../../Resources/Images";
import { ScaleSize } from "../../Resources/ScaleSize";
import Header from "../../Components/Comman/Drawer/Header";
import { useDispatch, useSelector } from "react-redux";
import { TextFontSize } from "../../Resources/TextFontSize";
import { AppFonts } from "../../Resources/AppFonts";
import { Colors } from "../../Resources/Colors";
import { SafeAreaView } from "react-native";
import Utils from "../../Helpers/Utils";
import { favoriteTrackList } from "../../Actions/SoundTrack";
import { useFocusEffect } from "@react-navigation/native";
import { ModalProgressLoader } from "../../Components/Comman";
const { width, height } = Dimensions.get("window");
const isSmallDevice = width <= 375;

const MyFavouritesScreen = ({ navigation, route }) => {
  const { openDrawer } = navigation;
  const { userData } = useSelector((state) => state.Authentication);
  const {
    favoriteList,
    isLoading,
    favoritesLoading,
    favoritesPage,
    favoritesTotalPage,
  } = useSelector((state) => state.SoundTrack);
  const dispatch = useDispatch();
  const tabData = [
    { id: 1, title: "Songs" },
    { id: 2, title: "Stories" },
    { id: 3, title: "Prayers" },
  ];
  const [selectedTab, setSelectedTab] = useState(1);
  const [filteredFavoriteList, setFilteredFavoriteList] = useState([]);
  const [refreshingData, setRefreshingData] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getFavoriteList(1);
    }, [])
  );

  useEffect(() => {
    if (favoriteList?.length > 0) {
      filterFavoritesByCategory(tabData[selectedTab - 1]?.title);
    }
  }, [selectedTab, favoriteList]);

  const getFavoriteList = async (page) => {
    try {
      var body = {
        user_id: userData?.id,
        page: page,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          favoriteTrackList(body, async (data, isSuccess) => {
            if (isSuccess) {
              setRefreshingData(false);
              filterFavoritesByCategory(tabData[selectedTab - 1]?.title);
            }
          })
        );
      }
    } catch (error) {}
  };

  const handleEndReached = () => {
    if (favoriteList?.length > 0 && favoritesPage < favoritesTotalPage) {
      getFavoriteList(favoritesPage + 1);
    } else {
      null;
    }
  };

  /////////// Function for refresh //////////
  const refresh = () => {
    setRefreshingData(true);
    filterFavoritesByCategory(tabData[selectedTab - 1]?.title);
    setRefreshingData(false);
  };

  const filterFavoritesByCategory = (category_name) => {
    const filteredData = favoriteList?.filter(
      (item) => item?.category_name === category_name
    );
    setFilteredFavoriteList(filteredData);
  };

  const handleButtonPress = ({ item }) => {
    refresh();
    setSelectedTab(item?.id);
  };

  const handleItemOnPress = (item) => {
    navigation.navigate("HomeNavigator", {
      screen: "PlayerScreen",
      params: {
        id: item?.id,
        title: tabData[selectedTab - 1]?.title,
        isFromMyFavorite: true,
      },
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleItemOnPress(item)}
      >
        <Image
          source={{ uri: item?.thumbnail_thumb }}
          style={styles.quizIcon}
        />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitleText} numberOfLines={1}>
            {item?.title}
          </Text>
          {/* <Text style={styles.itemDescriptionText}>{item.description}</Text> */}
        </View>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => handleItemOnPress(item)}
        >
          <Image source={Images.play_icon} style={styles.playIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <DrawerSceneWrapper>
      <SafeAreaView style={{ flexGrow: 1 }}>
        <ImageBackground style={styles.container} source={Images.bg}>
          <Header
            title={"My Favorites"}
            onLeftButtonPress={openDrawer}
            leftIcon={Images.menu_icon}
          />
          <ModalProgressLoader visible={isLoading} />
          <View style={styles.titleTabContainer}>
            {tabData.map((item, index) => {
              const isSelected = selectedTab === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.titleTab}
                  onPress={() => handleButtonPress({ item })}
                >
                  <Text style={styles.titleTabText(isSelected)}>
                    {item.title}
                  </Text>
                  {isSelected && <View style={styles.dot} />}
                </TouchableOpacity>
              );
            })}
          </View>
          {filteredFavoriteList?.length === 0 ? (
            <Text style={styles.emptyScreenText}>No data found!</Text>
          ) : (
            <FlatList
              style={styles.flatlist}
              data={filteredFavoriteList}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              onEndReached={() => handleEndReached()}
              refreshControl={
                <RefreshControl
                  refreshing={refreshingData}
                  onRefresh={refresh}
                />
              }
              ListFooterComponent={() =>
                favoritesPage > 1 &&
                favoritesLoading && (
                  <ActivityIndicator
                    animating
                    size={ScaleSize.spacing_medium * 2}
                    color={Colors.primary}
                  />
                )
              }
              keyExtractor={(item, index) => index}
            />
          )}
        </ImageBackground>
      </SafeAreaView>
    </DrawerSceneWrapper>
  );
};

export default MyFavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ScaleSize.spacing_large,
    alignItems: "center",
    paddingVertical: ScaleSize.spacing_semi_medium,
  },
  titleTabContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: ScaleSize.spacing_small,
    justifyContent: "flex-start",
  },
  titleTab: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: ScaleSize.spacing_large,
    marginVertical: ScaleSize.spacing_small,
  },
  titleTabText: (isSelected) => ({
    fontSize: isSelected
      ? TextFontSize.medium_text + 3
      : TextFontSize.medium_text - 2,
    color: Colors.black,
    fontFamily: AppFonts.bold,
  }),
  dot: {
    height: ScaleSize.spacing_semi_medium - 4,
    width: ScaleSize.spacing_semi_medium - 4,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    top: Platform.OS === "ios" ? ScaleSize.spacing_very_small : 0,
    marginBottom: -ScaleSize.spacing_small,
  },
  emptyScreenText: {
    fontSize: TextFontSize.medium_text * 1,
    fontFamily: AppFonts.medium,
    color: Colors.black,
    top: ScaleSize.spacing_extra_large * 4,
  },
  flatlist: {
    flexGrow: 1,
    width: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    borderRadius: ScaleSize.primary_border_radius * 1.4,
    marginVertical: ScaleSize.spacing_semi_medium - 4,
  },
  quizIcon: {
    height: ScaleSize.large_icon * 2.9,
    width: ScaleSize.large_icon * 2.9,
    resizeMode: "cover",
    borderRadius: ScaleSize.small_border_radius,
    marginRight: ScaleSize.spacing_small,
  },
  playButton: {
    height: ScaleSize.large_icon * 1.2,
    width: ScaleSize.large_icon * 1.2,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    tintColor: Colors.primary,
  },
  itemTextContainer: {
    paddingHorizontal: ScaleSize.spacing_small,
    width: "65%",
  },
  itemTitleText: {
    color: Colors.black,
    width: "100%",
    fontFamily: AppFonts.bold,
    fontSize: isSmallDevice
      ? TextFontSize.medium_text - 2
      : TextFontSize.medium_text + 1,
    top: ScaleSize.font_spacing,
  },
  itemDescriptionText: {
    color: Colors.black,
    fontFamily: AppFonts.medium,
    fontSize: TextFontSize.extra_small_text,
    bottom: ScaleSize.font_spacing + 2,
  },
});
