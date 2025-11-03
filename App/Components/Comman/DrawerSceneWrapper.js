import {
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useDrawerProgress } from "@react-navigation/drawer";
import { Colors } from "../../Resources/Colors";

const DrawerSceneWrapper = ({ children }) => {
  const progress = useDrawerProgress();
  const { width } = useWindowDimensions();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        scale: interpolate(progress.value, [0, 1], [1, 0.9], "clamp"),
      },
      {
        rotateY: `${interpolate(progress.value, [0, 1], [0, 1], "clamp")}deg`,
      },
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, Platform.OS === "android" ? width - 100 : -10],
          "clamp"
        ),
      },
    ],
    borderWidth: interpolate(progress.value, [0, 1], [0, 30], "clamp"),
    borderRadius: interpolate(progress.value, [0, 1], [0, 50], "clamp"),
    overflow: "hidden",
  }));

  return (
    <SafeAreaView style={{ backgroundColor: Colors.statusbar, flex: 1 }}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {children}
      </Animated.View>
    </SafeAreaView>
  );
};

export default DrawerSceneWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#cde5f2",
  },
});
