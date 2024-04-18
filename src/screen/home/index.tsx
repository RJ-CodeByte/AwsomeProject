import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { MainStackParamList } from '~/~/router/root.index';
import ScreenNames from '~/~/constants/screenNames';
import { styles } from './styles';
import CustomButton from '~/~/components/CustomButton';
import Language from '~/~/constants/language';
import {
  AppDispatch,
  RootStoreState,
  useAppDispatch,
  useAppSelector,
} from '~/~/store/store.hooks';
import { getDeviceID, showSnackBar } from '~/~/utils/commonUtils';
import { LogoutApiAction } from '~/~/service/apis/auth/slice';
import Loader from '~/~/helper/Loader';

type Props = NativeStackScreenProps<MainStackParamList, ScreenNames.Home>;

const Home = (_props: Props) => {
  const navigation = _props.navigation;
  const dispatch: AppDispatch = useAppDispatch();
  const userResponseRes = useAppSelector(
    (state: RootStoreState) => state.auth.userResponse,
  );

  const onLogout = async () => {
    const deviceId = await getDeviceID();
    const payload: ILogOutReq = {
      deviceId: deviceId,
    };
    try {
      Loader.showLoader();
      await dispatch(LogoutApiAction(payload));
      navigation.replace('OnBoard', {});
    } catch (e) {
      showSnackBar(String(e));
    } finally {
      Loader.hideLoader();
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>{'Home Screen'}</Text> */}
      <Text>First Name: {userResponseRes?.firstName}</Text>
      <Text>Last Name: {userResponseRes?.lastName}</Text>
      <Text>Email: {userResponseRes?.email}</Text>
      <CustomButton title={Language.LogOut} onPress={onLogout} />
    </View>
  );
};

export default Home;
