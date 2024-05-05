import React from 'react';
import PokemonImage from '../PokemonImage';

interface ICardProps {
  item: Pokemon;
  id:number;
}

const typeColors = {
  grass: '#78C850',
  fire: '#F08030',
  water: '#6890F0',
  bug: '#A8B820',
};
const CardItem = (props:ICardProps) => {
  const {item: title,id}= props;

  
  const backgroundColor = typeColors[title.type] || '#A8A878'; 
  return (
    <PokemonImage name={title.name} id={id} color={backgroundColor}/>
  )
}

export default CardItem;


