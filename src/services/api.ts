import axios from 'axios';
import type { ApiResponse, Character, Planet, Starship, Film } from '../types';

const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Handle potential SSL issues in development
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

// Helper function to extract ID from URL
export const extractIdFromUrl = (url: string): string => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : '1';
};

// Characters API
export const charactersApi = {
  getAll: (page: number = 1, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search) {
      params.append('search', search);
    }
    return api.get<ApiResponse<Character>>(`/people/?${params.toString()}`);
  },
  
  getById: (id: string) => {
    return api.get<Character>(`/people/${id}/`);
  },
};

// Planets API
export const planetsApi = {
  getAll: (page: number = 1, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search) {
      params.append('search', search);
    }
    return api.get<ApiResponse<Planet>>(`/planets/?${params.toString()}`);
  },
  
  getById: (id: string) => {
    return api.get<Planet>(`/planets/${id}/`);
  },
};

// Starships API
export const starshipsApi = {
  getAll: (page: number = 1, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search) {
      params.append('search', search);
    }
    return api.get<ApiResponse<Starship>>(`/starships/?${params.toString()}`);
  },
  
  getById: (id: string) => {
    return api.get<Starship>(`/starships/${id}/`);
  },
};

// Films API
export const filmsApi = {
  getAll: () => {
    return api.get<ApiResponse<Film>>('/films/');
  },
  
  getById: (id: string) => {
    return api.get<Film>(`/films/${id}/`);
  },
};

export default api;
