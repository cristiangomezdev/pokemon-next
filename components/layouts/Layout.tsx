import Head from "next/head"
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Navbar } from "../ui";

interface Props{
  children?:ReactNode | undefined,
  title?:string
}

const origin = (typeof window ==='undefined' ? '' : window.location.origin)

export const Layout: FC<Props> = ({children,title}) => {
  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App'}</title>
            <meta name="author" content="cristian gomez" />
            <meta name="description" content={`Pokemon information about ${title}`} />
            <meta name="keywords" content={`${title}, pokedex, pokemon`}/>
            <meta property="og:title" content={`Informacion sobre el pokemon ${title}`} />
<meta property="og:description" content={`pagina sobre ${title}`} />
<meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>
      <Navbar/>
        <main style={{padding:'0px 20px'}}>
            {children}
        </main>
    </>
  )
}
