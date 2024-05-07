import React from 'react';
import PokemonImage from '../PokemonImage';
import { POKEMON_TYPE_COLORS } from '~/constants/colors';

interface ICardProps {
  item: Pokemon;
  id:number;
}


const CardItem = (props:ICardProps) => {
  const {item: title,id}= props;
  const backgroundColor:string = POKEMON_TYPE_COLORS[title.type] || '#A8A878'; 
  return (
    <PokemonImage name={title.name} id={id} color={backgroundColor}/>
  )
}

export default CardItem;


