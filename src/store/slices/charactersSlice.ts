import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { CharactersState, Character } from '../../types';
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

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async ({ page, search }: { page?: number; search?: string }, { rejectWithValue }) => {
    try {
      console.log('Fetching characters with page:', page, 'search:', search);
      const response = await charactersApi.getAll(page, search);
      console.log('Fetched characters response:', response.data);
      return {
        ...response.data,
        page: page || 1,
      };
    } catch (error: unknown) {
      console.error('Error fetching characters:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(String(error));
      }
    }
  }
);

export const fetchCharacterById = createAsyncThunk<Character, string, { rejectValue: string }>(
  'characters/fetchCharacterById',
  async (id: string, { rejectWithValue }) => {
    try {
      console.log('Fetching character by ID:', id);
      const response = await charactersApi.getById(id);
      console.log('Fetched character response:', response.data);
      if (Array.isArray(response.data)) {
  return response.data[0];
}
return response.data;
    } catch (error: unknown) {
      console.error('Error fetching character by ID:', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(String(error));
      }
    }
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
      
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const results = action.payload.results || [];
        const newCharacters = results.filter((newChar: Character) => !state.items.some((existingChar: Character) => existingChar.url === newChar.url));
        state.items = [...state.items, ...newCharacters];
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: Math.ceil((action.payload.count || 0) / 10),
          totalCount: action.payload.count || 0,
        };
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch characters';
      })
      
      .addCase(fetchCharacterById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentItem = action.payload;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch character';
      });
  },
});

export const { setSearchQuery, clearCurrentCharacter, clearError } = charactersSlice.actions;
export default charactersSlice.reducer;
