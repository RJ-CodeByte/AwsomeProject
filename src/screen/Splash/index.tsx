import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import ScreenNames from '~/./constants/screenNames';
import { SignUpStepEnum } from '~/./enum';
import { MainStackParamList } from '~/./router/root.index';
import setupStore from '~/./store/store.index';
import styles from '~/SignIn/styles';
// import { SignUpStepEnum } from '~/./types/signup';

export type SplashFormProps = NativeStackScreenProps<
  MainStackParamList,
  ScreenNames.Splash
>;

const Splash = (props: SplashFormProps) => {
  const navigation = props.navigation;
  const token = setupStore.getState().auth?.userResponse?.accessToken;
  const stepCheck = setupStore.getState().auth?.userResponse?.signupStep;
  // console.log('🚀 ~ Splash ~ stepCheck:', stepCheck);

  useEffect(() => {
    setTimeout(() => {
      checkAndNavigateHandler(stepCheck, token);
    }, 2000);
  }, []);

  const checkAndNavigateHandler = (
    stepCheck: number | undefined,
    token: string | null | undefined,
  ) => {
    switch (stepCheck) {
      case SignUpStepEnum.SIGN_UP_DONE:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ScreenNames.OTP }],
          }),
        );
        break;
      case SignUpStepEnum.OTP_VERIFICATION_DONE:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ScreenNames.AddProfile }],
          }),
        );
        break;
      case SignUpStepEnum.PROFILE_PHOTO_DONE:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ScreenNames.Membership }],
          }),
        );
        break;
      case SignUpStepEnum.SUBSCRIPTION_DONE:
        //need to be change as per screen flow
        if (token) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ScreenNames.Home }],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ScreenNames.OnBoard }],
            }),
          );
        }
        break;
      default:
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ScreenNames.OnBoard }],
          }),
        );
        // console.log('Default called');
        break;
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: 'splash' }}
      resizeMode="stretch"
    >
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
    </ImageBackground>
  );
};

export default Splash;
