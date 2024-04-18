import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Platform.OS === 'ios' ? 50 : 40,
  },
});
