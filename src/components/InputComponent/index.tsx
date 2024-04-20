import React, { useState } from 'react';
import {
  Image,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import Assets from '~/./constants/assets';
import Language, { errorMsg } from '~/./constants/language';
import { FieldError } from 'react-hook-form';
import Color from '~/./constants/colors';
interface Props {
  mainContainerStyle?: StyleProp<ViewStyle>;
  label: string;
  secureTextEntry?: boolean;
  optional?: string;
  error?: FieldError;
  isInput?: boolean;
  txtValue?: string;
  txtPlaceholder?: string;
  onTouchPress?: () => void;
  onPressRight?: () => void;
}

export const errorMessage = (errors: {
  type: string;
  message: string;
  ref: any;
}) => {
  if (errors) {
      return <Text style={styles.error}>{errors?.message}</Text>;
  }
};



const InputComponent = (props: Props) => {
  const {
    secureTextEntry = false,
    onPressRight,
    label,
    mainContainerStyle,
    optional,
    error,
    isInput = true,
    txtValue,
    txtPlaceholder,
    onTouchPress,
    ...restProps
  } = props;
  const [secureTxtEntry, setSecureTextEntry] = useState(secureTextEntry);
  const onIconPress = () => {
    setSecureTextEntry(!secureTxtEntry);
  };

  return (
    <View style={[ mainContainerStyle]}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.labelStyle}>{label}</Text>
        {optional !== '' && optional !== undefined && (
          <Text style={styles.labelOptionStyle}>{optional}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        {isInput ? (
          <>
          <TextInput
            style={[styles.input, secureTextEntry ? { width: '90%' } : {}]}
            secureTextEntry={secureTxtEntry}
            {...restProps}
          />
      
          </>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.touchInput]}
            {...restProps}
            onPress={onTouchPress}
          >
            <Text
              style={[
                // txtInputStyle,
                styles.txtStyle,
                txtValue === '' || txtValue == undefined
                  ? { color: Color.GRAY }
                  : {},
              ]}
            >
              {txtValue !== '' && txtValue !== undefined
                ? txtValue
                : txtPlaceholder}
            </Text>
          </TouchableOpacity>
        )}
        {secureTextEntry && (
          <TouchableOpacity style={styles.eyeIconStyle} onPress={onIconPress}>
            <Image
              source={secureTxtEntry ? Assets.EYEINVISIBLE : Assets.EYEVISIBLE}
              resizeMode="contain"
              style={[styles.eyeImgStyle]}
            />
          </TouchableOpacity>
        )}
        
      </View>
      {error != undefined && errorMessage(error)}
     
    </View>
  );
};
export default InputComponent;
