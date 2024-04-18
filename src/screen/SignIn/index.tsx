import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import CustomButton from '~/~/components/CustomButton';
import CustomFooter from '~/~/components/CustomFooter';
import CustomToolBar from '~/~/components/CustomToolBar';
import InputComponent from '~/~/components/InputComponent';
import TitleBar from '~/~/components/TitleBar';
import Assets from '~/~/constants/assets';
import Language from '~/~/constants/language';
import ScreenNames from '~/~/constants/screenNames';
import Loader from '~/~/helper/Loader';
import { MainStackParamList } from '~/~/router/root.index';
import { LoginApiAction } from '~/~/service/apis/auth/slice';
import { AppDispatch, useAppDispatch } from '~/~/store/store.hooks';
import { getFCMToken } from '~/~/utils/FcmTokenUtils';
import { innerContainer } from '~/~/utils/commonStyle';
import {
  GET_DEVICE_TYPE,
  Utility,
  handleEmailValidation,
  handleFormValidation,
  showSnackBar
} from '~/~/utils/commonUtils';
import styles from './styles';
interface SignInFormData {
  email: string;
  password: string;
}
export type SignInFormProps = NativeStackScreenProps<
  MainStackParamList,
  ScreenNames.SignInForm
>;
const SignInForm = (props: SignInFormProps) => {
  const navigation = props.navigation;
  const dispatch: AppDispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    trigger,
  } = useForm<SignInFormData>();

  const onContinue = (data: SignInFormData) => {
    Keyboard.dismiss();
    getFCMToken().then(async (fcm: string) => {
      const payload: ILogInReq = {
        email: data.email,
        password: data.password,
        deviceId: Utility.getDeviceID(),
        deviceType: GET_DEVICE_TYPE,
        deviceToken: fcm,
      };
      console.log('🚀 ~ onContinue ~ payload:', payload);
      try {
        Loader.showLoader();
        await dispatch(LoginApiAction(payload));
        // reset the stack
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ScreenNames.Home }],
          }),
        );
      } catch (error) {
        showSnackBar(String(error.message));
      } finally {
        Loader.hideLoader();
      }
    });
  };

  const handleSignUp = () => {
    navigation.navigate(ScreenNames.GuideSelection, {});
    // navigation.navigate(ScreenNames.AddProfile, {});
  };

  const onBackPress = () => {
    navigation.pop();
  };
  const onForgotPwdPress = () => {
    navigation.navigate('ForgotPassword', {});
  };
  const handleInputChange = (fieldName: any, text: any, onChange: any) => {
    onChange(text);
    trigger(fieldName);
  };

  return (
    <View style={styles.container}>
      <View style={innerContainer}>
        <CustomToolBar
          onBackPress={onBackPress}
          Icon={Assets.CLOSE}
          iconStyle={styles.closeImgStyle}
        />
        <TitleBar title={Language.Login} />
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              required: 'Email is required',
              validate: (v) => handleEmailValidation(v),
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <InputComponent
                  placeholder={Language.Email}
                  label={Language.Email}
                  autoCapitalize="none"
                  onFocus={() => trigger('email')}
                  mainContainerStyle={styles.inputContainerStyle}
                  onChangeText={(text: string) => {
                    handleInputChange('email', text, onChange);
                  }}
                  value={value}
                  error={errors?.email}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, value } }) => {
              return (
                <InputComponent
                  placeholder={Language.Password}
                  onFocus={() => trigger('password')}
                  label={Language.Password}
                  secureTextEntry={true}
                  onChangeText={(text: string) => {
                    handleInputChange('password', text, onChange);
                  }}
                  value={value}
                  error={errors?.password}
                />
              );
            }}
          />
          <TouchableOpacity onPress={onForgotPwdPress}>
            <Text style={styles.forgotPasswordTxt}>
              {Language.ForgotPasswordQ}
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          title={Language.Login}
          onPress={handleSubmit(onContinue)}
          containerStyle={styles.btnContainerStyle}
          disabled={handleFormValidation(isValid, dirtyFields)}
        />
        <CustomFooter
          title={Language.DoNotHaveAccount}
          boldTitle={Language.Signup}
          onBoldTitlePress={handleSignUp}
        />
      </View>
    </View>
  );
};

export default SignInForm;
