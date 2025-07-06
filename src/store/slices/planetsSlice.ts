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


export const fetchPlanets = createAsyncThunk(
  'planets/fetchPlanets',
  async ({ page, search }: { page?: number; search?: string }, { rejectWithValue }) => {
    try {
      console.log('Fetching planets with page:', page, 'search:', search);
      const response = await planetsApi.getAll(page, search);
      console.log('Fetched planets response:', response.data);
      return {
        ...response.data,
        page: page || 1,
      };
    } catch (error: any) {
      console.error('Error fetching planets:', error as Error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchPlanetById = createAsyncThunk(
  'planets/fetchPlanetById',
  async (id: string, { rejectWithValue }) => {
    try {
      console.log('Fetching planet by ID:', id);
      const response = await planetsApi.getById(id);
      console.log('Fetched planet response:', response.data);
      if (Array.isArray(response.data)) {
  return {
    count: response.data.length,
    results: response.data,
    page: 1
  };
}
return response.data;
    } catch (error: any) {
      console.error('Error fetching planet by ID:', error as Error);
      return rejectWithValue((error as Error).message);
    }
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
      
      .addCase(fetchPlanets.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
        const results = action.payload.results || [];
        const newPlanets = results.filter(
          (newPlanet: any) => !state.items.some((existingPlanet: any) => existingPlanet.url === newPlanet.url)
        );
        state.items = [...state.items, ...newPlanets];
        state.pagination = {
          currentPage: action.payload.page,
          totalPages: Math.ceil((action.payload.count || 0) / 10),
          totalCount: action.payload.count || 0,
        };
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch planets';
      })
      
      .addCase(fetchPlanetById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPlanetById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentItem = action.payload;
      })
      .addCase(fetchPlanetById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch planet';
      });
  },
});

export const { setSearchQuery, clearCurrentPlanet, clearError } = planetsSlice.actions;
export default planetsSlice.reducer;
