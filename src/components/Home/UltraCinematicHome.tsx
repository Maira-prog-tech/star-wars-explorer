import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Fade,
  Slide,
} from '@mui/material';
import {
  PlayArrow,
  VolumeUp,
  Settings,
  ArrowForward,
  ArrowBack,
  RadioButtonUnchecked,
  FiberManualRecord,
} from '@mui/icons-material';

const UltraCinematicHome: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slides = [
    {
      title: 'THE FORCE AWAKENS',
      subtitle: 'EPISODE VII',
      year: '2015',
      description: 'Three decades after the Empire\'s defeat, a new threat arises in the militant First Order.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&q=80',
      category: 'CHARACTERS',
      action: () => navigate('/characters'),
      color: '#FFE81F',
    },
    {
      title: 'ROGUE ONE',
      subtitle: 'A STAR WARS STORY',
      year: '2016',
      description: 'The Rebel Alliance makes a risky move to steal the plans for the Death Star.',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop&q=80',
      category: 'PLANETS',
      action: () => navigate('/planets'),
      color: '#4FC3F7',
    },
    {
      title: 'THE LAST JEDI',
      subtitle: 'EPISODE VIII',
      year: '2017',
      description: 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80',
      category: 'FILMS',
      action: () => navigate('/films'),
      color: '#FF6B35',
    },
    {
      title: 'SOLO',
      subtitle: 'A STAR WARS STORY',
      year: '2018',
      description: 'Young Han Solo finds adventure when he joins a gang of galactic smugglers.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop&q=80',
      category: 'STARSHIPS',
      action: () => navigate('/starships'),
      color: '#9C27B0',
    },
  ];

  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      handleNextSlide();
    }, 10000);
  };

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSlideSelect = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <Box sx={{ 
      width: '100%',
      height: '100vh', 
      margin: 0,
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      cursor: 'default',
    }}
    onMouseEnter={stopAutoSlide}
    onMouseLeave={startAutoSlide}
    >
      
      <Box sx={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '120%',
        height: '120%',
        background: `linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.9) 100%), url(${currentSlideData.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isTransitioning ? 'scale(1.1)' : 'scale(1)',
        filter: isTransitioning ? 'blur(2px)' : 'blur(0px)',
        zIndex: 1,
      }} />

      
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: { xs: '40px', md: '80px' },
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        zIndex: 1000,
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: { xs: '40px', md: '80px' },
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        zIndex: 1000,
      }} />

      {/* Top HUD */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1001,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: { xs: 1.5, md: 3 },
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
          <Typography sx={{
            fontSize: { xs: '0.9rem', md: '1.2rem' },
            fontWeight: 900,
            color: '#FFE81F',
            letterSpacing: { xs: '2px', md: '4px' },
            textShadow: '0 0 10px rgba(255, 232, 31, 0.5)',
          }}>
            STAR WARS
          </Typography>
          <Box sx={{
            width: '2px',
            height: { xs: '15px', md: '20px' },
            background: 'linear-gradient(180deg, transparent 0%, #FFE81F 50%, transparent 100%)',
          }} />
          <Typography sx={{
            fontSize: { xs: '0.7rem', md: '0.9rem' },
            color: '#8B949E',
            letterSpacing: { xs: '1px', md: '2px' },
            display: { xs: 'none', sm: 'block' },
          }}>
            UNIVERSE EXPLORER
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton sx={{ 
            color: '#FFFFFF', 
            '&:hover': { color: '#FFE81F' },
            transition: 'all 0.3s ease',
          }}>
            <VolumeUp />
          </IconButton>
          <IconButton sx={{ 
            color: '#FFFFFF', 
            '&:hover': { color: '#FFE81F' },
            transition: 'all 0.3s ease',
          }}>
            <Settings />
          </IconButton>
        </Box>
      </Box>

      
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '8%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        maxWidth: '700px',
      }}>
        <Fade in={!isTransitioning} timeout={800}>
          <Box>
            
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
              px: 2,
              py: 0.5,
              background: `linear-gradient(90deg, ${currentSlideData.color}20 0%, ${currentSlideData.color}40 100%)`,
              border: `1px solid ${currentSlideData.color}`,
              borderRadius: '20px',
            }}>
              <Box sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: currentSlideData.color,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                  '100%': { opacity: 1 },
                },
              }} />
              <Typography sx={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: currentSlideData.color,
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                {currentSlideData.category}
              </Typography>
            </Box>
            
            
            <Typography sx={{
              fontSize: { xs: '0.8rem', md: '1rem' },
              fontWeight: 700,
              color: '#FFE81F',
              letterSpacing: { xs: '2px', md: '3px' },
              mb: 1,
              textTransform: 'uppercase',
            }}>
              {currentSlideData.subtitle}
            </Typography>
            
            
            <Typography sx={{
              fontSize: { xs: '3rem', md: '5rem', lg: '7rem' },
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 0.85,
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.8)',
              background: `linear-gradient(135deg, #FFFFFF 0%, ${currentSlideData.color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {currentSlideData.title}
            </Typography>
            
            {/* Year */}
            <Typography sx={{
              fontSize: { xs: '1rem', md: '1.5rem' },
              fontWeight: 300,
              color: '#8B949E',
              mb: { xs: 2, md: 3 },
              letterSpacing: { xs: '2px', md: '4px' },
            }}>
              {currentSlideData.year}
            </Typography>
            
            {/* Description */}
            <Typography sx={{
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              color: '#CCCCCC',
              mb: { xs: 3, md: 4 },
              lineHeight: 1.8,
              maxWidth: { xs: '90%', md: '600px' },
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
            }}>
              {currentSlideData.description}
            </Typography>
            
            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 2, md: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              width: { xs: '100%', sm: 'auto' },
            }}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={currentSlideData.action}
                sx={{
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${currentSlideData.color} 0%, #FFE81F 100%)`,
                  color: '#000000',
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '1px', md: '2px' },
                  borderRadius: '0px',
                  boxShadow: `0 8px 25px ${currentSlideData.color}40`,
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    background: `linear-gradient(135deg, #FFE81F 0%, ${currentSlideData.color} 100%)`,
                    transform: { xs: 'none', md: 'translateY(-3px)' },
                    boxShadow: `0 12px 35px ${currentSlideData.color}60`,
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                EXPLORE NOW
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => navigate('/characters')}
                sx={{
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 700,
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '1px', md: '2px' },
                  borderRadius: '0px',
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: currentSlideData.color,
                    color: currentSlideData.color,
                    transform: { xs: 'none', md: 'translateY(-2px)' },
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

      {/* Side Navigation Dots */}
      <Box sx={{
        position: 'absolute',
        right: { xs: '3%', md: '5%' },
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 2,
      }}>
        {slides.map((slide, index) => (
          <Box 
            key={index}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              cursor: 'pointer',
              opacity: index === currentSlide ? 1 : 0.4,
              transition: 'all 0.4s ease',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={() => handleSlideSelect(index)}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}>
              {index === currentSlide ? (
                <FiberManualRecord sx={{ 
                  color: slide.color, 
                  fontSize: '0.8rem',
                  filter: `drop-shadow(0 0 8px ${slide.color})`,
                }} />
              ) : (
                <RadioButtonUnchecked sx={{ 
                  color: '#FFFFFF', 
                  fontSize: '0.8rem',
                }} />
              )}
              <Typography sx={{
                color: index === currentSlide ? slide.color : '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '1px',
                minWidth: '20px',
              }}>
                {String(index + 1).padStart(2, '0')}
              </Typography>
            </Box>
            
            {index === currentSlide && (
              <Slide direction="left" in timeout={400}>
                <Typography sx={{
                  color: slide.color,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>
                  {slide.category}
                </Typography>
              </Slide>
            )}
          </Box>
        ))}
      </Box>

      {/* Bottom HUD */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1001,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: { xs: 1.5, md: 3 },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 0 },
      }}>
        {/* Navigation Controls */}
        <Box sx={{ 
          display: { xs: 'flex', md: 'flex' }, 
          alignItems: 'center', 
          gap: 2,
          order: { xs: 2, md: 1 },
        }}>
          <IconButton 
            onClick={handlePrevSlide}
            disabled={isTransitioning}
            sx={{ 
              color: '#FFFFFF', 
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': { 
                color: '#FFE81F',
                borderColor: '#FFE81F',
                backgroundColor: 'rgba(255, 232, 31, 0.1)',
              },
              '&:disabled': {
                opacity: 0.3,
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton 
            onClick={handleNextSlide}
            disabled={isTransitioning}
            sx={{ 
              color: '#FFFFFF', 
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': { 
                color: '#FFE81F',
                borderColor: '#FFE81F',
                backgroundColor: 'rgba(255, 232, 31, 0.1)',
              },
              '&:disabled': {
                opacity: 0.3,
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
        
        {/* Progress Indicator */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, md: 2 },
          order: { xs: 1, md: 2 },
        }}>
          <Typography sx={{ 
            color: currentSlideData.color, 
            fontSize: { xs: '0.8rem', md: '1rem' }, 
            fontWeight: 700,
            textShadow: `0 0 10px ${currentSlideData.color}`,
          }}>
            {String(currentSlide + 1).padStart(2, '0')}
          </Typography>
          <Box sx={{ 
            width: { xs: 100, md: 150 }, 
            height: 3, 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <Box sx={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${currentSlideData.color} 0%, #FFE81F 100%)`,
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 0 10px ${currentSlideData.color}`,
            }} />
          </Box>
          <Typography sx={{ 
            color: '#8B949E', 
            fontSize: { xs: '0.7rem', md: '0.9rem' },
          }}>
            {String(slides.length).padStart(2, '0')}
          </Typography>
        </Box>
      </Box>

      {/* Mobile Dots Navigation */}
      <Box sx={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1002,
        display: { xs: 'flex', md: 'none' },
        gap: 1,
      }}>
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleSlideSelect(index)}
            sx={{
              width: index === currentSlide ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: index === currentSlide ? currentSlideData.color : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: index === currentSlide ? currentSlideData.color : 'rgba(255, 255, 255, 0.6)',
              },
            }}
          />
        ))}
      </Box>

      {/* Decorative Light Effects */}
      <Box sx={{
        position: 'absolute',
        top: '15%',
        left: '3%',
        width: '2px',
        height: '300px',
        background: `linear-gradient(180deg, transparent 0%, ${currentSlideData.color} 50%, transparent 100%)`,
        opacity: 0.6,
        zIndex: 50,
        transition: 'all 1s ease',
        display: { xs: 'none', md: 'block' },
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '150px',
        height: '2px',
        background: `linear-gradient(90deg, transparent 0%, #4FC3F7 50%, transparent 100%)`,
        opacity: 0.8,
        zIndex: 50,
        display: { xs: 'none', md: 'block' },
      }} />
      
      <Box sx={{
        position: 'absolute',
        top: '30%',
        right: '15%',
        width: '1px',
        height: '100px',
        background: `linear-gradient(180deg, transparent 0%, #FF6B35 50%, transparent 100%)`,
        opacity: 0.4,
        zIndex: 50,
        display: { xs: 'none', md: 'block' },
      }} />
    </Box>
  );
};

export default UltraCinematicHome;
