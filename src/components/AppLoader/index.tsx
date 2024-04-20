/*
  Reuseable Loader ui component with controls.
*/
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import styles from './styles';
import Color from '~/./constants/colors';

/* The code is defining a functional component called `AppLoader` using the `forwardRef` function from
React. */
export const AppLoader = forwardRef((_, ref) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  // to customize the ref values you can use below hook
  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    showLoader: () => {
      showLoader();
    },
    hideLoader: () => {
      hideLoader();
    },
  }));

  const showLoader = (): void => {
    setLoading(true);
  };

  const hideLoader = (): void => {
    setLoading(false);
  };

  return (
    <Modal
      animationType="fade"
      visible={isLoading}
      transparent
      statusBarTranslucent
    >
      <View style={styles.container}>
        <ActivityIndicator color={Color.PRIMARY} size="large" />
      </View>
    </Modal>
  );
});
