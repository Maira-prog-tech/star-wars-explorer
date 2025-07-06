import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Film } from '../../types';
import { filmsApi } from '../../services/api';

interface FilmsState {
  films: Film[];
  items: Film[];
  currentFilm: Film | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FilmsState = {
  films: [],
  items: [],
  currentFilm: null,
  status: 'idle',
  error: null,
};


export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async (arg: { page?: number; search?: string }, { rejectWithValue }) => {
    const { page, search } = arg;
    try {
      console.log('Fetching films with page:', page, 'search:', search);
      const response = await filmsApi.getAll(page, search);
      console.log('Fetched films response:', response.data);
      return Array.isArray(response.data)
        ? { results: response.data }
        : response.data;
    } catch (error: unknown) {
      console.error('Error fetching films:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(String(error));
      }
    }
  }
);

export const fetchFilmById = createAsyncThunk(
  'films/fetchFilmById',
  async (id: string, { rejectWithValue }) => {
    try {
      console.log('Fetching film by ID:', id);
      const response = await filmsApi.getById(id);
      console.log('Fetched film response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Error fetching film by ID:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(String(error));
      }
    }
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearCurrentFilm: (state) => {
      state.currentFilm = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.films = action.payload.results;
        state.items = action.payload.results;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
     
      .addCase(fetchFilmById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentFilm = action.payload;
      })
      .addCase(fetchFilmById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentFilm, clearError } = filmsSlice.actions;
export default filmsSlice.reducer;
