
export interface PokemonListResponse{
    count: number;
    next?:string;
    previus?:string;
    results:SmallPokemon[];
}


export interface SmallPokemon {
    name:string;
    url:string;
    id:number;
    img:string;
}