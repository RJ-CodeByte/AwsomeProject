import { StyleSheet } from 'react-native';
import Color from '~/./constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
    paddingHorizontal: 20,
  },
  closeImgStyle: {
    height: 16,
    width: 16,
  },
  formContainer: {
    flex: 1,
  },
  btnContainerStyle: { marginBottom: 30 },
  inputContainerStyle: {
    marginVertical: 30,
  },
  error: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 18,
    marginVertical: 8,
  },
});
export default styles;
