import React, { useEffect, useMemo } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import CardItem from '~/components/CardItem';
import { GetPokemonApiAction, GetPokemonTypeApiAction } from '~/service/apis/common/slice';
import {AppDispatch, RootStoreState, useAppDispatch, useAppSelector} from '~/store/store.hooks';
import { styles } from './styles';

const Home = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const pokemonRes = useAppSelector((state:RootStoreState)=>state.common.pokemonRes)

  
  useEffect(() => {
    getAllPockemon();    
  }, []);

  const getAllPockemon = async () => {
    try {
      await dispatch(GetPokemonApiAction());

    } catch (error) {
      console.log('🚀 ~ getAllPockemon ~ error:', error);
    }
  }
 
  
  useEffect(() => {
    if(pokemonRes?.length>0){
      pokemonRes?.map((obj,index)=>getPokemonType(index))
    }
  }, [pokemonRes]);

  const getPokemonType = async (id:number) => {
  try {
      await dispatch(GetPokemonTypeApiAction(id));
  } catch (e) {
      console.log('🚀 ~ getPokemonType ~ e:', e);
    
  }
}



  
// const pokemon = useMemo(()=>{
//   if(PokemonType?.length>0){
//     pokemonRes?.map((obj)=>)PokemonType?.map((obj)=>({
      
//       type:obj?.type?.name,
//       name:title?.name,
//       id: id,
//       color:
//     }))
//   }
// },[pokemonRes,PokemonType]);




  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      numColumns={2}
        style={{flex: 1, backgroundColor: 'green'}}
        data={pokemonRes}
        renderItem={({item,index}) => <CardItem item={item} id={index+1}/>}
      />
      {/* <Text>Hello world</Text> */}
    </SafeAreaView>
  )
}

export default Home