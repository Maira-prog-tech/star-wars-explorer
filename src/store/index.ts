import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';
import planetsReducer from './slices/planetsSlice';
import starshipsReducer from './slices/starshipsSlice';
import filmsReducer from './slices/filmsSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    planets: planetsReducer,
    starships: starshipsReducer,
    films: filmsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
