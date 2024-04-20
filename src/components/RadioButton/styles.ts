import { StyleSheet } from 'react-native';
import Fonts from '~/./constants/fonts';
import Color from '~/./constants/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    shadowColor: Color.SHADOW2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    alignItems: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    width: '90%',
    padding: 20,
    backgroundColor: Color.WHITE,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  radioContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 14,
    marginVertical: 8,
    fontWeight: '700',
    color: Color.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  radioButton: {
    height: 21,
    width: 21,
  },
  premiumButton: {
    position: 'absolute',
    height: 50,
    width: 50,
    top: 0,
    right: 0,
  },
  textStyle: {
    paddingHorizontal: 10,
    fontFamily: Fonts.BOLD,
    fontSize: 15,
  },
  subTextStyle: {
    fontFamily: Fonts.BOLD,
    fontSize: 17,
  },
});
