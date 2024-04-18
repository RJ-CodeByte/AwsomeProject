import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import styles from './styles';
interface Props extends TextInputProps {}
const InputComponent = (props: Props) => {
  const { ...restProps } = props;
  return (
    <View>
      <TextInput style={styles.input} {...restProps} />
    </View>
  );
};
export default InputComponent;
