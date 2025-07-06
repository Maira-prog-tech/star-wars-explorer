import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { FilmsState } from '../../types';
import { filmsApi } from '../../services/api';

const initialState: FilmsState = {
  items: [],
  currentItem: null,
  status: 'idle',
  error: null,
};

// Async thunks
export const fetchFilms = createAsyncThunk(
  'films/fetchFilms',
  async () => {
    try {
      console.log('fetchFilms: Making API call');
      const response = await filmsApi.getAll();
      console.log('fetchFilms: API response:', response.data);
      return response.data.results;
    } catch (error) {
      console.error('fetchFilms: API error:', error);
      throw error;
    }
  }
);

export const fetchFilmById = createAsyncThunk(
  'films/fetchFilmById',
  async (id: string) => {
    const response = await filmsApi.getById(id);
    return response.data;
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    clearCurrentFilm: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch films
      .addCase(fetchFilms.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch films';
      })
      // Fetch film by ID
      .addCase(fetchFilmById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFilmById.fulfilled, (state, action) => {
        state.status = 'success';
        state.currentItem = action.payload;
      })
      .addCase(fetchFilmById.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch film';
      });
  },
});

export const { clearCurrentFilm, clearError } = filmsSlice.actions;
export default filmsSlice.reducer;
