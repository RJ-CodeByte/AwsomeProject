import * as React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './styles';
import Assets from '~/./constants/assets';
import Color from '~/./constants/colors';

interface RadioButtonProps {
  options: object[];
  btnValue: number;
  onPress: (item: number) => void;
  moreContainerStyle?: StyleProp<ViewStyle>;
  radioBtnContainerStyle?: StyleProp<ViewStyle>;
  radioBtnStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
}

const RadioButton = (props: RadioButtonProps) => {
  const {
    btnValue = 0,
    options,
    onPress,
    moreContainerStyle,
    radioBtnContainerStyle,
    radioBtnStyle,
    titleStyle,
    subTitleStyle,
  } = props;

  return (
    <>
      <View style={moreContainerStyle}>
        {options?.map((item: any, index: number) => (
          <View style={styles.mainContainer} key={index}>
            <TouchableOpacity
              style={[
                styles.radioContainer,
                radioBtnContainerStyle,
                btnValue == item?.id
                  ? {
                      borderColor: Color.PRIMARY,
                      borderWidth: 1,
                      backgroundColor: Color.LIGHT_ORANGE,
                    }
                  : {},
              ]}
              activeOpacity={1}
              onPress={() => {
                onPress(item.id);
              }}
            >
              {btnValue == item?.id && btnValue == 1 ? (
                <Image
                  style={[styles.premiumButton, radioBtnStyle]}
                  source={Assets.PREMIUM_PLAN}
                />
              ) : null}
              <View style={styles.radioContainer2}>
                <Image
                  style={[styles.radioButton, radioBtnStyle]}
                  source={
                    btnValue == item?.id
                      ? Assets.CIRCLE_CHECK_SELCTED
                      : Assets.CIRCLE_CHECK
                  }
                />
                <Text style={[styles.textStyle, titleStyle]}>{item?.text}</Text>
              </View>
              <Text style={[styles.subTextStyle, subTitleStyle]}>
                {item?.subtext}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
};

export default RadioButton;
