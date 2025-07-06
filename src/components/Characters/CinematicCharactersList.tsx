import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCharacters } from '../../store/slices/charactersSlice';
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
  Person,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';

const CinematicCharactersList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.characters);
  const [currentCharacter, setCurrentCharacter] = useState(0);

  useEffect(() => {
    const loadAllCharacters = async () => {
      if (items.length === 0) {
        // Загружаем все страницы персонажей
        for (let page = 1; page <= 9; page++) {
          await dispatch(fetchCharacters({ page }));
        }
      }
    };
    loadAllCharacters();
  }, [dispatch, items.length]);

  const featuredCharacters = items.slice(0, 6);

  const characterImages = [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', // Vader style
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', // Space
    'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop', // Galaxy
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
  ];

  if (status === 'loading' && items.length === 0) {
    return <LoadingSpinner message="Loading characters..." />;
  }

  if (status === 'failed' as any) {
    return <ErrorMessage message={error || 'Failed to load characters'} />;
  }

  const currentChar = featuredCharacters[currentCharacter];

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
          sx={{ color: '#FFE81F', fontSize: '1.5rem' }}
          onClick={() => navigate('/')}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography sx={{ color: '#FFE81F', fontWeight: 700, mt: 1, fontSize: '0.9rem', letterSpacing: '2px' }}>
          BACK
        </Typography>
      </Box>

      {/* Character Navigation */}
      <Box sx={{ position: 'fixed', top: '50%', right: 32, transform: 'translateY(-50%)', zIndex: 1000 }}>
        {featuredCharacters.map((_, index) => (
          <Box 
            key={index} 
            sx={{ mb: 3, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => setCurrentCharacter(index)}
          >
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              backgroundColor: index === currentCharacter ? '#FFE81F' : '#30363D',
              mx: 'auto',
              mb: 1,
            }} />
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', fontWeight: 600 }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Hero Character Section */}
      <Box sx={{ 
        position: 'relative',
        height: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        background: currentChar ? 
          `linear-gradient(135deg, rgba(13, 17, 23, 0.9) 0%, rgba(33, 38, 45, 0.7) 100%), url(${characterImages[currentCharacter]})` :
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
              {currentChar && (
                <Fade in timeout={1000} key={currentCharacter}>
                  <Box>
                    <Typography sx={{ 
                      color: '#FFE81F', 
                      fontSize: '0.9rem', 
                      fontWeight: 700, 
                      letterSpacing: '3px',
                      mb: 2,
                    }}>
                      CHARACTER ///
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
                      {currentChar.name}
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            HEIGHT
                          </Typography>
                          <Typography sx={{ color: '#FFE81F', fontWeight: 700 }}>
                            {currentChar.height === 'unknown' ? 'Unknown' : `${currentChar.height} cm`}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            MASS
                          </Typography>
                          <Typography sx={{ color: '#FFE81F', fontWeight: 700 }}>
                            {currentChar.mass === 'unknown' ? 'Unknown' : `${currentChar.mass} kg`}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                            BIRTH YEAR
                          </Typography>
                          <Typography sx={{ color: '#FFE81F', fontWeight: 700 }}>
                            {currentChar.birth_year}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box>
                        <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', mb: 0.5 }}>
                          GENDER
                        </Typography>
                        <Typography sx={{ 
                          color: currentChar.gender === 'male' ? '#4FC3F7' : 
                                currentChar.gender === 'female' ? '#FF6B35' : '#8B949E',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}>
                          {currentChar.gender}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<Person />}
                          sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            background: '#FFE81F',
                            color: '#000',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&:hover': {
                              background: '#FF6B35',
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
                            borderColor: '#FFE81F',
                            color: '#FFE81F',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            '&:hover': {
                              borderColor: '#FF6B35',
                              color: '#FF6B35',
                              backgroundColor: 'rgba(255, 232, 31, 0.1)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                          onClick={() => {
                            const element = document.getElementById('all-characters');
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          VIEW ALL ({items.length})
                        </Button>
                      </Box>
                      
                      <IconButton 
                        sx={{ color: '#8B949E' }}
                        onClick={() => setCurrentCharacter((prev) => (prev + 1) % featuredCharacters.length)}
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
            <Typography sx={{ color: '#FFE81F', fontSize: '0.8rem', fontWeight: 700 }}>
              {String(currentCharacter + 1).padStart(2, '0')}
            </Typography>
            <Box sx={{ flex: 1, height: 2, backgroundColor: '#30363D', borderRadius: 1 }}>
              <Box sx={{ 
                width: `${((currentCharacter + 1) / featuredCharacters.length) * 100}%`, 
                height: '100%', 
                backgroundColor: '#FFE81F',
                borderRadius: 1,
                transition: 'width 0.5s ease',
              }} />
            </Box>
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem' }}>
              {String(featuredCharacters.length).padStart(2, '0')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* All Characters Grid */}
      <Box id="all-characters" sx={{ py: 8, background: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#FFE81F',
              fontWeight: 700,
              mb: 6,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            All Characters
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
            {items.map((character, index) => (
              <Fade key={character.url} in timeout={1000 + index * 100}>
                <Card
                  sx={{
                    height: '200px',
                    background: `linear-gradient(135deg, rgba(13, 17, 23, 0.8) 0%, rgba(33, 38, 45, 0.6) 100%), url(${characterImages[index % characterImages.length]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #30363D',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 25px rgba(255, 232, 31, 0.2)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardActionArea 
                    onClick={() => navigate(`/character/${character.url.split('/').slice(-2, -1)[0]}`)}
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
                      {character.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#FFE81F',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      {character.gender} • {character.birth_year}
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
                onClick={() => navigate('/characters')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#FFE81F',
                  borderColor: '#FFE81F',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  '&:hover': {
                    backgroundColor: '#FFE81F',
                    color: '#000',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View All Characters
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default CinematicCharactersList;
