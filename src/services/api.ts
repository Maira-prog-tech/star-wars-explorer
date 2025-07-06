import axios from 'axios';
import type { ApiResponse, Character, Planet, Starship, Film } from '../types';

const BASE_URL = 'https://corsproxy.io/?https://swapi.py4e.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => {
    console.log('API Success:', response.config.url, response.status);
    return response;
  },
  error => {
    console.error('API Error Details:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const extractIdFromUrl = (url: string): string => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : '1';
};

export const charactersApi = {
  getAll: (page: number = 1, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    
    console.log('Fetching characters:', `/people/?${params.toString()}`);
    return api.get<ApiResponse<Character>>(`/people/?${params.toString()}`).catch(error => { console.error('Error in characters getAll', error); throw error; });
  },
  getById: (id: string) => {
    console.log('Fetching character by id:', `/people/${id}/`);
    return api.get<Character>(`/people/${id}/`).catch(error => { console.error('Error in characters getById', error); throw error; });
  },
};

export const planetsApi = {
  getAll: (page: number = 1, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    
    console.log('Fetching planets:', `/planets/?${params.toString()}`);
    return api.get<ApiResponse<Planet>>(`/planets/?${params.toString()}`).catch(error => { console.error('Error in planets getAll', error); throw error; });
  },
  getById: (id: string) => {
    console.log('Fetching planet by id:', `/planets/${id}/`);
    return api.get<Planet>(`/planets/${id}/`).catch(error => { console.error('Error in planets getById', error); throw error; });
  },
};

export const starshipsApi = {
  getAll: (page: number = 1, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    
    console.log('Fetching starships:', `/starships/?${params.toString()}`);
    return api.get<ApiResponse<Starship>>(`/starships/?${params.toString()}`).catch(error => { console.error('Error in starships getAll', error); throw error; });
  },
  getById: (id: string) => {
    console.log('Fetching starship by id:', `/starships/${id}/`);
    return api.get<Starship>(`/starships/${id}/`).catch(error => { console.error('Error in starships getById', error); throw error; });
  },
};

export const filmsApi = {
  getAll: (page: number = 1, search?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    console.log('Fetching films:', `/films/?${params.toString()}`);
    return api.get<ApiResponse<Film>>(`/films/?${params.toString()}`).catch(error => { console.error('Error in films getAll', error); throw error; });
  },
  getById: (id: string) => {
    console.log('Fetching film by id:', `/films/${id}/`);
    return api.get<Film>(`/films/${id}/`).catch(error => { console.error('Error in films getById', error); throw error; });
  },
};

export default api;