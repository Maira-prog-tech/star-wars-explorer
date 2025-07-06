import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { StarshipsState } from '../../types';
import { starshipsApi } from '../../services/api';

const initialState: StarshipsState = {
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
export const fetchStarships = createAsyncThunk(
  'starships/fetchStarships',
  async ({ page, search }: { page?: number; search?: string }) => {
    const response = await starshipsApi.getAll(page, search);
    return {
      data: response.data,
      page: page || 1,
    };
  }
);

export const fetchStarshipById = createAsyncThunk(
  'starships/fetchStarshipById',
  async (id: string) => {
    const response = await starshipsApi.getById(id);
    return response.data;
  }
);

const starshipsSlice = createSlice({
  name: 'starships',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },
    clearCurrentStarship: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch starships
      .addCase(fetchStarships.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.status = 'success';
        // Добавляем новые звездолеты к существующим
        const newStarships = action.payload.data.results.filter(
          (newStarship: any) => !state.items.some((existingStarship: any) => existingStarship.url === newStarship.url)
        );
        state.items = [...state.items, ...newStarships];
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: Math.ceil(action.payload.data.count / 10),
          totalCount: action.payload.data.count,
        };
      })
      .addCase(fetchStarships.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch starships';
      })
      // Fetch starship by ID
      .addCase(fetchStarshipById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStarshipById.fulfilled, (state, action) => {
        state.status = 'success';
        state.currentItem = action.payload;
      })
      .addCase(fetchStarshipById.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch starship';
      });
  },
});

export const { setSearchQuery, clearCurrentStarship, clearError } = starshipsSlice.actions;
export default starshipsSlice.reducer;
