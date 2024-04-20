import { StyleSheet } from 'react-native';
import Fonts from '~/./constants/fonts';
import Color from '~/./constants/colors';

const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: Fonts.MEDIUM,
    textAlign: 'left',
    color: Color.BLACK,
    fontSize: 15,
    marginBottom: 10,
  },

  labelOptionStyle: {
    fontFamily: Fonts.BOLD,
    textAlign: 'left',
    color: Color.GRAY,
    fontSize: 15,
    marginBottom: 10,
  },
  inputContainer: {
    height: 50,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    backgroundColor: Color.INUPT_BG,
    borderRadius: 10,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    fontSize: 15,
    paddingLeft: 10,
  },
  touchInput: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  txtStyle: {
    fontFamily: Fonts.REGULAR,
    fontSize: 15,
  },
  eyeIconStyle: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 3,
  },
  eyeImgStyle: { height: 18, width: 18 },
  error: {
    fontSize: 15,
    color: Color.RED,
  },
});
export default styles;
