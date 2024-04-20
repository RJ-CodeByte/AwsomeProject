import { Platform, StyleSheet } from 'react-native';
import Fonts from '~/./constants/fonts';
import Color from '~/./constants/colors';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Color.SHADOW,
  },
  modalSubContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Color.WHITE,
    width: '100%',
    height: Platform.OS == 'ios' ? '25%' : '30%',
  },
  btnStyle: {
    padding: 15,
  },
  bottomLineStyle: {
    borderBottomColor: Color.LINESHADOW,
    borderBottomWidth: 1,
  },
  btnLineStyle: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  lineStyle: {
    borderColor: Color.LINESHADOW,
    marginTop: 5,
    borderRadius: 2,
    width: '10%',
    borderWidth: 2,
    marginBottom: 10,
  },
  txtStyle: {
    fontFamily: Fonts.SEMI_BOLD,
    color: Color.BLACK,
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 20,
  },
});
