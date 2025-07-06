
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { store } from './store';
import { SearchProvider } from './contexts/SearchContext';
import Layout from './components/Layout/Layout';
import UltraCinematicHome from './components/Home/UltraCinematicHome';
import CinematicCharactersList from './components/Characters/CinematicCharactersList';
import CharacterDetail from './components/Characters/CharacterDetail';
import CinematicPlanetsList from './components/Planets/CinematicPlanetsList';
import PlanetDetail from './components/Planets/PlanetDetail';
import CinematicStarshipsList from './components/Starships/CinematicStarshipsList';
import StarshipDetail from './components/Starships/StarshipDetail';
import CinematicFilmsList from './components/Films/CinematicFilmsList';
import NotFound from './components/NotFound/NotFound';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFE81F', // Star Wars yellow
      contrastText: '#000',
    },
    secondary: {
      main: '#FF6B35', // Orange accent
    },
    background: {
      default: '#0D1117', // Dark space background
      paper: '#161B22', // Card background
    },
    text: {
      primary: '#F0F6FC',
      secondary: '#8B949E',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      background: 'linear-gradient(45deg, #FFE81F, #FF6B35)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      color: '#FFE81F',
    },
    h3: {
      fontWeight: 600,
      color: '#F0F6FC',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #161B22 0%, #1C2128 100%)',
          border: '1px solid #30363D',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(255, 232, 31, 0.15)',
            border: '1px solid #FFE81F',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <SearchProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<UltraCinematicHome />} />
              <Route path="characters" element={<CinematicCharactersList />} />
              <Route path="character/:id" element={<CharacterDetail />} />
              <Route path="planets" element={<CinematicPlanetsList />} />
              <Route path="planet/:id" element={<PlanetDetail />} />
              <Route path="starships" element={<CinematicStarshipsList />} />
              <Route path="starship/:id" element={<StarshipDetail />} />
              <Route path="films" element={<CinematicFilmsList />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          </Router>
        </ThemeProvider>
      </SearchProvider>
    </Provider>
  );
}

export default App
