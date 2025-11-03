import React, { useEffect } from "react";
import { Dimensions, Image, Platform, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/SideMenu/HomeScreen";
import MyProfileScreen from "../Screens/SideMenu/MyProfileScreen";
import MyFavouritesScreen from "../Screens/SideMenu/MyFavouritesScreen";
import MyQuizzesScreen from "../Screens/SideMenu/MyQuizzesScreen";
import FeedbackScreen from "../Screens/SideMenu/FeedbackScreen";
import AboutUsScreen from "../Screens/SideMenu/AboutUsScreen";
import PrivacyPolicyScreen from "../Screens/SideMenu/PrivacyPolicyScreen";
import RateUsScreen from "../Screens/SideMenu/RateUsScreen";
import CustomDrawer from "./CustomDrawer";
import { Images } from "../Resources/Images";
import { Colors } from "../Resources/Colors";
import { AppFonts } from "../Resources/AppFonts";
import { TextFontSize } from "../Resources/TextFontSize";
import { ScaleSize } from "../Resources/ScaleSize";
import ShopScreen from "../Screens/SideMenu/ShopScreen";

const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");
const isSmallDevice = width < 360;

function DrawerNavigator({ navigation, route }) {
  /////////////// Fuction for Logout ///////////////
  const handleLogout = async () => {
    navigation.navigate("AuthenticationNavigator", {
      screen: "LogOutScreen",
    });
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer {...props} logout={handleLogout} />
      )}
      drawerType="slide"
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.primary,
        drawerInactiveBackgroundColor: "transparent",
        drawerActiveTintColor: Colors.white,
        drawerInactiveTintColor: Colors.black,
        drawerHideStatusBarOnOpen: Platform.OS === "ios" ? true : false,
        overlayColor: "transparent",
        drawerItemStyle: styles.drawerItemStyle,
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerStyle: styles.drawerStyle,
        sceneContainerStyle: styles.sceneContainerStyle,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Image
                source={Images.home_icon}
                style={[
                  styles.icon,
                  {
                    tintColor: focused ? Colors.white : null,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={MyProfileScreen}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Image
                source={Images.profile_icon}
                style={[
                  styles.icon,
                  {
                    tintColor: focused ? Colors.white : null,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="My Favourites"
        component={MyFavouritesScreen}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Image
                source={Images.favourite_icon}
                style={[
                  styles.icon,
                  {
                    tintColor: focused ? Colors.white : null,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="My Quizzes"
        component={MyQuizzesScreen}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Image
                source={Images.quiz_icon}
                style={[
                  styles.icon,
                  {
                    tintColor: focused ? Colors.white : null,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Image
                source={Images.feedback_icon}
                style={[
                  styles.icon,
                  {
                    tintColor: focused ? Colors.white : null,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUsScreen}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Image
                source={Images.about_us_icon}
                style={[
                  styles.icon,
                  {
                    tintColor: focused ? Colors.white : null,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Image
                source={Images.privacy_icon}
                style={[
                  styles.icon,
                  {
                    tintColor: focused ? Colors.white : null,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="Rate Us"
        component={RateUsScreen}
        options={{
          drawerIcon: ({ focused }) => {
            return (
              <Image
                source={Images.rate_us_icon}
                style={[
                  styles.icon,
                  {
                    tintColor: focused ? Colors.white : null,
                  },
                ]}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: ScaleSize.medium_icon,
    height: ScaleSize.medium_icon,
    resizeMode: "contain",
  },
  drawerItemStyle: {
    borderRadius: ScaleSize.small_border_radius - 5,
  },
  drawerLabelStyle: {
    fontFamily: AppFonts.bold,
    top: ScaleSize.font_spacing,
    fontSize: TextFontSize.small_text,
  },
  drawerStyle: {
    backgroundColor: Colors.white,
    width: isSmallDevice ? "66%" : "69.5%",
  },
  sceneContainerStyle: {
    backgroundColor: Colors.white,
  },
});
export default DrawerNavigator;
