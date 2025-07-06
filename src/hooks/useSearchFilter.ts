import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearch } from '../contexts/SearchContext';
import type { RootState } from '../store';

export const useSearchFilter = () => {
  const { searchQuery, setFilteredResults } = useSearch();
  
  const characters = useSelector((state: RootState) => (state.characters as any).items || []);
  const planets = useSelector((state: RootState) => (state.planets as any).items || []);
  const films = useSelector((state: RootState) => (state.films as any).items || []);
  const starships = useSelector((state: RootState) => (state.starships as any).items || []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredResults({
        characters: [],
        planets: [],
        films: [],
        starships: [],
      });
      return;
    }

    const query = searchQuery.toLowerCase();

    const filteredCharacters = characters.filter((character: any) =>
      character.name?.toLowerCase().includes(query) ||
      character.species?.some((species: string) => species.toLowerCase().includes(query)) ||
      character.homeworld?.toLowerCase().includes(query)
    );

    const filteredPlanets = planets.filter((planet: any) =>
      planet.name?.toLowerCase().includes(query) ||
      planet.climate?.toLowerCase().includes(query) ||
      planet.terrain?.toLowerCase().includes(query)
    );

    const filteredFilms = films.filter((film: any) =>
      film.title?.toLowerCase().includes(query) ||
      film.director?.toLowerCase().includes(query) ||
      film.producer?.toLowerCase().includes(query)
    );

    const filteredStarships = starships.filter((starship: any) =>
      starship.name?.toLowerCase().includes(query) ||
      starship.model?.toLowerCase().includes(query) ||
      starship.manufacturer?.toLowerCase().includes(query) ||
      starship.starship_class?.toLowerCase().includes(query)
    );

    setFilteredResults({
      characters: filteredCharacters,
      planets: filteredPlanets,
      films: filteredFilms,
      starships: filteredStarships,
    });
  }, [searchQuery, characters, planets, films, starships, setFilteredResults]);

  return {
    searchQuery,
    hasResults: searchQuery.trim().length > 0,
  };
};
