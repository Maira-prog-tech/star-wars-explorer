import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';
import { 
  Person, 
  Public, 
  RocketLaunch, 
  Movie,
  Home
} from '@mui/icons-material';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getTabValue = () => {
    if (location.pathname === '/') return 0;
    if (location.pathname.startsWith('/characters')) return 1;
    if (location.pathname.startsWith('/planets')) return 2;
    if (location.pathname.startsWith('/starships')) return 3;
    if (location.pathname.startsWith('/films')) return 4;
    return 0;
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(90deg, #161B22 0%, #21262D 100%)',
      borderBottom: '2px solid #30363D',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      position: 'fixed',
      top: { xs: '56px', md: '64px' }, 
      left: 0,
      right: 0,
      zIndex: 1200,
    }}>
      <Tabs 
        value={getTabValue()} 
        aria-label="navigation tabs"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#FFE81F',
            height: '3px',
          },
          '& .MuiTab-root': {
            color: '#8B949E',
            fontWeight: 600,
            fontSize: { xs: '0.8rem', md: '1rem' },
            textTransform: 'none',
            minHeight: { xs: '40px', md: '64px' },
            minWidth: { xs: '50px', md: '120px' },
            padding: { xs: '4px 6px', md: '12px 16px' },
            transition: 'all 0.3s ease',
            '&:hover': {
              color: '#FFE81F',
              transform: { xs: 'none', md: 'translateY(-2px)' },
            },
            '&.Mui-selected': {
              color: '#FFE81F',
            },
          },
          '& .MuiSvgIcon-root': {
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            marginBottom: { xs: '2px', md: '4px' },
          },
        }}
      >
        <Tab
          icon={<Home />}
          label="Home"
          onClick={() => navigate('/')}
          sx={{
            color: '#8B949E',
            fontWeight: 600,
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#FFE81F',
            },
            '&:hover': {
              color: '#F0F6FC',
              backgroundColor: '#21262D50',
            },
          }}
        />
        <Tab
          icon={<Person />}
          label="Characters"
          onClick={() => navigate('/characters')}
          sx={{
            color: '#8B949E',
            fontWeight: 600,
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#FFE81F',
            },
            '&:hover': {
              color: '#F0F6FC',
              backgroundColor: '#21262D50',
            },
          }}
        />
        <Tab
          icon={<Public />}
          label="Planets"
          onClick={() => navigate('/planets')}
          sx={{
            color: '#8B949E',
            fontWeight: 600,
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#FFE81F',
            },
            '&:hover': {
              color: '#F0F6FC',
              backgroundColor: '#21262D50',
            },
          }}
        />
        <Tab
          icon={<RocketLaunch />}
          label="Starships"
          onClick={() => navigate('/starships')}
          sx={{
            color: '#8B949E',
            fontWeight: 600,
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#FFE81F',
            },
            '&:hover': {
              color: '#F0F6FC',
              backgroundColor: '#21262D50',
            },
          }}
        />
        <Tab
          icon={<Movie />}
          label="Films"
          onClick={() => navigate('/films')}
          sx={{
            color: '#8B949E',
            fontWeight: 600,
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#FFE81F',
            },
            '&:hover': {
              color: '#F0F6FC',
              backgroundColor: '#21262D50',
            },
          }}
        />
      </Tabs>
    </Box>
  );
};

export default Navigation;
