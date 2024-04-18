import {
  Image,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import Assets from '~/~/constants/assets';
import Color from '~/~/constants/colors';
interface Props extends TouchableOpacityProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  showIcon?: boolean;
  disabled?: boolean;
  btnStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}
const CustomButton = (props: Props) => {
  const {
    containerStyle,
    title,
    showIcon = false,
    btnStyle,
    titleStyle,
    disabled,
    onPress,
    ...restProps
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        {...restProps}
        style={[
          styles.wrapperCustom,
          btnStyle,
          disabled ? { backgroundColor: Color.LIGHT_PRIMARY } : {},
        ]}
      >
        <View
          style={styles.titleIconContainer}
        >
          <Text style={[styles.text, titleStyle]}>{title}</Text>
          {showIcon && (
            <>
              <TouchableOpacity style={styles.IconStyle} onPress={onPress}>
                <Image
                  source={Assets.RIGHTARROW}
                  resizeMode="contain"
                  style={[styles.arrowImgStyle]}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
