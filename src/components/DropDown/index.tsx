import { Text, View, Image } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import Assets from '~/./constants/assets';
import { errorMessage } from '~/InputComponent';

export interface DropDownData {
  label: string;
  value: string;
}

interface DropDownProps {
  label: any;
  placeholder: any;
  error?: any;
  data: DropDownData[] | undefined;
  mainContainerStyle?: any;
  inputWithIconStyle?: any;
  onChangeSelection: any;
  value: any;
}

const DropDown = (props: DropDownProps) => {
  const {
    label,
    placeholder,
    error,
    data = [],
    mainContainerStyle,
    inputWithIconStyle,
    onChangeSelection,
    value,
  } = props;


  return (
    <View style={[styles.mainView, mainContainerStyle]}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={[styles.dropDownContainer, inputWithIconStyle]}>
        <Dropdown
          style={[styles.inputStyle]}
          renderRightIcon={() => (
            <Image
              source={Assets.DOWN_ARROW}
              style={{
                height: 12,
                width: 12,
              }}
            />
          )}
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          placeholderStyle={styles.placeholderStyle}
          value={value}
          autoScroll={false}
          onChange={(item) => onChangeSelection(item.value)}
        />
      </View>
      {error != undefined && errorMessage(error)}
    </View>
  );
};

export default DropDown;
