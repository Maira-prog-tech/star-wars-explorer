import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {

  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActionArea,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCharacters, setSearchQuery } from '../../store/slices/charactersSlice';
import { extractIdFromUrl } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import SearchBar from '../Common/SearchBar';
import Pagination from '../Common/Pagination';
import type { RootState } from '../../store';
import type { Character } from '../../types'; 

const CharactersList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.characters.items as Character[]);
  const status = useAppSelector((state: RootState) => state.characters.status);
  const error = useAppSelector((state: RootState) => state.characters.error as string | null);
  const pagination = useAppSelector((state: RootState) => state.characters.pagination);
  const search = useAppSelector((state: RootState) => state.characters.search as { query: string });

  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch(fetchCharacters({ page: 1 }));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      dispatch(fetchCharacters({ page: 1, search: query || undefined }));
    }, 500);

    setSearchTimeout(timeout);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchCharacters({ 
      page, 
      search: search.query || undefined 
    }));
  };

  const handleCharacterClick = (url: string) => {
    const id = extractIdFromUrl(url);
    navigate(`/character/${id}`);
  };

  const handleRetry = () => {
    dispatch(fetchCharacters({ 
      page: pagination.currentPage, 
      search: search.query || undefined 
    }));
  };

  if (status === 'loading' && items.length === 0) {
    return <LoadingSpinner message="Loading characters..." />;
  }

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            mb: 2,
            background: 'linear-gradient(45deg, #FFE81F, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
          }}
        >
          Star Wars Characters
        </Typography>
        <Typography variant="h6" sx={{ color: '#8B949E', maxWidth: '600px', mx: 'auto' }}>
          Meet the heroes, villains, and legends from across the galaxy
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <SearchBar
          value={search.query}
          onChange={handleSearch}
          onSearch={handleSearch}
          placeholder="Search characters by name..."
          disabled={status === 'loading'}
        />
      </Box>

      {error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {status === 'succeeded' && items.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            {search.query ? 'No characters found in this galaxy...' : 'No characters found'}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 4,
          mb: 4,
        }}
      >
        {items.map((character: Character) => (
          <Card 
            key={character.url}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #FFE81F, #FF6B35)',
              },
            }}
          >
            <CardActionArea 
              onClick={() => handleCharacterClick(character.url)}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box display="flex" alignItems="flex-start" mb={3}>
                  <Box 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: '12px', 
                      background: 'linear-gradient(135deg, #FFE81F20, #FF6B3520)',
                      mr: 2,
                      mt: 0.5,
                    }}
                  >
                    <Person sx={{ color: '#FFE81F', fontSize: '1.8rem' }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 700,
                        mb: 1,
                        color: '#F0F6FC',
                        lineHeight: 1.2,
                      }}
                    >
                      {character.name}
                    </Typography>
                  </Box>
                </Box>

                <Box 
                  sx={{ 
                    background: 'linear-gradient(135deg, #161B2220, #21262D20)',
                    borderRadius: '12px',
                    p: 2.5,
                    border: '1px solid #30363D',
                  }}
                >
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ color: '#8B949E', fontWeight: 500 }}>
                        Height
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#F0F6FC', fontWeight: 600 }}>
                        {character.height === 'unknown' ? 'Unknown' : `${character.height} cm`}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ color: '#8B949E', fontWeight: 500 }}>
                        Mass
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#F0F6FC', fontWeight: 600 }}>
                        {character.mass === 'unknown' ? 'Unknown' : `${character.mass} kg`}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ color: '#8B949E', fontWeight: 500 }}>
                        Gender
                      </Typography>
                      <Chip 
                        label={character.gender} 
                        size="small" 
                        sx={{
                          backgroundColor: character.gender === 'male' ? '#FFE81F20' : 
                                         character.gender === 'female' ? '#FF6B3520' : '#21262D',
                          color: character.gender === 'male' ? '#FFE81F' : 
                                character.gender === 'female' ? '#FF6B35' : '#8B949E',
                          border: `1px solid ${character.gender === 'male' ? '#FFE81F' : 
                                              character.gender === 'female' ? '#FF6B35' : '#30363D'}`,
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ color: '#8B949E', fontWeight: 500 }}>
                        Birth Year
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#FFE81F', fontWeight: 600 }}>
                        {character.birth_year}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                </CardContent>
              </CardActionArea>
            </Card>
        ))}
      </Box>

      {status === 'loading' && items.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <LoadingSpinner message="Loading more characters..." />
        </Box>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalCount={pagination.totalCount}
        onPageChange={handlePageChange}
        disabled={status === 'loading'}
      />
    </Box>
  );
};

export default CharactersList;
