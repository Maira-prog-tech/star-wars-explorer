import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardActionArea,
  Container,
  Fade,
  IconButton,
} from '@mui/material';
import { 
  Person, 
  Public, 
  RocketLaunch, 
  Movie,
  PlayArrow,
  VolumeOff,
  Menu as MenuIcon,
} from '@mui/icons-material';

const CinematicHome: React.FC = () => {
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);
  
  const heroSections = [
    {
      title: 'EXPLORE WORLD OF',
      subtitle: 'STAR WARS',
      description: 'The Star Wars universe is a large-scale science fiction media franchise created by George Lucas that includes films, TV series, books, comics, video games, and more. The main saga, also known as the "Skywalker Saga", consists of nine episodes, and also includes individual films and TV series set in the same universe.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
      buttonText: 'WATCH TRAILER',
    },
    {
      title: 'ABOUT',
      subtitle: '',
      description: 'Star Wars is a multi-genre mythology and multimedia franchise created by George Lucas in 1976. Comprising movies, novels, comics, video games, toys, and numerous television series - the Star Wars franchise employs archetypal motifs common to religions, classical mythology, and political climax, as well as musical motifs of those same aspects.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
      buttonText: 'EXPLORE UNIVERSE',
    },
  ];
  
  const categories = [
    {
      title: 'Characters',
      description: 'Discover heroes, villains, and legends from across the galaxy',
      icon: <Person />,
      path: '/characters',
      count: '87+ Characters',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    },
    {
      title: 'Films',
      description: 'Explore the epic saga that changed cinema forever',
      icon: <Movie />,
      path: '/films',
      count: '6 Episodes',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    },
    {
      title: 'Planets',
      description: 'Journey to worlds beyond imagination',
      icon: <Public />,
      path: '/planets',
      count: '60+ Planets',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
    },
    {
      title: 'Starships',
      description: 'Command the most powerful vessels in the galaxy',
      icon: <RocketLaunch />,
      path: '/starships',
      count: '36+ Starships',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSections.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroSections.length]);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      width: '100%',
      position: 'relative',
    }}>
      
      <Box sx={{ position: 'fixed', top: 32, left: 32, zIndex: 1000 }}>
        <IconButton sx={{ color: '#FFE81F', fontSize: '1.5rem' }}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Typography sx={{ color: '#FFE81F', fontWeight: 700, mt: 1, fontSize: '0.9rem', letterSpacing: '2px' }}>
          MENU
        </Typography>
      </Box>
      
      
      <Box sx={{ position: 'fixed', top: '50%', right: 32, transform: 'translateY(-50%)', zIndex: 1000 }}>
        {['01', '02', '03', '04', '05', '06'].map((num, index) => (
          <Box key={num} sx={{ mb: 3, textAlign: 'center', cursor: 'pointer' }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              backgroundColor: index === 0 ? '#FFE81F' : '#30363D',
              mx: 'auto',
              mb: 1,
            }} />
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem', fontWeight: 600 }}>
              {num}
            </Typography>
          </Box>
        ))}
      </Box>

      
      <Box sx={{ 
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, rgba(13, 17, 23, 0.9) 0%, rgba(33, 38, 45, 0.7) 100%), url(${heroSections[currentHero].image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
       
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
            
            <Box sx={{ flex: 1, pr: { md: 8 } }}>
              <Fade in timeout={1000} key={currentHero}>
                <Box>
                  <Typography sx={{ 
                    color: '#FFE81F', 
                    fontSize: '0.9rem', 
                    fontWeight: 700, 
                    letterSpacing: '3px',
                    mb: 2,
                  }}>
                    {heroSections[currentHero].title.includes('EXPLORE') ? 'HOME' : 'DESCRIPTION'} ///
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
                    {heroSections[currentHero].title.includes('EXPLORE') ? (
                      <>
                        EXPLORE WORLD OF<br />
                        <span style={{ background: 'linear-gradient(45deg, #FFE81F, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          STAR WARS
                        </span>
                      </>
                    ) : (
                      <span style={{ background: 'linear-gradient(45deg, #FFE81F, #FF6B35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        ABOUT
                      </span>
                    )}
                  </Typography>
                  
                  <Typography 
                    sx={{ 
                      color: '#8B949E',
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      lineHeight: 1.6,
                      mb: 4,
                      maxWidth: '500px',
                    }}
                  >
                    {heroSections[currentHero].description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrow />}
                      onClick={() => navigate('/films')}
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
                      {heroSections[currentHero].buttonText}
                    </Button>
                    
                    <IconButton sx={{ color: '#8B949E' }}>
                      <VolumeOff />
                    </IconButton>
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Box>
        </Container>
        
        
        <Box sx={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography sx={{ color: '#FFE81F', fontSize: '0.8rem', fontWeight: 700 }}>
              {String(currentHero + 1).padStart(2, '0')}
            </Typography>
            <Box sx={{ flex: 1, height: 2, backgroundColor: '#30363D', borderRadius: 1 }}>
              <Box sx={{ 
                width: `${((currentHero + 1) / heroSections.length) * 100}%`, 
                height: '100%', 
                backgroundColor: '#FFE81F',
                borderRadius: 1,
                transition: 'width 0.5s ease',
              }} />
            </Box>
            <Typography sx={{ color: '#8B949E', fontSize: '0.8rem' }}>
              {String(heroSections.length).padStart(2, '0')}
            </Typography>
          </Box>
        </Box>
      </Box>

     
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #0D1117 0%, #161B22 100%)' }}>
        <Container maxWidth="lg">
          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 4,
            }}
          >
            {categories.map((category, index) => (
              <Fade key={category.title} in timeout={1000 + index * 200}>
                <Card
                    sx={{
                      height: '300px',
                      background: `linear-gradient(135deg, rgba(13, 17, 23, 0.8) 0%, rgba(33, 38, 45, 0.6) 100%), url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: '1px solid #30363D',
                      borderRadius: '16px',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(255, 232, 31, 0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardActionArea 
                      onClick={() => navigate(category.path)}
                      sx={{ 
                        height: '100%', 
                        background: 'linear-gradient(135deg, rgba(13, 17, 23, 0.8) 0%, rgba(33, 38, 45, 0.6) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        p: 3,
                      }}
                    >
                      <Box sx={{ mb: 2 }}>
                        {React.cloneElement(category.icon, { sx: { fontSize: '2.5rem', color: '#FFE81F' } })}
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 1, 
                          color: '#FFFFFF',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#8B949E', 
                          mb: 2,
                          lineHeight: 1.4,
                        }}
                      >
                        {category.description.substring(0, 60)}...
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: '#FFE81F',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                        }}
                      >
                        {category.count}
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

export default CinematicHome;
