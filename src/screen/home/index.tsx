/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import CardItem from '~/components/CardItem';
import { GetPokemonApiAction, GetPokemonTypeApiAction, updateRes } from '~/service/apis/common/slice';
import { AppDispatch, RootStoreState, useAppDispatch, useAppSelector } from '~/store/store.hooks';
import { styles } from './styles';

const Home = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const pokemonRes = useAppSelector((state:RootStoreState)=>state.common.pokemonRes);
  const [page, setPage] = useState<number>(1)
  
  useEffect(() => {
    getAllPockemon(page);    
  }, []);
  useEffect(() => {
    if(page > 1){
      getAllPockemon(page);    
    } 
  }, [page]);

  

  const getAllPockemon = async (page: number) => {
    try {
    const res= await dispatch(GetPokemonApiAction(page));
     if(res.payload){
        const pokemons:Pokemon[] = res.payload;
        if (pokemons && pokemons?.length > 0) {
          // Create an array of promises for each API call
          const fetchPromises = pokemons?.map(async(pokemon: Pokemon,index: number) => {
            return getPokemonType(index + 1)
            .then(typeRes => ({ ...pokemon, type: typeRes }))
            .catch(error => {
              console.log('Error fetching Pokemon type:', error);
              return { ...pokemon, type: 'Unknown' }; // Handle error by providing a default type
            });
          });
          const detailsArray = await Promise.all(fetchPromises); // when all the apis call successfully then promise.all will add all the api response into single array 
          dispatch(updateRes.updatePockemonRes(detailsArray));
        }
     }
    //  console.log("pokemon",res.payload);
    } catch (error) {
      console.log('🚀 ~ getAllPockemon ~ error:', error);
    }
  }
  
  const getPokemonType = async (id:number) => {
  try {
      const res = await dispatch(GetPokemonTypeApiAction(id));
      const name: string | undefined= res.payload[0]?.type?.name ?? '';
      return name;
  } catch (e) {
      console.log('🚀 ~ getPokemonType ~ e:', e);
  }
}

const onEndHandler = () =>{
  setPage(page+1);
}

  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      numColumns={2}
        style={{flex: 1, backgroundColor: 'green'}}
        data={pokemonRes}
        renderItem={({item,index}) => <CardItem item={item} id={index+1}/>}
        onEndReached={onEndHandler}
      />
    </SafeAreaView>
  )
}

export default Home