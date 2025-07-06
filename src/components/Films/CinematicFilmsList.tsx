import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { RootState } from '../../store';
import { fetchFilms } from '../../store/slices/filmsSlice';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Container,
  Fade,
  IconButton,
  Button,
} from '@mui/material';
import {
  Movie,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const CinematicFilmsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state: RootState) => (state.films as any));
  const [currentFilm, setCurrentFilm] = useState(0);

  useEffect(() => {
    const loadAllFilms = async () => {
      if (items.length === 0) {
        // Загружаем все фильмы (всего 1 страница)
        await dispatch(fetchFilms());
      }
    };
    loadAllFilms();
  }, [dispatch, items.length]);

  const filmImages = [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', // Space battle
    'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop', // Desert planet
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop', // Ice planet
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Forest
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop', // Space
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', // Dark space
  ];

  if (status === 'loading' && items.length === 0) {
    return <LoadingSpinner message="Loading films..." />;
  }

  if (status === 'failed' as any) {
    return <ErrorMessage message={error || 'Failed to load films'} />;
  }

  const currentFilmData = items[currentFilm];

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 128px)', 
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      width: '100%',
      position: 'relative',
    }}>
      {/* Navigation Menu */}
      <Box sx={{ position: 'fixed', top: 32, left: 32, zIndex: 1000 }}>
        <IconButton 
          sx={{ color: '#FF6B35', fontSize: '1.5rem' }}
          onClick={() => navigate('/')}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography sx={{ color: '#FF6B35', fontWeight: 700, mt: 1, fontSize: '0.9rem', letterSpacing: '2px' }}>
          BACK
        </Typography>
      </Box>

      {/* Film Navigation */}
      <Box sx={{ position: 'fixed', top: '50%', right: 32, transform: 'translateY(-50%)', zIndex: 1000 }}>
        {items.map((_: any, index: number) => (
          <Box 
            key={index} 
            sx={{ mb: 3, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => setCurrentFilm(index)}
          >
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              backgroundColor: index === currentFilm ? '#FF6B35' : '#30363D',
              mx: 'auto',
              mb: 1,
            }} />
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', fontWeight: 600 }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Hero Film Section */}
      <Box sx={{ 
        position: 'relative',
        height: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        background: currentFilmData ? 
          `linear-gradient(135deg, rgba(13, 17, 23, 0.9) 0%, rgba(33, 38, 45, 0.7) 100%), url(${filmImages[currentFilm % filmImages.length]})` :
          'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        {/* Orange accent line */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '2px',
          height: '60%',
          background: 'linear-gradient(180deg, transparent 0%, #FF6B35 50%, transparent 100%)',
        }} />
        
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
            {/* Left Content */}
            <Box sx={{ flex: 1, pr: { md: 8 } }}>
              {currentFilmData && (
                <Fade in timeout={1000} key={currentFilm}>
                  <Box>
                    <Typography sx={{ 
                      color: '#FF6B35', 
                      fontSize: '0.9rem', 
                      fontWeight: 700, 
                      letterSpacing: '3px',
                      mb: 2,
                    }}>
                      EPISODE {currentFilmData.episode_id} ///
                    </Typography>
                    
                    <Typography 
                      variant="h1" 
                      sx={{ 
                        fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                        fontWeight: 900,
                        color: '#FFFFFF',
                        mb: 4,
                        lineHeight: 0.9,
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                      }}
                    >
                      {currentFilmData.title}
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            DIRECTOR
                          </Typography>
                          <Typography sx={{ color: '#FF6B35', fontWeight: 700 }}>
                            {currentFilmData.director}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            PRODUCER
                          </Typography>
                          <Typography sx={{ color: '#FF6B35', fontWeight: 700 }}>
                            {currentFilmData.producer.split(',')[0]}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            RELEASE DATE
                          </Typography>
                          <Typography sx={{ color: '#FF6B35', fontWeight: 700 }}>
                            {new Date(currentFilmData.release_date).getFullYear()}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 1 }}>
                          OPENING CRAWL
                        </Typography>
                        <Typography sx={{ 
                          color: '#F0F6FC',
                          fontSize: '1rem',
                          lineHeight: 1.6,
                          maxWidth: '600px',
                        }}>
                          {currentFilmData.opening_crawl.substring(0, 200)}...
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<Movie />}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            background: '#FF6B35',
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&:hover': {
                              background: '#FFE81F',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          VIEW DETAILS
                        </Button>
                        
                        <Button
                          variant="outlined"
                          sx={{
                            px: 3,
                            py: 1.5,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            borderColor: '#FF6B35',
                            color: '#FF6B35',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&:hover': {
                              borderColor: '#FFE81F',
                              color: '#FFE81F',
                              backgroundColor: 'rgba(255, 107, 53, 0.1)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                          onClick={() => {
                            const element = document.getElementById('all-films');
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          VIEW ALL ({items.length})
                        </Button>
                      </Box>
                      
                      <IconButton 
                        sx={{ color: '#8B949E' }}
                        onClick={() => setCurrentFilm((prev) => (prev + 1) % items.length)}
                      >
                        <ArrowForward />
                      </IconButton>
                    </Box>
                  </Box>
                </Fade>
              )}
            </Box>
          </Box>
        </Container>
        
        {/* Progress Bar */}
        <Box sx={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ color: '#FF6B35', fontSize: '0.8rem', fontWeight: 700 }}>
              {String(currentFilm + 1).padStart(2, '0')}
            </Typography>
            <Box sx={{ flex: 1, height: 2, backgroundColor: '#30363D', borderRadius: 1 }}>
              <Box sx={{ 
                width: `${((currentFilm + 1) / items.length) * 100}%`, 
                height: '100%', 
                backgroundColor: '#FF6B35',
                borderRadius: 1,
                transition: 'width 0.5s ease',
              }} />
            </Box>
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem' }}>
              {String(items.length).padStart(2, '0')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* All Films Grid */}
      <Box id="all-films" sx={{ py: 8, background: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#FF6B35',
              fontWeight: 700,
              mb: 6,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            All Films
          </Typography>
          
          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {items.map((film: any, index: number) => (
              <Fade key={film.url} in timeout={1000 + index * 100}>
                <Card
                  sx={{
                    height: '300px',
                    background: `linear-gradient(135deg, rgba(13, 17, 23, 0.8) 0%, rgba(33, 38, 45, 0.6) 100%), url(${filmImages[index % filmImages.length]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #30363D',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 25px rgba(255, 107, 53, 0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardActionArea 
                    sx={{ 
                      height: '100%', 
                      background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.7) 0%, rgba(33, 38, 45, 0.5) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
                      p: 3,
                    }}
                  >
                    <Typography 
                      sx={{ 
                        color: '#FF6B35', 
                        fontSize: '0.8rem', 
                        fontWeight: 700, 
                        letterSpacing: '2px',
                        mb: 1,
                      }}
                    >
                      EPISODE {film.episode_id}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        mb: 2,
                        lineHeight: 1.2,
                      }}
                    >
                      {film.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#8B949E',
                        fontSize: '0.8rem',
                        mb: 1,
                      }}
                    >
                      Directed by {film.director}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#FF6B35',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                      }}
                    >
                      {new Date(film.release_date).getFullYear()}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Fade>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CinematicFilmsList;
