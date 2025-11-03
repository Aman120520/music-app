import React from 'react';
import GetStartedScreen from '../Screens/Authentications/GetStartedScreen';
import SignInScreen from '../Screens/Authentications/SignInScreen';
import ForgotPasswordScreen from '../Screens/Authentications/ForgotPasswordScreen';
import SignUpScreen from '../Screens/Authentications/SignUpScreen';
import Webview from '../Screens/Authentications/TermsAndConditionScreens';
import LogOutScreen from '../Screens/SideMenu/LogOutScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Webview" component={Webview} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="LogOutScreen" component={LogOutScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthenticationNavigator;
