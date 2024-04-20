import { StyleSheet } from 'react-native';
import Fonts from '~/./constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:10,
  },
  text1: {
    fontFamily: Fonts.REGULAR,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  text2: {
    fontFamily: Fonts.BOLD,
    fontSize: 15,
    marginLeft: 5,
  },
});
