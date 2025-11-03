import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AppState,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../Resources/Colors";
import { Images } from "../../Resources/Images";
import CommonHeader from "../../Components/Comman/CommonHeader";
import { ScaleSize } from "../../Resources/ScaleSize";
import { AppFonts } from "../../Resources/AppFonts";
import { TextFontSize } from "../../Resources/TextFontSize";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@react-native-assets/slider";
import Utils from "../../Helpers/Utils";
import { useFocusEffect } from "@react-navigation/native";
import {
  AddToFavorites,
  SoundTrackListing,
  SoundTrackView,
  getSoundTrackDetails,
  updateFavoriteStatus,
} from "../../Actions/SoundTrack";
import { ModalProgressLoader, PrimaryButton } from "../../Components/Comman";
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event,
  RepeatMode,
} from "react-native-track-player";
import { useIsFocused } from "@react-navigation/native";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");
const isSmallDevice = width <= 375;
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const PlayerScreen = ({ navigation, route }) => {
  const { id, title, isFromMyFavorite } = route.params;
  const { userData } = useSelector((state) => state.Authentication);
  const { soundTrackList, soundTrackDetails, isLoading } = useSelector(
    (state) => state.SoundTrack
  );
  const [itemIndex, setItemIndex] = useState(0);
  const [isAudioLoading, setAudioLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    soundTrackList[0]?.is_favorite !== 0 ? true : false
  );
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const { position, duration } = useProgress(200);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaylistLooping, setIsPlaylistLooping] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const isFocused = useIsFocused();
  const carouselRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      setAudioLoading(true);
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      TrackPlayer.reset();
      if (isFromMyFavorite) {
        setTimeout(() => getTrackDetails(), 1000);
      } else {
        setTimeout(() => getSoundTrackList(), 1000);
      }
    }, [])
  );
  useEffect(() => {
    if (isPlaylistLooping) {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
    }
  }, [isPlaylistLooping]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        // Pause the track when the app goes to background or becomes inactive
        if (isPlaying) {
          TrackPlayer.setRepeatMode(RepeatMode.Off);
          TrackPlayer.pause();
          setIsPlaying(false);
        }
      }
      setAppState(nextAppState);
      if (!isFocused && isPlaying) {
        TrackPlayer.setRepeatMode(RepeatMode.Off);
        TrackPlayer.pause();
        setIsPlaying(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isPlaying, isFocused]);

  useEffect(() => {
    addSoundTrackView();
  }, [itemIndex]);

  const addSoundTrackView = async () => {
    try {
      var body = {
        soundtrack_id: isFromMyFavorite
          ? soundTrackDetails?.id
          : soundTrackList[itemIndex]?.id,
        user_id: userData?.id,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          SoundTrackView(body, async (data, isSuccess) => {
            if (isSuccess === true) {
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const backAction = () => {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      TrackPlayer.pause();
      TrackPlayer.reset();
      setIsPlaying(false);
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [navigation]);

  // Initialize TrackPlayer and load the track when first playback starts
  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      if (Math.floor(position) === Math.floor(duration)) {
        // If song has finished or at the start, seek to start and play
        await TrackPlayer.seekTo(0);
      }
      await TrackPlayer.play();
    }

    setIsPlaying(!isPlaying);
  };

  const getSoundTrackList = async () => {
    try {
      var body = {
        page: 1,
        category_id: id,
        user_id: userData?.id,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          SoundTrackListing(body, async (data, isSuccess) => {
            if (isSuccess === true) {
              setIsFavorite(data.data[0]?.is_favorite !== 0 ? true : false);
              addSong(data?.data[0]);
              setAudioLoading(false);
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTrackDetails = async () => {
    try {
      var body = {
        soundtrack_id: id,
        user_id: userData.id,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          getSoundTrackDetails(body, async (data, isSuccess) => {
            if (isSuccess === true) {
              setIsFavorite(data.data?.is_favorite !== 0 ? true : false);
              addSong(data?.data);
              setAudioLoading(false);
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addSong = async (data) => {
    // setIsLooping(false);
    try {
      setIsPlaying(false);
      if (await Utils.isNetworkConnected()) {
        if (data?.is_paid === 0 || data?.is_paid === "0") {
          await TrackPlayer.add([
            {
              id: data?.id,
              url: data?.audio_file,
              artwork: data?.thumbnail || data?.thumbnail_thumb,
              title: data?.title,
              duration: data?.time,
            },
          ]);
          TrackPlayer.play();
          setAudioLoading(false);
          setIsPlaying(true);
        }
      }
    } catch (err) {
      setAudioLoading(false);
      console.log(err);
    }
  };

  const handleSliderChange = async (value) => {
    await TrackPlayer.seekTo(value);
  };

  const skipForward = async () => {
    const newPosition = position + 10;
    if (newPosition < duration) {
      await TrackPlayer.seekTo(newPosition);
    }
  };

  const skipBackward = async () => {
    const newPosition = position - 10;
    if (newPosition > 0) {
      await TrackPlayer.seekTo(newPosition);
    }
  };

  const toggleLoop = async () => {
    if (isLooping && !isFromMyFavorite) {
      setIsLooping(false);
      setIsPlaylistLooping(true);
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    } else if (isPlaylistLooping) {
      setIsLooping(false);
      setIsPlaylistLooping(false);
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
    } else if (isLooping && isFromMyFavorite) {
      setIsLooping(false);
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
    } else {
      setIsLooping(true);
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(1, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={item?.id} style={[styles.item]}>
        <ImageBackground
          source={{ uri: item?.thumbnail }}
          style={[
            styles.itemBgImage,
            {
              width: "100%",
              height: isSmallDevice ? "113%" : "110%",
            },
          ]}
        >
          {item?.is_paid !== 0 && (
            <View style={{ padding: ScaleSize.spacing_large, width: "100%" }}>
              <ImageBackground
                source={{ uri: item?.thumbnail }}
                blurRadius={10}
                style={styles.innerItemImg}
              >
                <Image
                  source={Images.grain_overlay}
                  style={styles.grainImage}
                />
                <View style={styles.itemUnlockContainer}>
                  <Text style={styles.lockItemTitleText}>{item?.title}</Text>
                  <Image source={Images.lock_icon} style={styles.lockImg} />
                  <Text style={styles.subscribeText}>Subscribe to unlock</Text>
                  <PrimaryButton
                    isOrange={true}
                    string={"Subscribe Now"}
                    onPress={() => navigation.navigate("UnlockPremiumScreen")}
                  />
                </View>
              </ImageBackground>
            </View>
          )}
        </ImageBackground>
        <View style={styles.textContainer}>
          <Text style={styles.headerText} numberOfLines={1}>
            {item?.title}
          </Text>
          {/* <Text style={styles.descriptionText}>A Tale of Salvation</Text> */}
        </View>
      </View>
    );
  };

  const soundTrackDetailsItems = ({ item, index }) => {
    return (
      <View key={item?.id} style={[styles.item]}>
        <ImageBackground
          source={{ uri: item?.thumbnail }}
          style={[
            styles.itemBgImage,
            {
              width: "100%",
              height: isSmallDevice ? "113%" : "110%",
            },
          ]}
        >
          {item?.is_paid !== 0 && (
            <View style={{ padding: ScaleSize.spacing_large, width: "100%" }}>
              <ImageBackground
                source={{ uri: item?.thumbnail }}
                blurRadius={10}
                style={styles.innerItemImg}
              >
                <Image
                  source={Images.grain_overlay}
                  style={styles.grainImage}
                />
                <View style={styles.itemUnlockContainer}>
                  <Text style={styles.lockItemTitleText}>{item?.title}</Text>
                  <Image source={Images.lock_icon} style={styles.lockImg} />
                  <Text style={styles.subscribeText}>Subscribe to unlock</Text>
                  <PrimaryButton
                    isOrange={true}
                    string={"Subscribe Now"}
                    onPress={() => navigation.navigate("UnlockPremiumScreen")}
                  />
                </View>
              </ImageBackground>
            </View>
          )}
        </ImageBackground>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{item?.title}</Text>
          {/* <Text style={styles.descriptionText}>A Tale of Salvation</Text> */}
        </View>
      </View>
    );
  };

  const onScrollEnd = async (index) => {
    try {
      setAudioLoading(true);
      TrackPlayer.reset();
      setItemIndex(index);
      setIsFavorite(soundTrackList[index]?.is_favorite !== 0 ? true : false);
      setTimeout(() => {
        addSong(soundTrackList[index]); // Load the new song
        TrackPlayer.play(); // Start playing the song
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorite = async () => {
    try {
      var body = {
        soundtrack_id: isFromMyFavorite
          ? soundTrackDetails?.id
          : soundTrackList[itemIndex]?.id,
        user_id: userData?.id,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          AddToFavorites(body, async (data, isSuccess) => {
            if (isSuccess === true) {
              setIsFavorite(
                data?.data?.is_favorites === 0 ||
                  data?.data?.is_favorites === "0"
                  ? false
                  : true
              );
              dispatch(
                updateFavoriteStatus(
                  soundTrackList[itemIndex]?.id,
                  data?.data?.is_favorites
                )
              );
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async (event) => {
    console.log("PlaybackQueueEnded Event:", event);
    if (
      event.type === Event.PlaybackQueueEnded &&
      event.nextTrack !== null &&
      isPlaylistLooping
    ) {
      console.log("itemIndex", itemIndex, "length", soundTrackList?.length);
      doNext(itemIndex);
    } else {
      setIsPlaying(false);
    }
  });

  function doNext(itemIndex) {
    if (itemIndex + 1 === soundTrackList?.length) {
      carouselRef.current.scrollTo({ index: 0 });
      onScrollEnd(0);
    } else {
      if (
        soundTrackList[itemIndex + 1]?.is_paid === 1 ||
        soundTrackList[itemIndex + 1]?.is_paid === "1"
      ) {
        carouselRef.current.next();
        console.log("Ddddd");

        setTimeout(() => {
          doNext(itemIndex + 2);
        }, 500);
      } else {
        console.log("Ddddd222 =====> " + itemIndex);
        carouselRef.current.next();
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.safeAreaBg }}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <StatusBar
          backgroundColor={Colors.statusbar}
          barStyle={"dark-content"}
        />
        <ModalProgressLoader visible={isLoading} />
        <ImageBackground style={styles.bgImg} source={Images.bg}>
          <View style={{ paddingHorizontal: ScaleSize.spacing_large }}>
            <CommonHeader
              leftIcon={Images.back_icon}
              onLeftButtonPress={() => {
                TrackPlayer.reset();
                navigation.goBack();
              }}
              title={title}
            />
          </View>
          {isFromMyFavorite ? (
            soundTrackDetails && soundTrackDetails?.audio_file ? (
              <Carousel
                loop={false}
                width={width}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: isSmallDevice ? 0.85 : 0.84,
                  parallaxScrollingOffset: isSmallDevice ? 55 : 75,
                }}
                autoPlay={false}
                style={styles.flatlist}
                pagingEnabled={false}
                snapEnabled={false}
                data={[soundTrackDetails]}
                scrollAnimationDuration={1000}
                renderItem={soundTrackDetailsItems}
              />
            ) : (
              <View
                style={{
                  width: width * 0.85,
                  height: isSmallDevice ? height * 0.55 : height * 0.65,
                  marginBottom: ScaleSize.spacing_large * 2,
                  alignSelf: "center",
                  backgroundColor: Colors.light_gray,
                  borderRadius: ScaleSize.primary_border_radius * 1.7,
                  padding: ScaleSize.spacing_medium,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )
          ) : soundTrackList.length >= 1 ? (
            <Carousel
              ref={carouselRef}
              loop={false}
              width={width}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: isSmallDevice ? 0.85 : 0.84,
                parallaxScrollingOffset: isSmallDevice ? 55 : 75,
              }}
              autoPlay={false}
              style={styles.flatlist}
              pagingEnabled={true}
              snapEnabled={true}
              data={soundTrackList}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => {
                if (soundTrackList?.length > 1) {
                  onScrollEnd(index);
                }
              }}
              renderItem={renderItem}
            />
          ) : (
            <View
              style={{
                width: width * 0.85,
                height: isSmallDevice ? height * 0.55 : height * 0.65,
                marginBottom: ScaleSize.spacing_large * 2,
                alignSelf: "center",
                backgroundColor: Colors.light_gray,
                borderRadius: ScaleSize.primary_border_radius * 1.7,
                padding: ScaleSize.spacing_medium,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          )}
          <View style={styles.controllerContainer}>
            <View style={styles.sliderContainer}>
              <Text style={styles.audioCountText}>{formatTime(position)}</Text>
              <Slider
                style={styles.Slider}
                minimumValue={0}
                maximumValue={duration}
                step={0}
                value={position}
                trackThickness={15}
                thumbSize={ScaleSize.spacing_medium}
                trackHeight={20}
                onValueChange={handleSliderChange}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={"#cde5f2"}
                thumbTintColor={Colors.primary}
                trackStyle={styles.sliderTrackStyle}
              />
              <Text style={styles.audioCountText}>{formatTime(duration)}</Text>
            </View>

            <View style={styles.controllerBtnContainer}>
              <TouchableOpacity
                style={[styles.controllerBtn]}
                onPress={handleFavorite}
                disabled={
                  soundTrackList[itemIndex]?.is_paid === 1 ||
                  soundTrackList[itemIndex]?.is_paid === "1"
                    ? true
                    : false
                }
              >
                {soundTrackList[itemIndex]?.is_paid === 1 ||
                soundTrackList[itemIndex]?.is_paid === "1" ? (
                  <Image
                    source={Images.favourite_fill_icon}
                    style={[
                      styles.favouriteIcon,
                      { tintColor: Colors.light_gray },
                    ]}
                  />
                ) : (
                  <Image
                    source={
                      isFavorite
                        ? Images.favourite_fill_icon
                        : Images.favourite_unfill_icon
                    }
                    style={[
                      styles.favouriteIcon,
                      { tintColor: isFavorite ? Colors.orange : null },
                    ]}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controllerBtn}
                disabled={Math.floor(duration) <= 10 ? true : false}
                onPress={skipBackward}
              >
                <Image
                  source={Images.forward_icon}
                  style={[
                    styles.rewindIcon,
                    {
                      tintColor:
                        Math.floor(duration) <= 10 ? Colors.light_gray : null,
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.controllerBtn,
                  { marginHorizontal: ScaleSize.spacing_small },
                ]}
                onPress={
                  isFromMyFavorite
                    ? soundTrackDetails?.is_paid === 0 ||
                      soundTrackDetails?.is_paid === "0"
                      ? togglePlayback
                      : null
                    : soundTrackList[itemIndex]?.is_paid === 0 ||
                      soundTrackList[itemIndex]?.is_paid === "0"
                    ? togglePlayback
                    : null
                }
              >
                {soundTrackList[itemIndex]?.is_paid === 1 ||
                soundTrackList[itemIndex]?.is_paid === "1" ? (
                  <Image
                    source={
                      isPlaying ? Images.pause_icon : Images.audio_play_icon
                    }
                    style={styles.playPauseIcon}
                  />
                ) : isAudioLoading || !duration ? (
                  <ActivityIndicator
                    style={styles.playPauseIcon}
                    size={ScaleSize.extra_large_icon}
                    color={Colors.primary}
                  />
                ) : (
                  <Image
                    source={
                      isPlaying ? Images.pause_icon : Images.audio_play_icon
                    }
                    style={styles.playPauseIcon}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controllerBtn}
                disabled={Math.floor(duration) <= 10 ? true : false}
                onPress={skipForward}
              >
                <Image
                  source={Images.rewind_icon}
                  style={[
                    styles.rewindIcon,
                    {
                      tintColor:
                        Math.floor(duration) <= 10 ? Colors.light_gray : null,
                      transform:
                        Platform.OS === "ios"
                          ? [{ rotateY: "0deg" }]
                          : [{ rotateY: "180deg" }],
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controllerBtn}
                onPress={toggleLoop}
                disabled={
                  soundTrackList[itemIndex]?.is_paid === 1 ||
                  soundTrackList[itemIndex]?.is_paid === "1"
                    ? true
                    : false
                }
              >
                {soundTrackList[itemIndex]?.is_paid === 1 ||
                soundTrackList[itemIndex]?.is_paid === "1" ? (
                  <Image
                    source={Images.repeat_icon}
                    style={[
                      styles.repeatIcon,
                      {
                        tintColor: Colors.light_gray,
                      },
                    ]}
                  />
                ) : (
                  <Image
                    source={
                      isPlaylistLooping
                        ? Images.repeat_icon
                        : isLooping
                        ? Images.single_repeat_icon
                        : Images.repeat_icon
                    }
                    style={[
                      styles.repeatIcon,
                      {
                        tintColor: isPlaylistLooping ? Colors.primary : null,
                      },
                    ]}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  bgImg: {
    flex: 1,
    resizeMode: "cover",
    paddingBottom: ScaleSize.spacing_large,
    alignItems: "center",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    top: ScaleSize.spacing_medium,
    marginBottom: ScaleSize.spacing_large * 4,
  },
  itemBgImage: {
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: Colors.primary,
    borderRadius: ScaleSize.primary_border_radius * 1.7,
    justifyContent: "center",
    alignItems: "center",
  },
  innerItemImg: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: ScaleSize.primary_border_radius * 1.7,
  },
  itemUnlockContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: ScaleSize.spacing_large,
  },
  grainImage: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  lockImg: {
    height: ScaleSize.large_icon * 3,
    width: ScaleSize.large_icon * 3,
    resizeMode: "contain",
    marginVertical: ScaleSize.spacing_medium,
  },
  lockItemTitleText: {
    color: Colors.white,
    fontFamily: AppFonts.regular,
    fontSize: TextFontSize.medium_text,
    textAlign: "center",
  },
  subscribeText: {
    color: Colors.white,
    fontFamily: AppFonts.semi_bold,
    fontSize: TextFontSize.extra_large_text,
    textAlign: "center",
  },
  flatlist: {
    // marginTop: ScaleSize.spacing_semi_medium - 5,
    // paddingHorizontal: ScaleSize.spacing_large - 10,
    alignItems: "flex-start",
  },
  textContainer: {
    marginTop: ScaleSize.spacing_medium,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  headerText: {
    fontFamily: AppFonts.extra_bold,
    fontSize: isSmallDevice
      ? TextFontSize.large_text
      : TextFontSize.very_large_text + 1,
    color: Colors.black,
    textAlign: "center",
    marginVertical: Platform.OS === "ios" ? ScaleSize.spacing_small : 0,
  },
  descriptionText: {
    color: Colors.black,
    fontFamily: AppFonts.regular,
    fontSize: TextFontSize.small_text,
    bottom: ScaleSize.spacing_small,
  },
  controllerContainer: {
    paddingHorizontal: ScaleSize.spacing_large,
    paddingTop: ScaleSize.spacing_very_small,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ScaleSize.spacing_small,
  },
  Slider: {
    width: "70%",
  },
  sliderTrackStyle: {
    height: ScaleSize.spacing_very_small + 2,
    width: "100%",
    borderRadius: 100,
  },
  audioCountText: {
    color: "black",
    fontSize: TextFontSize.small_text - 1,
    fontFamily: AppFonts.bold,
  },
  controllerBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  favouriteIcon: {
    height: ScaleSize.large_icon * 1.4,
    width: ScaleSize.large_icon * 1.4,
    resizeMode: "contain",
  },
  rewindIcon: {
    height: ScaleSize.large_icon * 1.8,
    width: ScaleSize.large_icon * 1.8,
    resizeMode: "contain",
  },
  playPauseIcon: {
    height: ScaleSize.extra_large_icon * 1.6,
    width: ScaleSize.extra_large_icon * 1.6,
    resizeMode: "contain",
  },
  repeatIcon: {
    height: ScaleSize.large_icon * 1.3,
    width: ScaleSize.large_icon * 1.3,
    resizeMode: "contain",
  },
  controllerBtn: {
    padding: ScaleSize.spacing_very_small + 4,
  },
  overlay: {
    flex: 1,
    right: -200,
  },
});
