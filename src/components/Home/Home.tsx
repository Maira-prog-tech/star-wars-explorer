import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActionArea,
  Container,
  Fade,
} from '@mui/material';
import { 
  Person, 
  Public, 
  RocketLaunch, 
  Movie,
  ArrowForward,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Characters',
      description: 'Discover heroes, villains, and legends from across the galaxy',
      icon: <Person sx={{ fontSize: '3rem', color: '#FFE81F' }} />,
      path: '/characters',
      gradient: 'linear-gradient(135deg, #FFE81F20, #FFE81F10)',
      count: '87+ Characters',
    },
    {
      title: 'Films',
      description: 'Explore the epic saga that changed cinema forever',
      icon: <Movie sx={{ fontSize: '3rem', color: '#FF6B35' }} />,
      path: '/films',
      gradient: 'linear-gradient(135deg, #FF6B3520, #FF6B3510)',
      count: '6 Episodes',
    },
    {
      title: 'Planets',
      description: 'Journey to worlds beyond imagination',
      icon: <Public sx={{ fontSize: '3rem', color: '#4FC3F7' }} />,
      path: '/planets',
      gradient: 'linear-gradient(135deg, #4FC3F720, #4FC3F710)',
      count: '60+ Planets',
    },
    {
      title: 'Starships',
      description: 'Command the most powerful vessels in the galaxy',
      icon: <RocketLaunch sx={{ fontSize: '3rem', color: '#81C784' }} />,
      path: '/starships',
      gradient: 'linear-gradient(135deg, #81C78420, #81C78410)',
      count: '36+ Starships',
    },
  ];

  return (
    <Box sx={{ minHeight: '80vh' }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                fontWeight: 900,
                background: 'linear-gradient(45deg, #FFE81F, #FF6B35)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                letterSpacing: '3px',
              }}
            >
              STAR WARS
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                color: '#F0F6FC',
                mb: 4,
                fontWeight: 300,
                letterSpacing: '1px',
              }}
            >
              EXPLORER
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#8B949E',
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              "A long time ago in a galaxy far, far away..." <br />
              Explore the vast universe of Star Wars through characters, films, planets, and starships.
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/films')}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #FFE81F, #FF6B35)',
                color: '#000',
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(255, 232, 31, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF6B35, #FFE81F)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 35px rgba(255, 232, 31, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Begin Your Journey
            </Button>
          </Box>
        </Fade>

        {/* Categories Grid */}
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
            mt: 4,
          }}
        >
          {categories.map((category, index) => (
            <Fade key={category.title} in timeout={1000 + index * 200}>
              <Card
                  sx={{
                    height: '100%',
                    background: category.gradient,
                    border: '1px solid #30363D',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(90deg, ${category.icon.props.sx.color}, ${category.icon.props.sx.color}80)`,
                    },
                  }}
                >
                  <CardActionArea 
                    onClick={() => navigate(category.path)}
                    sx={{ height: '100%', p: 3 }}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                      <Box sx={{ mb: 2 }}>
                        {category.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 2, 
                          color: '#F0F6FC' 
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#8B949E', 
                          mb: 3,
                          lineHeight: 1.5,
                        }}
                      >
                        {category.description}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: category.icon.props.sx.color,
                          fontWeight: 600,
                          fontSize: '0.9rem',
                        }}
                      >
                        {category.count}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            </Fade>
          ))}
        </Box>

        {/* Quote Section */}
        <Fade in timeout={2000}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#FFE81F',
                fontStyle: 'italic',
                fontWeight: 300,
                mb: 2,
              }}
            >
              "May the Force be with you."
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#8B949E',
                fontWeight: 500,
              }}
            >
              - Obi-Wan Kenobi
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Home;
