import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Fade,
} from '@mui/material';
import {
  PlayArrow,
  VolumeUp,
  FullscreenExit,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';

const FullscreenCinematicHome: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'THE FORCE AWAKENS',
      subtitle: 'Episode VII',
      description: 'Discover the heroes and villains of a galaxy far, far away',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
      action: () => navigate('/characters'),
    },
    {
      title: 'ROGUE ONE',
      subtitle: 'A Star Wars Story',
      description: 'Explore the planets and worlds of the Star Wars universe',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop',
      action: () => navigate('/planets'),
    },
    {
      title: 'THE EMPIRE STRIKES BACK',
      subtitle: 'Episode V',
      description: 'Journey through the greatest films ever made',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop',
      action: () => navigate('/films'),
    },
    {
      title: 'RETURN OF THE JEDI',
      subtitle: 'Episode VI',
      description: 'Command the most powerful starships in the galaxy',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',
      action: () => navigate('/starships'),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  return (
    <Box sx={{ 
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
    }}>
      {/* Background Video/Image */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%), url(${currentSlideData.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'all 1.5s ease-in-out',
        zIndex: 1,
      }} />

      {/* Top Navigation */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 4,
      }}>
        <Typography sx={{
          fontSize: '1.5rem',
          fontWeight: 900,
          color: '#FFE81F',
          letterSpacing: '3px',
        }}>
          STAR WARS
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton sx={{ color: '#FFFFFF', '&:hover': { color: '#FFE81F' } }}>
            <VolumeUp />
          </IconButton>
          <IconButton sx={{ color: '#FFFFFF', '&:hover': { color: '#FFE81F' } }}>
            <FullscreenExit />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '8%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        maxWidth: '600px',
      }}>
        <Fade in timeout={1000} key={currentSlide}>
          <Box>
            <Typography sx={{
              fontSize: '1rem',
              fontWeight: 700,
              color: '#FFE81F',
              letterSpacing: '4px',
              mb: 2,
              textTransform: 'uppercase',
            }}>
              {currentSlideData.subtitle}
            </Typography>
            
            <Typography sx={{
              fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 0.9,
              mb: 3,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            }}>
              {currentSlideData.title}
            </Typography>
            
            <Typography sx={{
              fontSize: '1.2rem',
              color: '#CCCCCC',
              mb: 4,
              lineHeight: 1.6,
              maxWidth: '500px',
            }}>
              {currentSlideData.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={currentSlideData.action}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: '#FFE81F',
                  color: '#000000',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderRadius: '0px',
                  '&:hover': {
                    background: '#FF6B35',
                    transform: 'translateX(5px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                EXPLORE NOW
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => navigate('/characters')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  borderColor: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderRadius: '0px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: '#FFE81F',
                    color: '#FFE81F',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                VIEW ALL
              </Button>
            </Box>
          </Box>
        </Fade>
      </Box>

      {/* Side Navigation */}
      <Box sx={{
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}>
        {slides.map((_, index) => (
          <Box 
            key={index}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              cursor: 'pointer',
              opacity: index === currentSlide ? 1 : 0.5,
              transition: 'all 0.3s ease',
              '&:hover': { opacity: 1 },
            }}
            onClick={() => setCurrentSlide(index)}
          >
            <Box sx={{
              width: index === currentSlide ? 40 : 20,
              height: 2,
              backgroundColor: index === currentSlide ? '#FFE81F' : '#FFFFFF',
              transition: 'all 0.3s ease',
            }} />
            <Typography sx={{
              color: index === currentSlide ? '#FFE81F' : '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '1px',
            }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Bottom Controls */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 4,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            sx={{ 
              color: '#FFFFFF', 
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': { 
                color: '#FFE81F',
                borderColor: '#FFE81F',
              } 
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            sx={{ 
              color: '#FFFFFF', 
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': { 
                color: '#FFE81F',
                borderColor: '#FFE81F',
              } 
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ color: '#FFE81F', fontSize: '0.9rem', fontWeight: 700 }}>
            {String(currentSlide + 1).padStart(2, '0')}
          </Typography>
          <Box sx={{ width: 100, height: 2, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
            <Box sx={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              height: '100%',
              backgroundColor: '#FFE81F',
              transition: 'width 0.5s ease',
            }} />
          </Box>
          <Typography sx={{ color: '#FFFFFF', fontSize: '0.9rem' }}>
            {String(slides.length).padStart(2, '0')}
          </Typography>
        </Box>
      </Box>

      {/* Decorative Elements */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '2px',
        height: '200px',
        background: 'linear-gradient(180deg, transparent 0%, #FFE81F 50%, transparent 100%)',
        zIndex: 50,
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '100px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, #4FC3F7 50%, transparent 100%)',
        zIndex: 50,
      }} />
    </Box>
  );
};

export default FullscreenCinematicHome;
