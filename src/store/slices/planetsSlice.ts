import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { PlanetsState } from '../../types';
import { planetsApi } from '../../services/api';

const initialState: PlanetsState = {
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
export const fetchPlanets = createAsyncThunk(
  'planets/fetchPlanets',
  async ({ page, search }: { page?: number; search?: string }) => {
    const response = await planetsApi.getAll(page, search);
    return {
      data: response.data,
      page: page || 1,
    };
  }
);

export const fetchPlanetById = createAsyncThunk(
  'planets/fetchPlanetById',
  async (id: string) => {
    const response = await planetsApi.getById(id);
    return response.data;
  }
);

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search.query = action.payload;
    },
    clearCurrentPlanet: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch planets
      .addCase(fetchPlanets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.status = 'success';
        // Добавляем новые планеты к существующим
        const newPlanets = action.payload.data.results.filter(
          (newPlanet: any) => !state.items.some((existingPlanet: any) => existingPlanet.url === newPlanet.url)
        );
        state.items = [...state.items, ...newPlanets];
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: Math.ceil(action.payload.data.count / 10),
          totalCount: action.payload.data.count,
        };
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch planets';
      })
      // Fetch planet by ID
      .addCase(fetchPlanetById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPlanetById.fulfilled, (state, action) => {
        state.status = 'success';
        state.currentItem = action.payload;
      })
      .addCase(fetchPlanetById.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Failed to fetch planet';
      });
  },
});

export const { setSearchQuery, clearCurrentPlanet, clearError } = planetsSlice.actions;
export default planetsSlice.reducer;
