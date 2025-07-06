import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { Rocket, Search } from '@mui/icons-material';
import Navigation from './Navigation';
import { useSearch } from '../../contexts/SearchContext';
import { useSearchFilter } from '../../hooks/useSearchFilter';
import SearchResults from '../Search/SearchResults';

const Layout: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  useSearchFilter(); 
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      height: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0D1117 0%, #161B22 50%, #21262D 100%)',
    }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: 'linear-gradient(90deg, #000000 0%, #1a1a1a 100%)',
          boxShadow: '0 4px 20px rgba(255, 232, 31, 0.1)',
          borderBottom: '2px solid #FFE81F',
          zIndex: 1300,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ 
          py: { xs: 0.5, md: 1 }, 
          px: { xs: 1, md: 2 },
          minHeight: { xs: '56px', md: '64px' },
        }}>
          <Rocket sx={{ 
            mr: { xs: 1, md: 2 }, 
            color: '#FFE81F', 
            fontSize: { xs: '1.5rem', md: '2rem' } 
          }} />
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              background: 'linear-gradient(45deg, #FFE81F, #FF6B35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              letterSpacing: { xs: '1px', md: '2px' },
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
            }}
          >
            STAR WARS EXPLORER
          </Typography>
          
        
          <Box sx={{ position: 'relative' }}>
            <TextField
              size="small"
              placeholder="Search characters, planets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#8B949E' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#21262D',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#30363D',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFE81F',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFE81F',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#F0F6FC',
                  '&::placeholder': {
                    color: '#8B949E',
                    opacity: 1,
                  },
                },
                width: { xs: '120px', sm: '200px', md: '300px' },
                ml: { xs: 0.5, md: 2 },
                display: { xs: 'block', sm: 'block' },
              }}
            />
            <SearchResults />
          </Box>
        </Toolbar>
      </AppBar>
      
      <Navigation />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          margin: 0,
          padding: 0,
          overflow: 'auto',
          marginTop: { xs: '96px', md: '128px' }, 
          height: 'calc(100vh - 96px)', 
        }}
      >
        <Outlet />
      </Box>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          background: 'linear-gradient(90deg, #000000 0%, #1a1a1a 100%)',
          textAlign: 'center',
          borderTop: '1px solid #30363D',
        }}
      >
        <Typography variant="body2" sx={{ color: '#8B949E' }}>
          © 2025 Star Wars Explorer • Powered by SWAPI • May the Force be with you
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
