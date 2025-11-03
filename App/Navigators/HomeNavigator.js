import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/SideMenu/HomeScreen";
import PlayerScreen from "../Screens/Home/PlayerScreen";
import ShopScreen from "../Screens/SideMenu/ShopScreen";
import ProdutDetailScreen from "../Screens/Home/ProdutDetailScreen";
import MyCartScreen from "../Screens/Home/MyCartScreen";
import OrderSuccessScreen from "../Screens/Home/OrderSuccessScreen";
import UnlockPremiumScreen from "../Screens/Home/UnlockPremiumScreen";
import PremiumSuccessScreen from "../Screens/Home/PremiumSuccessScreen";
import QuizScreen from "../Screens/Home/QuizScreen";
import QuizResultScreen from "../Screens/Home/QuizResultScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        <Stack.Screen name="ShopScreen" component={ShopScreen} />
        <Stack.Screen
          name="ProdutDetailScreen"
          component={ProdutDetailScreen}
        />
        <Stack.Screen name="MyCartScreen" component={MyCartScreen} />
        <Stack.Screen
          name="OrderSuccessScreen"
          component={OrderSuccessScreen}
        />
        <Stack.Screen
          name="UnlockPremiumScreen"
          component={UnlockPremiumScreen}
        />
        <Stack.Screen
          name="PremiumSuccessScreen"
          component={PremiumSuccessScreen}
        />

        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="QuizResultScreen" component={QuizResultScreen} />
      </Stack.Navigator>
    </>
  );
};

export default HomeNavigator;
