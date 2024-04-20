import { View, Text, Image } from 'react-native'
import React from 'react'
import Color from '~/constants/colors';
import Network from '~/constants/network';
import { styles } from './styles';

interface PokemonImageProps{
    name:string;
    id:string;
    color:string
}

const PokemonImage = (props:PokemonImageProps) => {
    const {name,id,color} = props
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text>{name}</Text>
      <Image
        source={{uri: `${Network.imgeUrl}${id}.png`}}
        style={styles.imgStyle}
      />
    </View>
  )
}

export default PokemonImage;