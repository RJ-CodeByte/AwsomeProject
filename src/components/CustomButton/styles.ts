import { StyleSheet } from 'react-native';
import Color from '~/~/constants/colors';
import Fonts from '~/~/constants/fonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    fontWeight: '600',
    textAlign: 'center',
    color: Color.WHITE,
  },
  wrapperCustom: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: Color.PRIMARY,
  },
  arrowImgStyle: {
    height: 12,
    width: 12,
  },
  IconStyle: {
    position: 'absolute',
    right: 10,
  },titleIconContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
