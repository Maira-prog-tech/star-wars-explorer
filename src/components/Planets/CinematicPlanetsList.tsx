import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { RootState } from '../../store';
import { fetchPlanets } from '../../store/slices/planetsSlice';
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
  Public,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const CinematicPlanetsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state: RootState) => state.planets);
  const [currentPlanet, setCurrentPlanet] = useState(0);

  useEffect(() => {
    const loadAllPlanets = async () => {
      if (items.length === 0) {
        
        for (let page = 1; page <= 6; page++) {
          await dispatch(fetchPlanets({ page }));
        }
      }
    };
    loadAllPlanets();
  }, [dispatch, items.length]);

  const featuredPlanets = items.slice(0, 6);

  const planetImages = [
    'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop', // Desert planet
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', // Space/Galaxy
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', // Dark space
    'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop', // Ice planet
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Forest planet
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop', // Ocean planet
  ];

  if (status === 'loading' && items.length === 0) {
    return <LoadingSpinner message="Loading planets..." />;
  }

  if ((status as string) === 'failed') {
    return <ErrorMessage message={error || 'Failed to load planets'} />;
  }

  const currentPlanetData = featuredPlanets[currentPlanet];

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
          sx={{ color: '#4FC3F7', fontSize: '1.5rem' }}
          onClick={() => { console.log('Back button clicked'); navigate('/'); }}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography sx={{ color: '#4FC3F7', fontWeight: 700, mt: 1, fontSize: '0.9rem', letterSpacing: '2px' }}>
          BACK
        </Typography>
      </Box>

      {/* Planet Navigation */}
      <Box sx={{ position: 'fixed', top: '50%', right: 32, transform: 'translateY(-50%)', zIndex: 1000 }}>
        {featuredPlanets.map((_: any, index: number) => (
          <Box 
            key={index} 
            sx={{ mb: 3, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => { console.log(`Planet ${index} clicked`); setCurrentPlanet(index); }}
          >
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              backgroundColor: index === currentPlanet ? '#4FC3F7' : '#30363D',
              mx: 'auto',
              mb: 1,
            }} />
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', fontWeight: 600 }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Hero Planet Section */}
      <Box sx={{ 
        position: 'relative',
        height: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        background: currentPlanetData ? 
          `linear-gradient(135deg, rgba(13, 17, 23, 0.9) 0%, rgba(33, 38, 45, 0.7) 100%), url(${planetImages[currentPlanet]})` :
          'linear-gradient(135deg, #0D1117 0%, #161B22 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        {/* Blue accent line */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '2px',
          height: '60%',
          background: 'linear-gradient(180deg, transparent 0%, #4FC3F7 50%, transparent 100%)',
        }} />
        
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
            {/* Left Content */}
            <Box sx={{ flex: 1, pr: { md: 8 } }}>
              {currentPlanetData && (
                <Fade in timeout={1000} key={currentPlanet}>
                  <Box>
                    <Typography sx={{ 
                      color: '#4FC3F7', 
                      fontSize: '0.9rem', 
                      fontWeight: 700, 
                      letterSpacing: '3px',
                      mb: 2,
                    }}>
                      PLANET ///
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
                      {currentPlanetData.name}
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            CLIMATE
                          </Typography>
                          <Typography sx={{ color: '#4FC3F7', fontWeight: 700, textTransform: 'capitalize' }}>
                            {currentPlanetData.climate}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            TERRAIN
                          </Typography>
                          <Typography sx={{ color: '#4FC3F7', fontWeight: 700, textTransform: 'capitalize' }}>
                            {currentPlanetData.terrain}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            POPULATION
                          </Typography>
                          <Typography sx={{ color: '#4FC3F7', fontWeight: 700 }}>
                            {currentPlanetData.population === 'unknown' ? 'Unknown' : 
                             parseInt(currentPlanetData.population).toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box>
                        <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                          DIAMETER
                        </Typography>
                        <Typography sx={{ 
                          color: '#FFE81F',
                          fontWeight: 700,
                        }}>
                          {currentPlanetData.diameter === 'unknown' ? 'Unknown' : `${parseInt(currentPlanetData.diameter).toLocaleString()} km`}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<Public />}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            background: '#4FC3F7',
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&:hover': {
                              background: '#FFE81F',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                          onClick={() => { console.log('View details button clicked'); /* existing onClick code */ }}
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
                            borderColor: '#4FC3F7',
                            color: '#4FC3F7',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&:hover': {
                              borderColor: '#FFE81F',
                              color: '#FFE81F',
                              backgroundColor: 'rgba(79, 195, 247, 0.1)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                          onClick={() => { console.log('View all button clicked'); const element = document.getElementById('all-planets'); element?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                          VIEW ALL ({items.length})
                        </Button>
                      </Box>
                      
                      <IconButton 
                        sx={{ color: '#8B949E' }}
                        onClick={() => { console.log('Next planet button clicked'); setCurrentPlanet((prev) => (prev + 1) % featuredPlanets.length); }}
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
            <Typography sx={{ color: '#4FC3F7', fontSize: '0.8rem', fontWeight: 700 }}>
              {String(currentPlanet + 1).padStart(2, '0')}
            </Typography>
            <Box sx={{ flex: 1, height: 2, backgroundColor: '#30363D', borderRadius: 1 }}>
              <Box sx={{ 
                width: `${((currentPlanet + 1) / featuredPlanets.length) * 100}%`, 
                height: '100%', 
                backgroundColor: '#4FC3F7',
                borderRadius: 1,
                transition: 'width 0.5s ease',
              }} />
            </Box>
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem' }}>
              {String(featuredPlanets.length).padStart(2, '0')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* All Planets Grid */}
      <Box id="all-planets" sx={{ py: 8, background: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#4FC3F7',
              fontWeight: 700,
              mb: 6,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            All Planets
          </Typography>
          
          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: 3,
            }}
          >
            {items.map((planet: any, index: number) => (
              <Fade key={planet.url} in timeout={1000 + index * 100}>
                <Card
                  sx={{
                    height: '200px',
                    background: `linear-gradient(135deg, rgba(13, 17, 23, 0.8) 0%, rgba(33, 38, 45, 0.6) 100%), url(${planetImages[index % planetImages.length]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #30363D',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 25px rgba(79, 195, 247, 0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardActionArea 
                    onClick={() => { console.log('Planet card clicked'); navigate(`/planet/${planet.url.split('/').slice(-2, -1)[0]}`); }}
                    sx={{ 
                      height: '100%', 
                      background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.7) 0%, rgba(33, 38, 45, 0.5) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-start',
                      p: 2,
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        mb: 1,
                      }}
                    >
                      {planet.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#4FC3F7',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        textTransform: 'capitalize',
                      }}
                    >
                      {planet.climate} • {planet.terrain}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Fade>
            ))}
          </Box>
          
          {items.length > 0 && (
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="outlined"
                onClick={() => { console.log('View all planets button clicked'); navigate('/planets'); }}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#4FC3F7',
                  borderColor: '#4FC3F7',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  '&:hover': {
                    backgroundColor: '#4FC3F7',
                    color: '#000',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View All Planets
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default CinematicPlanetsList;
