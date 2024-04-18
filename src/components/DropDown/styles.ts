import { StyleSheet } from 'react-native';
import Fonts from '~/~/constants/fonts';
import Color from '~/~/constants/colors';

export const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  dropDownContainer: {
    height: 50,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    backgroundColor: Color.INUPT_BG,
    borderRadius: 10,
  },
  inputStyle: {
    height: 50,
    padding: 10,
    width: '100%',
    fontSize: 15,
    fontFamily: Fonts.REGULAR,
    borderRadius: 10,
  },
  placeholderStyle: {
    color: Color.GRAY,
  },
  labelStyle: {
    fontFamily: Fonts.MEDIUM,
    textAlign: 'left',
    color: Color.BLACK,
    fontSize: 15,
    marginBottom: 10,
  },
  errorStyle: {
    textTransform: 'capitalize',
    marginTop: 10,
    fontSize: 14,
  },
});
