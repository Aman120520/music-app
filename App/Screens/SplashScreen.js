import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Colors, Images } from "../Resources";
import { ScaleSize } from "../Resources/ScaleSize";
import Utils from "../Helpers/Utils";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDetails } from "../Actions/authentication";

const SplashScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const progress = useRef(new Animated.Value(0)).current;
  const stripeMove = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start both animations in parallel
    Animated.parallel([
      // Progress bar animation (filling up)
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false, // For width interpolation
      }),
      // Infinite stripes animation (moving horizontally)
      Animated.loop(
        Animated.timing(stripeMove, {
          toValue: -((stripeWidth + stripeSpacing) * numberOfStripes),
          duration: 300000, // Adjust to desired speed
          useNativeDriver: true,
        })
      ),
    ]).start();
    if (Utils.isNetworkConnected()) {
      setTimeout(() => {
        getUser();
      }, 3000);
    } else {
      alert("Please check your internet connection.");
    }
  }, [progress, stripeMove]);

  const getUser = async () => {
    const UserId = await AsyncStorage.getItem("@id");
    if (UserId === null || UserId === "") {
      navigation.replace("AuthenticationNavigator");
    } else if (UserId !== null && !Utils.isNetworkConnected()) {
      alert("Please check your internet connection");
    } else {
      handleNavigation();
    }
  };

  const stripeWidth = 100;
  const numberOfStripes = 1000;
  const stripeSpacing = 3;

  const renderStripes = () => {
    const stripes = [];
    for (let i = 0; i < numberOfStripes; i++) {
      stripes.push(
        <View
          key={i}
          style={[
            styles.stripe,
            {
              marginLeft: i * (stripeWidth + -stripeSpacing * 27.5),
            },
          ]}
        />
      );
    }
    return stripes;
  };
  const handleNavigation = async () => {
    try {
      const UserId = await AsyncStorage.getItem("@id");
      var body = {
        user_id: UserId,
      };
      if (await Utils.isNetworkConnected()) {
        dispatch(
          userDetails(body, async (data, isSuccess) => {
            if (isSuccess === true) {
              navigation.replace("DrawerNavigator");
            } else {
              navigation.replace("AuthenticationNavigator");
            }
          })
        );
      } else {
        navigation.replace("DrawerNavigator");
      }
    } catch {}
  };

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <ImageBackground source={Images.bg} style={styles.container}>
      <StatusBar backgroundColor={Colors.statusbar} barStyle={"dark-content"} />
      <Image source={Images.logo} style={styles.splash_logo} />

      <View style={styles.progressBarBg}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: widthInterpolation,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.stripeContainer,
              { transform: [{ translateX: stripeMove }] },
            ]}
          >
            {renderStripes()}
          </Animated.View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  splash_logo: {
    width: "100%",
    resizeMode: "contain",
  },
  progressBarBg: {
    position: "absolute",
    height: ScaleSize.spacing_small + 3,
    backgroundColor: Colors.white,
    borderRadius: 5,
    width: "60%",
    bottom: ScaleSize.spacing_large * 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  progressBar: {
    height: ScaleSize.spacing_small + 3,
    backgroundColor: Colors.primary,
    borderRadius: ScaleSize.primary_border_radius + 5,
    position: "relative",
    overflow: "hidden",
  },
  progressStrip: {
    height: ScaleSize.spacing_small + 3,
    backgroundColor: Colors.white,
    borderRadius: ScaleSize.primary_border_radius,
    position: "relative",
    overflow: "hidden",
  },
  patternOverlay: {
    position: "absolute",
    top: -10,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 4,
    height: 100,
    transform: [{ rotate: "30deg" }],
    opacity: 0.6,
  },
  stripe: {
    position: "absolute",
    top: -10,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: ScaleSize.spacing_very_small + 1,
    height: 100,
    transform: [{ rotate: "30deg" }],
    opacity: 0.7,
  },
});
