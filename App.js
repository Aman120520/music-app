import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import AppNavigator from "./App/Navigators/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef, isReadyRef } from "./App/Navigators/NavigationHelper";
import Constant from "./App/Network/Constant";
import TrackPlayer from "react-native-track-player";

const App = () => {
  useEffect(async () => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  // Setup TrackPlayer on first render
  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      console.log("Player setup");
    };
    setupPlayer();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <AppNavigator navigationRef={navigationRef} />
    </NavigationContainer>
  );
};

export default App;
