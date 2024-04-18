import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import Assets from '~/~/constants/assets';
import { styles } from './styles';
interface TitleBarProps {
  title: string;
  subtitle?: string;
  showImg?: boolean;
  subTitleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  imgStyle?: StyleProp<ImageStyle>;
}

const TitleBar = (props: TitleBarProps) => {
  const { title, subtitle, subTitleStyle, containerStyle, showImg, imgStyle } =
    props;
  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {showImg && (
          <Image
            style={[styles.imgStyle, imgStyle]}
            source={Assets.SUBSCRIPTION}
          />
        )}
        <Text style={styles.txtStyle}>{title}</Text>
        {subtitle !== undefined ? (
          <Text style={[styles.subTxtStyle, subTitleStyle]}>{subtitle}</Text>
        ) : null}
      </View>
    </>
  );
};

export default TitleBar;
