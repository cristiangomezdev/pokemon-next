import { Link,Spacer, Text, useTheme,Image } from "@nextui-org/react"
import NextLink from 'next/link';

export const Navbar = () => {
    const {theme} = useTheme()
  return (
    <div style={{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'start',
        padding:' 0px 20px',
        //backgroundColor: theme?.colors.gray900.value
    }}>
        <Image
          alt="icono aplicacion"
          width={100}
          height={100}
          src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png'}
          />
        
        <NextLink href="/" passHref>
          <Link>        
            <Text color='white' h2>P</Text>
            <Text h3>okemon</Text>
          </Link>
        </NextLink>

        <Spacer css={{flex:1}}/>
        <NextLink href="/favorites" passHref>
          <Link>        
            <Text h3>Favoritos</Text>
          </Link>
        </NextLink>
        
    </div>
  )
}
