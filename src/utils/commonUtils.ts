
import { Alert, Dimensions, Linking, Platform } from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { PERMISSIONS } from 'react-native-permissions';
import Snackbar from 'react-native-snackbar';
import { errorMsg } from '~/constants/language';
import { requestSinglePermissionHandler } from './Permissionhandler';

export const isFalsyValue = (param: any): boolean => {
  return (
    param === null ||
    param === undefined ||
    param === false ||
    param === '' ||
    isNaN(param) ||
    param === 0
  );
};

export const isUndefined = (param: any): boolean => {
  return param === undefined;
};



export const GET_DEVICE_TYPE = Platform.OS === 'android' ? 'ANDROID' : 'IOS';
export const PLATFORM_OS = Platform.OS;

//  for refrerce only
export const getDeviceHeight = () => {
  return Math.round(Dimensions.get('window').height);
};



const isValidEmail = (email: string) =>
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

export const handleEmailValidation = (email: any) => {
  const isValid = isValidEmail(email);
  return isValid ? true : 'invalid Email';
};

export const handleFormValidation = (isValid: boolean, dirtyFields: any) => {
  // console.log('🚀 ~ handleFormValidation ~ isValid:', isValid, dirtyFields);
  return !isValid || !Object.keys(dirtyFields)?.length;
};

export const isValidPhoneNumber = (value: any) => {
  if (value?.length == 10 && !isNaN(value)) {
    return true;
  } else {
    return 'please provide valid phone number';
  }
};

export const comparePassword = (value: any, password: string) => {
  // console.log('🚀 ~ comparePassword ~ value:', value, password);
  if (value === password) {
    return true;
  } else {
    return errorMsg.password.PasswordNotMatch;
  }
};

export const validateBirthdate = (value: string | Date) => {
  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight to compare only date
  const minAge = 18;
  const maxAge = 100;
  if (
    selectedDate >= today ||
    today.getFullYear() - selectedDate.getFullYear() < minAge ||
    today.getFullYear() - selectedDate.getFullYear() > maxAge
  ) {
    console.log('error');
    return 'Please select a valid birthdate';
  }
  return true;
};

export const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const digitCheck = (value: any) => {
  if (value.match(/\d/)) {
    return true;
  } else {
    return errorMsg.password.AtLeast1No;
  }
};
export const capitalCheck = (value: any) => {
  if (value.match(/[A-Z]/)) {
    return true;
  } else {
    return errorMsg.password.AtLeast1CapitalLetter;
  }
};

export const showSnackBar = (msg: string) => {
  Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_SHORT,
  });
};
const getAndroidApiLevel = (): number => {
  return typeof Platform.Version === 'string'
    ? +Platform.Version
    : Platform.Version;
};

// refrence only
const openSetting = () => {
  Linking.canOpenURL('app-settings:')
    .then((supported) => {
      if (supported) {
        return Linking.openURL('app-settings:');
      }
    })
    .catch((err) => console.error('An error occurred', err));
};

export const selectImageFromGallery = (
  options: ImageLibraryOptions,
): Promise<FileType[]> => {
  return new Promise(async (resolve, reject) => {
    const result: ImagePickerResponse = await launchImageLibrary({
      // ...commonPickerOption,
      ...options,
    });
    if (result && result.assets && result.assets.length > 0) {
      const fileList: FileType[] = result?.assets?.map((item) => {
        if (item.uri && item.type && item.fileName) {
          const file: FileType = {
            uri:
              Platform.OS === 'ios'
                ? String(item.uri).replace('file://', '')
                : item.uri,
            type: item.type,
            name: item.fileName,
          };
          return file;
        }
      });
      // console.log(
      //   '🚀 ~ constfileList:FileType[]=result?.assets?.map ~ fileList:',
      //   fileList,
      // );
      if (fileList && fileList.length > 0) {
        resolve(fileList);
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
};

export const captureImageFromCamera = (
  options: ImageLibraryOptions,
): Promise<FileType[]> => {
  return new Promise(async (resolve, reject) => {
    const hasCameraPermission = await requestSinglePermissionHandler(
      PLATFORM_OS == 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    );
    if (hasCameraPermission) {
      const result: ImagePickerResponse = await launchCamera({
        // ...commonPickerOption,
        ...options,
      });
      if (result && result.assets && result.assets.length > 0) {
        const fileList: FileType[] = result?.assets?.map((item) => {
          if (item.uri && item.type && item.fileName) {
            const file: FileType = {
              uri:
                Platform.OS === 'ios'
                  ? String(item.uri).replace('file://', '')
                  : item.uri,
              type: item.type,
              name: item.fileName,
            };
            return file;
          }
        });
        if (fileList && fileList.length > 0) {
          resolve(fileList);
        } else {
          reject();
        }
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
};

const formatJson = (data: any) => {
  return JSON.stringify(data, null, 2);
};

export const splitFileName = (filePath: string) => {
  if (filePath) {
    const url = filePath;
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    return fileName;
  }
};

const NormalAlert = (onOkPress: any) => {
  Alert.alert('', 'Are You sure you want to cancel the sign in process?', [
    {
      text: 'Cancel',
      // onPress: onCancelPress,
    },
    {
      text: 'Ok',
      onPress: onOkPress,
    },
  ]);
};

const noInternetAlert = () => {
  showSnackBar('Please check your internet connection');
};

export const Utility = {
  getAndroidApiLevel,
  getDeviceID,
  openSetting,
  formatJson,
  NormalAlert,
  noInternetAlert,
};
