import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import BulletPointText from '~/~/components/BulletPointText';
import CustomButton from '~/~/components/CustomButton';
import CustomToolBar from '~/~/components/CustomToolBar';
import CustomDatePicker from '~/~/components/DatePicker';
import DropDown from '~/~/components/DropDown';
import InputComponent from '~/~/components/InputComponent';
import TitleBar from '~/~/components/TitleBar';
import Assets from '~/~/constants/assets';
import Language, { errorMsg } from '~/~/constants/language';
import ScreenNames from '~/~/constants/screenNames';
import Loader from '~/~/helper/Loader';
import { MainStackParamList } from '~/~/router/root.index';
import { SignUpApiAction } from '~/~/service/apis/auth/signup/slice';
import { GetStateApiAction } from '~/~/service/apis/common/slice';
import {
  AppDispatch,
  RootStoreState,
  useAppDispatch,
  useAppSelector,
} from '~/~/store/store.hooks';
import { ISignUpReq } from '~/~/types/signup';
import { getFCMToken } from '~/~/utils/FcmTokenUtils';
import {
  GET_DEVICE_TYPE,
  Utility,
  capitalCheck,
  comparePassword,
  digitCheck,
  handleEmailValidation,
  isValidPhoneNumber,
  setFormatedDate,
  showSnackBar,
  specialCharacterRegex,
  validateBirthdate
} from '~/~/utils/commonUtils';
import styles from './styles';

interface CreateAccountData {
  firstName: string;
  lastName: string;
  birthdate: string;
  city: string;
  state: string;
  email: string;
  phoneNumber: string;
  confirmPassword: string;
  password: string;
}
export type CreateAccountProps = NativeStackScreenProps<
  MainStackParamList,
  ScreenNames.CreateAccount
>;
const CreateAccount = (props: CreateAccountProps) => {
  const navigation = props.navigation;
  const dispatch: AppDispatch = useAppDispatch();
  const statesRes = useAppSelector(
    (state: RootStoreState) => state.common?.stateRes,
  );
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields, touchedFields },
    trigger,
    watch,
  } = useForm<CreateAccountData>();

  useEffect(() => {
    getStates();
  }, []);

  // Once the response is changed it will called else it won't.
  const stateList = useMemo(() => {
    return statesRes?.map((obj) => ({
      label: obj.name,
      value: obj._id,
    }));
  }, [statesRes]);

  const getStates = async () => {
    try {
      dispatch(GetStateApiAction());
    } catch (error) {
      showSnackBar(String(error));
    }
  };

  const onContinuePress = (data: CreateAccountData) => {
    const birthdate = setFormatedDate(data.birthdate);
    getFCMToken().then(async (fcm: string) => {
      const payload: ISignUpReq = {
        firstName: data.firstName,
        lastName: data.lastName,
        birthdate: birthdate,
        city: data.city,
        stateId: data.state,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        deviceId: Utility.getDeviceID(),
        deviceType: GET_DEVICE_TYPE,
        deviceToken: fcm,
        userType: 1,
        lat: 0,
        lng: 0,
      };
      try {
        Loader.showLoader();
        await dispatch(SignUpApiAction(payload));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: ScreenNames.OTP,
                params: {
                  email: data?.email,
                },
              },
            ],
          }),
        );
      } catch (error) {
        console.log('🚀 ~ getFCMToken ~ error:', error);
        // showSnackBar(String(error?.message));
      } finally {
        Loader.hideLoader();
      }
    });
  };

  const onBackPress = () => {
    navigation.pop();
  };

  const handleInputChange = (fieldName: any, text: any, onChange: any) => {
    onChange(text);
    trigger(fieldName);
  };

  return (
    <View style={styles.container}>
      <CustomToolBar
        onBackPress={onBackPress}
        Icon={Assets.CLOSE}
        iconStyle={styles.closeImgStyle}
      />
      <TitleBar title={Language.CreateAnAccount} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* First Name */}
          <Controller
            control={control}
            name="firstName"
            defaultValue=""
            rules={{ required: 'First name is required' }}
            render={({ field: { onChange, value } }) => {
              return (
                <InputComponent
                  placeholder={Language.FirstName}
                  label={Language.FirstName}
                  onFocus={() => trigger('firstName')}
                  mainContainerStyle={[
                    styles.inputContainerStyle,
                    { marginTop: 0 },
                  ]}
                  onChangeText={(text: string) => {
                    handleInputChange('firstName', text, onChange);
                  }}
                  value={value}
                  error={errors?.firstName}
                />
              );
            }}
          />
          {/* Last Name */}
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
            rules={{ required: 'Last name is required' }}
            render={({ field: { onChange, value } }) => {
              return (
                <InputComponent
                  placeholder={Language.LastName}
                  label={Language.LastName}
                  onFocus={() => trigger('lastName')}
                  onChangeText={(text: string) => {
                    handleInputChange('lastName', text, onChange);
                  }}
                  value={value}
                  error={errors.lastName}
                />
              );
            }}
          />
          {/* Birthdate */}
          <Controller
            control={control}
            name="birthdate"
            defaultValue=""
            rules={{
              required: false,
              validate: {
                checkBirthdate: (v) => validateBirthdate(v),
              },
            }}
            render={({ field: { onChange } }) => {
              return (
                <CustomDatePicker
                  onChange={(value) => {
                    handleInputChange('birthdate', value, onChange);
                  }}
                  error={errors.birthdate}
                />
              );
            }}
          />
          {/* City */}
          <Controller
            control={control}
            name="city"
            defaultValue=""
            rules={{ required: 'City is required' }}
            render={({ field: { onChange, value } }) => {
              return (
                <InputComponent
                  placeholder={Language.City}
                  onFocus={() => trigger('city')}
                  label={Language.City}
                  onChangeText={(text: string) => {
                    handleInputChange('city', text, onChange);
                  }}
                  value={value}
                  error={errors.city}
                />
              );
            }}
          />
          {/* State */}
          <Controller
            control={control}
            name="state"
            defaultValue=""
            rules={{ required: 'State is required' }}
            render={({ field: { onChange, value } }) => {
              return (
                <DropDown
                  placeholder={Language.State}
                  label={Language.State}
                  mainContainerStyle={styles.inputContainerStyle}
                  onChangeSelection={(value: any) => {
                    onChange(value);
                  }}
                  data={stateList}
                  value={value}
                  error={errors.state}
                />
              );
            }}
          />
          {/* Email */}
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
                  autoCapitalize="none"
                  onFocus={() => trigger('email')}
                  label={Language.Email}
                  onChangeText={(text: string) => {
                    handleInputChange('email', text, onChange);
                  }}
                  value={value}
                  error={errors.email}
                />
              );
            }}
          />
          {/* Phone Number */}
          <Controller
            control={control}
            name="phoneNumber"
            defaultValue=""
            rules={{
              required: 'PhoneNumber is required',
              validate: (v) => isValidPhoneNumber(v),
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <InputComponent
                  placeholder={Language.PhoneNumber}
                  keyboardType="phone-pad"
                  label={Language.PhoneNumber}
                  mainContainerStyle={styles.inputContainerStyle}
                  onFocus={() => trigger('phoneNumber')}
                  onChangeText={(text: string) => {
                    handleInputChange('phoneNumber', text, onChange);
                  }}
                  value={value}
                  error={errors.phoneNumber}
                />
              );
            }}
          />
          {/* Password */}
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: errorMsg.password.AtLeast8Char,
              },
              pattern: {
                value: specialCharacterRegex,
                message: errorMsg.password.AtLeast1SpecialChar,
              },
              validate: {
                digitCheck: (v) => digitCheck(v),
                capitalCheck: (v) => capitalCheck(v),
              },
            }}
            render={({ field: { onChange, value } }) => {
              // console.log("errors======111",errors);
              return (
                <InputComponent
                  placeholder={Language.Password}
                  label={Language.Password}
                  secureTextEntry={true}
                  onFocus={() => trigger('password')}
                  onChangeText={(text: string) => {
                    handleInputChange('password', text, onChange);
                  }}
                  value={value}
                  error={errors.password}
                />
              );
            }}
          />
          <BulletPointText
            containerStyle={{ marginTop: 10 }}
            data={[
              errorMsg.password.AtLeast8Char,
              errorMsg.password.AtLeast1SpecialChar,
              errorMsg.password.AtLeast1No,
              errorMsg.password.AtLeast1CapitalLetter,
            ]}
          />
          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            defaultValue=""
            rules={{
              required: 'Confirm Password is required',
              // validate: (v) => ,
              minLength: {
                value: 8,
                message: errorMsg.password.AtLeast8Char,
              },
              pattern: {
                value: specialCharacterRegex,
                message: errorMsg.password.AtLeast1SpecialChar,
              },
              validate: {
                digitCheck: (v) => digitCheck(v),
                capitalCheck: (v) => capitalCheck(v),
                comparePassword: (v) => comparePassword(v, watch('password')),
              },
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <InputComponent
                  placeholder={Language.ConfirmPassword}
                  label={Language.ConfirmPassword}
                  onFocus={() => trigger('confirmPassword')}
                  mainContainerStyle={styles.inputContainerStyle}
                  secureTextEntry={true}
                  onChangeText={(text: string) => {
                    handleInputChange('confirmPassword', text, onChange);
                  }}
                  value={value}
                  error={errors.confirmPassword}
                />
              );
            }}
          />
        </ScrollView>
        <CustomButton
        title={Language.Continue}
        containerStyle={styles.btnContainerStyle}
        showIcon={true}
        onPress={handleSubmit(onContinuePress)}
        // onPress={onContinuePress}
        // disabled={handleFormValidation(isValid, dirtyFields)}
      />
      </KeyboardAvoidingView>
     
    </View>
  );
};

export default CreateAccount;
