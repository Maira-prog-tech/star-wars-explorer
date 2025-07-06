import React, { useEffect } from 'react';
import {

  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { Movie } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchFilms } from '../../store/slices/filmsSlice';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import type { RootState } from '../../store';

const FilmsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.films.films);
  const status = useAppSelector((state: RootState) => state.films.status);
  const error = useAppSelector((state: RootState) => state.films.error);

  useEffect(() => {
    console.log('FilmsList: Dispatching fetchFilms');
    dispatch(fetchFilms({}));
  }, [dispatch]);

 
  console.log('FilmsList render:', { items, status, error });

  const handleRetry = () => {
    dispatch(fetchFilms({}));
  };

  const sortedFilms = [...items].sort((a, b) => a.episode_id - b.episode_id);

  if (status === 'loading') {
    return <LoadingSpinner message="Loading films..." />;
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
          Star Wars Films
        </Typography>
        <Typography variant="h6" sx={{ color: '#8B949E', maxWidth: '600px', mx: 'auto' }}>
          Explore the epic saga that changed cinema forever. From A New Hope to The Rise of Skywalker.
        </Typography>
      </Box>

      {error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {status === 'succeeded' && items.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No films found in a galaxy far, far away...
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
        {sortedFilms.map((film) => (
          <Card 
            key={film.url}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
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
                  <Movie sx={{ color: '#FFE81F', fontSize: '1.8rem' }} />
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
                    {film.title}
                  </Typography>
                  <Chip 
                    label={`Episode ${film.episode_id}`} 
                    size="small" 
                    sx={{
                      background: 'linear-gradient(45deg, #FFE81F, #FF6B35)',
                      color: '#000',
                      fontWeight: 600,
                      '& .MuiChip-label': {
                        px: 1.5,
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box 
                sx={{ 
                  background: 'linear-gradient(135deg, #161B2220, #21262D20)',
                  borderRadius: '12px',
                  p: 2.5,
                  mb: 3,
                  border: '1px solid #30363D',
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: '#8B949E', fontWeight: 500 }}>
                      Director
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#F0F6FC', fontWeight: 600 }}>
                      {film.director}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: '#8B949E', fontWeight: 500 }}>
                      Producer
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#F0F6FC', fontWeight: 600 }}>
                      {film.producer}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: '#8B949E', fontWeight: 500 }}>
                      Release Date
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#FFE81F', fontWeight: 600 }}>
                      {new Date(film.release_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#C9D1D9',
                  lineHeight: 1.6,
                  mb: 3,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontStyle: 'italic',
                }}
              >
                {film.opening_crawl}
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={1.5}>
                <Chip 
                  label={`${film.characters.length} Characters`} 
                  size="small" 
                  sx={{
                    backgroundColor: '#21262D',
                    color: '#8B949E',
                    border: '1px solid #30363D',
                    '&:hover': {
                      backgroundColor: '#30363D',
                      color: '#F0F6FC',
                    },
                  }}
                />
                <Chip 
                  label={`${film.planets.length} Planets`} 
                  size="small" 
                  sx={{
                    backgroundColor: '#21262D',
                    color: '#8B949E',
                    border: '1px solid #30363D',
                    '&:hover': {
                      backgroundColor: '#30363D',
                      color: '#F0F6FC',
                    },
                  }}
                />
                <Chip 
                  label={`${film.starships.length} Starships`} 
                  size="small" 
                  sx={{
                    backgroundColor: '#21262D',
                    color: '#8B949E',
                    border: '1px solid #30363D',
                    '&:hover': {
                      backgroundColor: '#30363D',
                      color: '#F0F6FC',
                    },
                  }}
                />
              </Box>
              </CardContent>
            </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FilmsList;
