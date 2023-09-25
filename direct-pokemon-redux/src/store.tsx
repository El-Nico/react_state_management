import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createSlice,
  configureStore,
  type PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";

export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

//create a redux based api to query the pokemon file
const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getPokemon: builder.query<Pokemon[], undefined>({
      query: () => "pokemon.json",
    }),
  }),
});

//selector to reference the query action from app tsx
export const usePokemonQuery = pokemonApi.endpoints.getPokemon.useQuery;

//create a slice of state
const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export const store = configureStore({
  // register each slice into the overall store
  reducer: {
    search: searchSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  //WHY MUST I ADD THIS MIDDLE WARE?
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

//selector to reference the current value for search
export const selectSearch = (state: RootState) => state.search.search;

//initiate the fetch of pokemon json
store.dispatch(pokemonApi.endpoints.getPokemon.initiate(undefined));

//on store update
//selector listens for state change on get pokemon as well as search
// than perofoms
//usememo calculations on it before passing it on to app tsx
export const selectPokemon = createSelector(
  (state: RootState) =>
    pokemonApi.endpoints.getPokemon.select(undefined)(state)?.data,
  (state: RootState) => state.search.search,
  (pokemon, search) =>
    (pokemon || [])
      .filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 10)
      .sort((a, b) => a.name.localeCompare(b.name))
);
