import { StyleSheet } from 'react-native';
import Color from '~/~/constants/colors';
import Fonts from '~/~/constants/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  closeImgStyle: {
    height: 16,
    width: 16,
  },
  formContainer: {
    flex: 1,
  },
  btnContainerStyle: { marginBottom: 20 },
  inputContainerStyle: {
    marginBottom: 30,
  },
  forgotPasswordTxt: {
    textAlign: 'right',
    fontFamily: Fonts.REGULAR,
    fontSize: 15,
    marginTop: 10,
  },
  error: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 18,
    marginVertical: 8,
  },
});
export default styles;
