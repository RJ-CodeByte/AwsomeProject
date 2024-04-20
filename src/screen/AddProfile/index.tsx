import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import ChoiceButton from '~/./components/ChoiceButton';
import BottomSheet from '~/./components/ChoiceModal';
import CustomToolBar from '~/./components/CustomToolBar';
import ProfilePhoto from '~/./components/ProfilePhoto';
import TitleBar from '~/./components/TitleBar';
import Assets from '~/./constants/assets';
import Language from '~/./constants/language';
import ScreenNames from '~/./constants/screenNames';
import Loader from '~/./helper/Loader';
import { clearLocalAuthStore } from '~/./network/axios/axiosInterceptor';
import { MainStackParamList } from '~/./router/root.index';
import { UploadProfileAction } from '~/./service/apis/auth/signup/slice';
import { AppDispatch, useAppDispatch } from '~/./store/store.hooks';
import { FileType, IUploadProfileReq } from '~/./types/signup';
import { Utility, showSnackBar } from '~/./utils/commonUtils';
import { styles } from './styles';

export type AddProfileProps = NativeStackScreenProps<
  MainStackParamList,
  ScreenNames.AddProfile
>;
const AddProfile = (props: AddProfileProps) => {
  const navigation = props.navigation;
  const dispatch: AppDispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [profilePic, setIsProfilePic] = useState<FileType[]>([]);

  const onContinuePress = async () => {
    const payload: IUploadProfileReq = {
      profile: profilePic[0],
      userType: 1,
    };
    try {
      Loader.showLoader();
      await dispatch(UploadProfileAction(payload));
      navigation.navigate(ScreenNames.Membership, {});
    } catch (error) {
      showSnackBar(String(error));
    } finally {
      Loader.hideLoader();
    }
  };

  const onClosePress = () => {
    setIsVisible(false);
  };

  const onPhotoClick = () => {
    setIsVisible(true);
  };

  const onBackPress = () => {
    Utility.NormalAlert(() => {
      clearLocalAuthStore();
    });
  };

  const onGalleryPress = (image: FileType[]): void => {
    setIsVisible(false);
    setIsProfilePic(image);
  };

  const onCameraPress = (image: FileType[]): void => {
    setIsVisible(false);
    setIsProfilePic(image);
  };
  const onSkipForNowPress = async () => {
    const payload: IUploadProfileReq = {
      profile: profilePic[0] ?? '',
      userType: 1,
    };
    try {
      Loader.showLoader();
      await dispatch(UploadProfileAction(payload));
      showSnackBar('Profile Added Successfully');
      // reset the stack
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenNames.Membership }],
        }),
      );
    } catch (error) {
      showSnackBar(String(error));
    } finally {
      Loader.hideLoader();
    }
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        isVisible={isVisible}
        onClosePress={onClosePress}
        onGallery={onGalleryPress}
        onCamPress={onCameraPress}
      />
      <CustomToolBar
        onBackPress={onBackPress}
        Icon={Assets.BACKARROW}
        iconStyle={styles.closeImgStyle}
      />
      <TitleBar
        title={Language.AddProfilePhoto}
        subtitle={Language.AddYourProfilePicToHelpPeople}
      />
      <ProfilePhoto
        imgUrl={profilePic ? profilePic[0]?.uri : undefined}
        onPress={onPhotoClick}
      />
      <ChoiceButton
        mainBtnContainer={styles.btnContainerStyle}
        choiceOneTitle={Language.Continue}
        choiceTwoTitle={Language.SkipForNow}
        choiceOneStyle={styles.choice1BtnStyle}
        showIcon1={true}
        onChoiceOnePress={onContinuePress}
        onChoiceTwoPress={onSkipForNowPress}
      />
    </View>
  );
};

export default AddProfile;
