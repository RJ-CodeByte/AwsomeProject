/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import CardItem from '~/components/CardItem';
import { GetPokemonApiAction, GetPokemonTypeApiAction, updateRes } from '~/service/apis/common/slice';
import { AppDispatch, RootStoreState, useAppDispatch, useAppSelector } from '~/store/store.hooks';
import { styles } from './styles';

const Home = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const pokemonRes = useAppSelector((state:RootStoreState)=>state.common.pokemonRes);
  
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
    const fetchDetailsForPokemon = async () => {
      if (pokemonRes?.length > 0) {
        // Create an array of promises for each API call
        const fetchPromises = pokemonRes.map(async(pokemon,index) => {
          const res=await getPokemonType(index+1);
          return {
            ...pokemon,
            type: res,
          };
        });
        const detailsArray = await Promise.all(fetchPromises); // when all the apis call successfully then promise.all will add all the api response into single array 
        dispatch(updateRes.updatePockemonRes(detailsArray));
      }
    };
    fetchDetailsForPokemon();
  }, [dispatch,pokemonRes]);

  
  
  const getPokemonType = async (id:number) => {
  try {
      const res = await dispatch(GetPokemonTypeApiAction(id));
      const arr= res.payload[0]?.type?.name;
      return arr;
  } catch (e) {
      console.log('🚀 ~ getPokemonType ~ e:', e);
  }
}



  




  
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