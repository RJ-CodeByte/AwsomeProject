import {
  Image,
  SafeAreaView,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  GestureResponderEvent,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
interface Props {
  Icon: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onBackPress: (event: GestureResponderEvent) => void;
}
const CustomToolBar = (props: Props) => {
  const { Icon, iconStyle, onBackPress, containerStyle } = props;
  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.touchableContainer} onPress={onBackPress}>
        <Image source={Icon} style={[iconStyle]} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomToolBar;
