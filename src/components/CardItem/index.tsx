import { View, Text, Image } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { styles } from './styles';
import Network from '~/constants/network';
import { AppDispatch, RootStoreState, useAppDispatch, useAppSelector } from '~/store/store.hooks';
import { GetPokemonTypeApiAction } from '~/service/apis/common/slice';
import Color from '~/constants/colors';
import PokemonImage from '../PokemonImage';

interface ICardProps {
  item: Pokemon;
  id:number;
}

const CardItem = (props:ICardProps) => {
  const {item: title,id}= props;
  // const dispatch: AppDispatch = useAppDispatch();
  const PokemonType = useAppSelector(
    (state: RootStoreState) => state.common.pokemonType);
  
    

  
  // const backgroundColor = pokemonColors['fire'];
  // console.log("🚀 ~ CardItem ~ backgroundColor:",pokemon)
  return (
    
    <PokemonImage name={title.name} id={id} color='#FFF'/>
  )
}

export default CardItem;


