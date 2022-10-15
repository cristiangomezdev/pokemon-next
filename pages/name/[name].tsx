import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { pokeApi } from '../../api';
import { Layout } from "../../components/layouts"
import { Pokemon, PokemonListResponse } from '../../interfaces';
import {Card, Grid,Text,Button,Container,Image} from '@nextui-org/react';
import { useEffect,useState } from 'react';

import confetti from 'canvas-confetti'
import { getPokemonInfo, localFavorites } from '../../utils';
interface Props {
  pokemon: Pokemon;
}
 
interface Params extends ParsedUrlQuery {
  name: string;
}

const PokemonByNamePage : NextPage<Props> = ({ pokemon }) => {
    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))
    const onToggleFavorite = () =>{
      localFavorites.toggleFavorite(pokemon.id)
      setIsInFavorites(!isInFavorites);
  
      if(isInFavorites)return
  
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x:1,y: 0 }
      });
    }
  
    return (
      <Layout>
        <Grid.Container css={{'marginTop':'5px'}} gap={2}>
           <Grid xs={12} sm={4}>
              <Card isHoverable css={{padding:'30px'}}>
                <Card.Body>
                  <Card.Image alt={pokemon.name} width="100%" height={200} src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}/>
                </Card.Body>
              </Card>
           </Grid>
           <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{display:'flex',justifyContent:'space-between'}}>
                <Text h1 transform='capitalize'>{pokemon.name}</Text>
                <Button onPress={onToggleFavorite} color="gradient" ghost={!isInFavorites}> {isInFavorites ? 'en Favoritos' : 'agregar a favoritos'}</Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}> Sprites:</Text>
                <Container direction='row' display='flex' gap={0}>
                    <Image 
                    src={pokemon.sprites.front_default} 
                    alt={pokemon.name}  
                    width={100}  
                    height={100} 
                    />
                    <Image 
                    src={pokemon.sprites.back_default} 
                    alt={pokemon.name}  
                    width={100}  
                    height={100} 
                    />
                    <Image 
                    src={pokemon.sprites.front_shiny} 
                    alt={pokemon.name}  
                    width={100}  
                    height={100} 
                    />
  
                  
                </Container>
              </Card.Body>
            </Card>
           </Grid>
        </Grid.Container>
      </Layout>
    );
  };

  export const getStaticPaths: GetStaticPaths<Params> = async (ctx) => {
    
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const paths= data.results.map((data)=>({
        params: { name: data.name },
      }))

   
    return {
      paths,
      fallback: 'blocking',
    };
  };
   
  export const getStaticProps: GetStaticProps = async ({
    params
  }) => {
    const { name } = params as {name:string};
    const pokemon = await getPokemonInfo(name);
   
     if(!pokemon){
       return {
         redirect:{
           destination:'/',
           permanent:false
         }
       }
     }
   

    return {
      props: {
        pokemon
      },
    };
  };
   
  export default PokemonByNamePage ;