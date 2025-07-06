import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Person, Public, Movie, Rocket } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../contexts/SearchContext';

const SearchResults: React.FC = () => {
  const { searchQuery, filteredResults } = useSearch();
  const navigate = useNavigate();

  if (!searchQuery.trim()) {
    return null;
  }

  const totalResults = 
    filteredResults.characters.length + 
    filteredResults.planets.length + 
    filteredResults.films.length + 
    filteredResults.starships.length;

  if (totalResults === 0) {
    return (
      <Box sx={{ 
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1400,
        background: '#21262D',
        border: '1px solid #30363D',
        borderRadius: '8px',
        mt: 1,
        p: 2,
      }}>
        <Typography sx={{ color: '#8B949E', textAlign: 'center' }}>
          No results found for "{searchQuery}"
        </Typography>
      </Box>
    );
  }

  const handleItemClick = (type: string, item: any) => {
    const id = item.url.split('/').filter(Boolean).pop();
    navigate(`/${type}/${id}`);
  };

  return (
    <Box sx={{ 
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      zIndex: 1400,
      background: '#21262D',
      border: '1px solid #30363D',
      borderRadius: '8px',
      mt: 1,
      maxHeight: '400px',
      overflow: 'auto',
    }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ color: '#F0F6FC', mb: 2 }}>
          Search Results ({totalResults})
        </Typography>

        {/* Characters */}
        {filteredResults.characters.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Person sx={{ color: '#FFE81F', mr: 1 }} />
              <Typography variant="subtitle1" sx={{ color: '#FFE81F' }}>
                Characters ({filteredResults.characters.length})
              </Typography>
            </Box>
            {filteredResults.characters.slice(0, 3).map((character: any, index: number) => (
              <Card 
                key={index}
                onClick={() => handleItemClick('character', character)}
                sx={{ 
                  mb: 1, 
                  background: '#161B22',
                  cursor: 'pointer',
                  '&:hover': { background: '#1C2128' }
                }}
              >
                <CardContent sx={{ py: 1 }}>
                  <Typography sx={{ color: '#F0F6FC' }}>{character.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#8B949E' }}>
                    {character.birth_year} • {character.gender}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {filteredResults.characters.length > 3 && (
              <Typography 
                variant="body2" 
                sx={{ color: '#4FC3F7', cursor: 'pointer', ml: 1 }}
                onClick={() => navigate('/characters')}
              >
                +{filteredResults.characters.length - 3} more characters
              </Typography>
            )}
          </Box>
        )}

        {/* Planets */}
        {filteredResults.planets.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Public sx={{ color: '#4FC3F7', mr: 1 }} />
              <Typography variant="subtitle1" sx={{ color: '#4FC3F7' }}>
                Planets ({filteredResults.planets.length})
              </Typography>
            </Box>
            {filteredResults.planets.slice(0, 3).map((planet: any, index: number) => (
              <Card 
                key={index}
                onClick={() => handleItemClick('planet', planet)}
                sx={{ 
                  mb: 1, 
                  background: '#161B22',
                  cursor: 'pointer',
                  '&:hover': { background: '#1C2128' }
                }}
              >
                <CardContent sx={{ py: 1 }}>
                  <Typography sx={{ color: '#F0F6FC' }}>{planet.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#8B949E' }}>
                    {planet.climate} • {planet.terrain}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {filteredResults.planets.length > 3 && (
              <Typography 
                variant="body2" 
                sx={{ color: '#4FC3F7', cursor: 'pointer', ml: 1 }}
                onClick={() => navigate('/planets')}
              >
                +{filteredResults.planets.length - 3} more planets
              </Typography>
            )}
          </Box>
        )}

        {/* Films */}
        {filteredResults.films.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Movie sx={{ color: '#FF6B35', mr: 1 }} />
              <Typography variant="subtitle1" sx={{ color: '#FF6B35' }}>
                Films ({filteredResults.films.length})
              </Typography>
            </Box>
            {filteredResults.films.slice(0, 3).map((film: any, index: number) => (
              <Card 
                key={index}
                sx={{ 
                  mb: 1, 
                  background: '#161B22',
                  cursor: 'pointer',
                  '&:hover': { background: '#1C2128' }
                }}
              >
                <CardContent sx={{ py: 1 }}>
                  <Typography sx={{ color: '#F0F6FC' }}>{film.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#8B949E' }}>
                    {film.release_date} • {film.director}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {filteredResults.films.length > 3 && (
              <Typography 
                variant="body2" 
                sx={{ color: '#FF6B35', cursor: 'pointer', ml: 1 }}
                onClick={() => navigate('/films')}
              >
                +{filteredResults.films.length - 3} more films
              </Typography>
            )}
          </Box>
        )}

        {/* Starships */}
        {filteredResults.starships.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Rocket sx={{ color: '#9C27B0', mr: 1 }} />
              <Typography variant="subtitle1" sx={{ color: '#9C27B0' }}>
                Starships ({filteredResults.starships.length})
              </Typography>
            </Box>
            {filteredResults.starships.slice(0, 3).map((starship: any, index: number) => (
              <Card 
                key={index}
                onClick={() => handleItemClick('starship', starship)}
                sx={{ 
                  mb: 1, 
                  background: '#161B22',
                  cursor: 'pointer',
                  '&:hover': { background: '#1C2128' }
                }}
              >
                <CardContent sx={{ py: 1 }}>
                  <Typography sx={{ color: '#F0F6FC' }}>{starship.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#8B949E' }}>
                    {starship.model} • {starship.starship_class}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            {filteredResults.starships.length > 3 && (
              <Typography 
                variant="body2" 
                sx={{ color: '#9C27B0', cursor: 'pointer', ml: 1 }}
                onClick={() => navigate('/starships')}
              >
                +{filteredResults.starships.length - 3} more starships
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchResults;
