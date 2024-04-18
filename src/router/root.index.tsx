// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import ScreenNames from '~/constants/screenNames';
import { navigationRef } from '~/helper/NavigationRef';
import AddProfile from '~/screen/AddProfile';
import CreateAccount from '~/screen/CreateAccount';
import ForgotPassword from '~/screen/ForgotPassword';
import GuideSelection from '~/screen/GuideSelection';
import Membership from '~/screen/Membership';
import OTP from '~/screen/OTP';
import OnBoard from '~/screen/OnBoard';
import ChooseAuth from '~/screen/OnBoard/ChooseAuth';
import SignInForm from '~/screen/SignIn';
import Splash from '~/screen/Splash';
import TermsOfUse from '~/screen/TermsOfUse';
import Home from '~/screen/home';

export type MainStackParamList = {
  Splash: {};
  SignInForm: {};
  Home: {};
  OnBoard: {};
  ChooseAuth: {};
  ForgotPassword: {};
  GuideSelection: {};
  CreateAccount: {};
  OTP: {};
  AddProfile: {};
  Membership: {};
  TermsOfUse: {};
};
const Stack = createNativeStackNavigator<MainStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenNames.Splash} component={Splash} />
      <Stack.Screen name={ScreenNames.OnBoard} component={OnBoard} />
      <Stack.Screen name={ScreenNames.ChooseAuth} component={ChooseAuth} />
      <Stack.Screen name={ScreenNames.SignInForm} component={SignInForm} />
      <Stack.Screen
        name={ScreenNames.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={ScreenNames.GuideSelection}
        component={GuideSelection}
      />
      <Stack.Screen
        name={ScreenNames.CreateAccount}
        component={CreateAccount}
      />
      <Stack.Screen name={ScreenNames.OTP} component={OTP} />
      <Stack.Screen name={ScreenNames.AddProfile} component={AddProfile} />
      <Stack.Screen name={ScreenNames.Membership} component={Membership} />
      <Stack.Screen name={ScreenNames.TermsOfUse} component={TermsOfUse} />
      <Stack.Screen name={ScreenNames.Home} component={Home} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AuthStack />
    </NavigationContainer>
  );
}

export default AppStack;
