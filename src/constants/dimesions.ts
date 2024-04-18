import { Dimensions } from 'react-native';
//Static and Dynamic Caluclated Dimension should be added here
const Dims = {
  WIDTH: Dimensions.get('screen').width,
  HEIGHT: Dimensions.get('screen').height,
};

export default Dims;
