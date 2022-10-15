

import { Card, Grid } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon/FavoritePokemons';


export default function Favorites() {
  const [favoritePokemons,setFavoritePokemons] = useState<number[]>([]);

useEffect(() => {
  setFavoritePokemons(localFavorites.pokemons())
}, [])


  return (
    <Layout>

    {
      favoritePokemons.length === 0
       ? (<NoFavorites />)
       :(<FavoritePokemons pokemons={favoritePokemons} />)
    }

      <NoFavorites/>

    </Layout>
  )
}
