import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { RootState } from '../../store';
import { fetchStarships } from '../../store/slices/starshipsSlice';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  Container,
  Fade,
  IconButton,
  Button,
  Chip,
} from '@mui/material';
import {
  RocketLaunch,
  ArrowBack,
  ArrowForward,
  Speed,
  People,
} from '@mui/icons-material';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const CinematicStarshipsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state: RootState) => (state.starships as any));
  const [currentStarship, setCurrentStarship] = useState(0);

  useEffect(() => {
    const loadAllStarships = async () => {
      if (items.length === 0) {
        // Загружаем все страницы звездолетов
        for (let page = 1; page <= 4; page++) {
          await dispatch(fetchStarships({ page }));
        }
      }
    };
    loadAllStarships();
  }, [dispatch, items.length]);

  const starshipImages = [
    'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop', // Space ship
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', // Space battle
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop', // Space station
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Futuristic
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop', // Deep space
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', // Dark space
    'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop', // Nebula
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=600&fit=crop', // Galaxy
    'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop', // Stars
    'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop', // Cosmic
  ];

  if (status === 'loading' && items.length === 0) {
    return <LoadingSpinner message="Loading starships..." />;
  }

  if (status === 'failed' as any) {
    return <ErrorMessage message={error || 'Failed to load starships'} />;
  }

  const currentStarshipData = items[currentStarship];

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
          sx={{ color: '#9C27B0', fontSize: '1.5rem' }}
          onClick={() => navigate('/')}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography sx={{ color: '#9C27B0', fontWeight: 700, mt: 1, fontSize: '0.9rem', letterSpacing: '2px' }}>
          BACK
        </Typography>
      </Box>

      {/* Starship Navigation */}
      <Box sx={{ position: 'fixed', top: '50%', right: 32, transform: 'translateY(-50%)', zIndex: 1000 }}>
        {items.slice(0, 10).map((_: any, index: number) => (
          <Box 
            key={index} 
            sx={{ mb: 3, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => setCurrentStarship(index)}
          >
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              backgroundColor: index === currentStarship ? '#9C27B0' : '#30363D',
              mx: 'auto',
              mb: 1,
            }} />
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', fontWeight: 600 }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Hero Starship Section */}
      <Box sx={{ 
        position: 'relative',
        height: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        background: currentStarshipData ? 
          `linear-gradient(135deg, rgba(13, 17, 23, 0.9) 0%, rgba(33, 38, 45, 0.7) 100%), url(${starshipImages[currentStarship % starshipImages.length]})` :
          'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        {/* Purple accent line */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '2px',
          height: '60%',
          background: 'linear-gradient(180deg, transparent 0%, #9C27B0 50%, transparent 100%)',
        }} />
        
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
            {/* Left Content */}
            <Box sx={{ flex: 1, pr: { md: 8 } }}>
              {currentStarshipData && (
                <Fade in timeout={1000} key={currentStarship}>
                  <Box>
                    <Typography sx={{ 
                      color: '#9C27B0', 
                      fontSize: '0.9rem', 
                      fontWeight: 700, 
                      letterSpacing: '3px',
                      mb: 2,
                    }}>
                      STARSHIP CLASS ///
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
                      {currentStarshipData.name}
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', gap: 4, mb: 3, flexWrap: 'wrap' }}>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            MODEL
                          </Typography>
                          <Typography sx={{ color: '#9C27B0', fontWeight: 700 }}>
                            {currentStarshipData.model}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            MANUFACTURER
                          </Typography>
                          <Typography sx={{ color: '#9C27B0', fontWeight: 700 }}>
                            {currentStarshipData.manufacturer.split(',')[0]}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            CLASS
                          </Typography>
                          <Typography sx={{ color: '#9C27B0', fontWeight: 700 }}>
                            {currentStarshipData.starship_class}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<Speed />}
                          label={`${currentStarshipData.max_atmosphering_speed} km/h`}
                          sx={{
                            backgroundColor: '#9C27B0',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            '& .MuiChip-icon': { color: '#FFFFFF' },
                          }}
                        />
                        <Chip
                          icon={<People />}
                          label={`${currentStarshipData.crew} crew`}
                          sx={{
                            backgroundColor: '#30363D',
                            color: '#F0F6FC',
                            fontWeight: 600,
                            '& .MuiChip-icon': { color: '#9C27B0' },
                          }}
                        />
                        <Chip
                          label={`${currentStarshipData.length}m long`}
                          sx={{
                            backgroundColor: '#30363D',
                            color: '#F0F6FC',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 1 }}>
                          SPECIFICATIONS
                        </Typography>
                        <Typography sx={{ 
                          color: '#F0F6FC',
                          fontSize: '1rem',
                          lineHeight: 1.6,
                          maxWidth: '600px',
                        }}>
                          Cost: {currentStarshipData.cost_in_credits !== 'unknown' ? 
                            `${parseInt(currentStarshipData.cost_in_credits).toLocaleString()} credits` : 
                            'Unknown'
                          } • Passengers: {currentStarshipData.passengers} • 
                          Cargo: {currentStarshipData.cargo_capacity} kg
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<RocketLaunch />}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            background: '#9C27B0',
                            color: '#fff',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&:hover': {
                              background: '#FFE81F',
                              color: '#000',
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
                            borderColor: '#9C27B0',
                            color: '#9C27B0',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&:hover': {
                              borderColor: '#FFE81F',
                              color: '#FFE81F',
                              backgroundColor: 'rgba(156, 39, 176, 0.1)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                          onClick={() => {
                            const element = document.getElementById('all-starships');
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          VIEW ALL ({items.length})
                        </Button>
                      </Box>
                      
                      <IconButton 
                        sx={{ color: '#8B949E' }}
                        onClick={() => setCurrentStarship((prev) => (prev + 1) % Math.min(items.length, 10))}
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
            <Typography sx={{ color: '#9C27B0', fontSize: '0.8rem', fontWeight: 700 }}>
              {String(currentStarship + 1).padStart(2, '0')}
            </Typography>
            <Box sx={{ flex: 1, height: 2, backgroundColor: '#30363D', borderRadius: 1 }}>
              <Box sx={{ 
                width: `${((currentStarship + 1) / Math.min(items.length, 10)) * 100}%`, 
                height: '100%', 
                backgroundColor: '#9C27B0',
                borderRadius: 1,
                transition: 'width 0.5s ease',
              }} />
            </Box>
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem' }}>
              {String(Math.min(items.length, 10)).padStart(2, '0')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* All Starships Grid */}
      <Box id="all-starships" sx={{ py: 8, background: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#9C27B0',
              fontWeight: 700,
              mb: 6,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            All Starships
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
            {items.map((starship: any, index: number) => (
              <Fade key={starship.url} in timeout={1000 + index * 100}>
                <Card
                  sx={{
                    height: '300px',
                    background: `linear-gradient(135deg, rgba(13, 17, 23, 0.8) 0%, rgba(33, 38, 45, 0.6) 100%), url(${starshipImages[index % starshipImages.length]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #30363D',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 25px rgba(156, 39, 176, 0.2)',
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
                        color: '#9C27B0', 
                        fontSize: '0.8rem', 
                        fontWeight: 700, 
                        letterSpacing: '2px',
                        mb: 1,
                      }}
                    >
                      {starship.starship_class.toUpperCase()}
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
                      {starship.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#8B949E',
                        fontSize: '0.8rem',
                        mb: 1,
                      }}
                    >
                      {starship.model}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        size="small"
                        label={`${starship.crew} crew`}
                        sx={{
                          backgroundColor: '#30363D',
                          color: '#9C27B0',
                          fontSize: '0.7rem',
                          height: '20px',
                        }}
                      />
                      <Chip
                        size="small"
                        label={`${starship.length}m`}
                        sx={{
                          backgroundColor: '#30363D',
                          color: '#9C27B0',
                          fontSize: '0.7rem',
                          height: '20px',
                        }}
                      />
                    </Box>
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

export default CinematicStarshipsList;
