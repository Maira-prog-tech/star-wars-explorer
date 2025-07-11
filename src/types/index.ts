
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}


export type LoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export interface SearchState {
  query: string;
  results: any[];
}


export interface CharactersState {
  items: Character[];
  currentItem: Character | null;
  status: LoadingStatus;
  error: string | null;
  pagination: PaginationState;
  search: SearchState;
}

export interface PlanetsState {
  items: Planet[];
  currentItem: Planet | null;
  status: LoadingStatus;
  error: string | null;
  pagination: PaginationState;
  search: SearchState;
}

export interface StarshipsState {
  items: Starship[];
  currentItem: Starship | null;
  status: LoadingStatus;
  error: string | null;
  pagination: PaginationState;
  search: SearchState;
}

export interface FilmsState {
  items: Film[];
  currentItem: Film | null;
  status: LoadingStatus;
  error: string | null;
}


