import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { StarshipsState, Starship } from '../../types';
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

export const fetchStarships = createAsyncThunk(
  'starships/fetchStarships',
  async ({ page, search }: { page?: number; search?: string }, { rejectWithValue }) => {
    try {
      console.log('Fetching starships with page:', page, 'search:', search);
      const response = await starshipsApi.getAll(page, search);
      console.log('Fetched starships response:', response.data);
      return {
        ...response.data,
        page: page || 1,
      };
    } catch (error: any) {
      console.error('Error fetching starships:', error as Error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchStarshipById = createAsyncThunk<Starship, string, { rejectValue: string }>(
  'starships/fetchStarshipById',
  async (id: string, { rejectWithValue }) => {
    try {
      console.log('Fetching starship by ID:', id);
      const response = await starshipsApi.getById(id);
      console.log('Fetched starship response:', response.data);
      if (Array.isArray(response.data)) {
  return response.data[0];
}
return response.data;
    } catch (error: any) {
      console.error('Error fetching starship by ID:', error as Error);
      return rejectWithValue((error as Error).message);
    }
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
      .addCase(fetchStarships.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStarships.fulfilled, (state, action) => {
        state.status = 'succeeded';
     
        const results = action.payload.results || [];
        const newStarships = results.filter(
          (newStarship: any) => !state.items.some((existingStarship: any) => existingStarship.url === newStarship.url)
        );
        state.items = [...state.items, ...newStarships];
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: Math.ceil((action.payload.count || 0) / 10),
          totalCount: action.payload.count || 0,
        };
      })
      .addCase(fetchStarships.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch starships';
      })
      .addCase(fetchStarshipById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStarshipById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentItem = action.payload;
      })
      .addCase(fetchStarshipById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch starship';
      });
  },
});

export const { setSearchQuery, clearCurrentStarship, clearError } = starshipsSlice.actions;
export default starshipsSlice.reducer;
