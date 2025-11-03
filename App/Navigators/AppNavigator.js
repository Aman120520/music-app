import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../Screens/SplashScreen";
import AuthenticationNavigator from "./AuthenticationNavigator";
import DrawerNavigator from "./DrawerNavigator";
import HomeNavigator from "./HomeNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = ({ navigationRef }) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="AuthenticationNavigator"
          component={AuthenticationNavigator}
        />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
