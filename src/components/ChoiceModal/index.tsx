import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Language from '~/~/constants/language';
import Color from '~/~/constants/colors';
import {
  captureImageFromCamera,
  selectImageFromGallery,
} from '~/~/utils/commonUtils';
import { FileType } from '~/~/types/signup';

interface BottomSheetProps {
  isVisible: boolean;
  onClosePress: () => void;
  onCamPress: (image: FileType[]) => void;
  onGallery: (image: FileType[]) => void;
}

const BottomSheet = (props: BottomSheetProps) => {
  const { isVisible = false, onClosePress, onCamPress, onGallery } = props;

  const onGalleryPress = async () => {
    const imageList = await selectImageFromGallery({
      selectionLimit: 1,
      mediaType: 'photo',
    });
    onGallery(imageList);
  };

  const onCameraPress = async () => {
    const imageList = await captureImageFromCamera({
      selectionLimit: 1,
      mediaType: 'photo',
    });
    onCamPress(imageList);
    console.log('🚀 ~ onCameraPress ~ imageList:', imageList);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClosePress}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onClosePress}
      >
        <View style={styles.modalSubContainer}>
          <TouchableOpacity style={styles.btnLineStyle} onPress={onClosePress}>
            <View style={styles.lineStyle} />
          </TouchableOpacity>
          <View style={styles.bottomLineStyle} />
          <TouchableOpacity style={styles.btnStyle} onPress={onCameraPress}>
            <Text style={styles.txtStyle}>{Language.TakeSelfie}</Text>
          </TouchableOpacity>
          <View style={styles.bottomLineStyle} />
          <TouchableOpacity style={styles.btnStyle} onPress={onGalleryPress}>
            <Text style={styles.txtStyle}>{Language.ChooseFromLibrary}</Text>
          </TouchableOpacity>
          <View style={styles.bottomLineStyle} />
          <TouchableOpacity style={[styles.btnStyle]} onPress={onClosePress}>
            <Text style={[styles.txtStyle, { color: Color.PRIMARY }]}>
              {Language.Close}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomSheet;
