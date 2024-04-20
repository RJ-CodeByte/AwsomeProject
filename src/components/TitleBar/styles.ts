import { Platform, StyleSheet } from 'react-native';
import Fonts from '~/./constants/fonts';

export const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS == 'ios' ? 40 : 40,
  },
  txtStyle: {
    fontSize: 22,
    fontFamily: Fonts.BOLD,
  },
  subTxtStyle: {
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    marginTop: 30,
  },
  imgStyle: {
    height: 60,
    width: 60,
  },
});
