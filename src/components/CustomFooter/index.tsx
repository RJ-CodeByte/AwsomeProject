import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import { styles } from './styles';

interface FooterProps {
  title: string;
  boldTitle: string;
  onBoldTitlePress: (event: GestureResponderEvent) => void;
}

const CustomFooter = (props: FooterProps) => {
  const { title, boldTitle, onBoldTitlePress } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{title}</Text>
      <TouchableOpacity onPress={onBoldTitlePress}>
        <Text style={styles.text2}>{boldTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFooter;
