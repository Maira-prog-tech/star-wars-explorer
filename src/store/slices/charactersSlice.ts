import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { CharactersState } from '../../types';
import { charactersApi } from '../../services/api';

const initialState: CharactersState = {
  items: [],
  currentItem: null,
  status: 'idle',
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  },
  search: {
    query: '',
    results: [],
  },
};

// Async thunks
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async ({ page, search }: { page?: number; search?: string }) => {
    const response = await charactersApi.getAll(page, search);
    return {
      data: response.data,
      page: page || 1,
    };
  }
);

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (id: string) => {
    const response = await charactersApi.getById(id);
    return response.data;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },
    clearCurrentCharacter: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch characters
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'success';
        // Добавляем новые персонажи к существующим
        const newCharacters = action.payload.data.results.filter(
          (newChar: any) => !state.items.some((existingChar: any) => existingChar.url === newChar.url)
        );
        state.items = [...state.items, ...newCharacters];
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: Math.ceil(action.payload.data.count / 10),
          totalCount: action.payload.data.count,
        };
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch characters';
      })
      // Fetch character by ID
      .addCase(fetchCharacterById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.status = 'success';
        state.currentItem = action.payload;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch character';
      });
  },
});

export const { setSearchQuery, clearCurrentCharacter, clearError } = charactersSlice.actions;
export default charactersSlice.reducer;
