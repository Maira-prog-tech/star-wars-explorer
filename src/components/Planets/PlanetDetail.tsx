import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,

  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ArrowBack, Public } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPlanetById, clearCurrentPlanet } from '../../store/slices/planetsSlice';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import type { RootState } from '../../store';

const PlanetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const planet = useAppSelector((state: RootState) => (state.planets as any).currentItem);
  const status = useAppSelector((state: RootState) => (state.planets as any).status);
  const error = useAppSelector((state: RootState) => (state.planets as any).error);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlanetById(id));
    }
    
    return () => {
      dispatch(clearCurrentPlanet());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate('/planets');
  };

  const handleRetry = () => {
    if (id) {
      dispatch(fetchPlanetById(id));
    }
  };

  const formatPopulation = (population: string) => {
    if (population === 'unknown') return 'Unknown';
    const num = parseInt(population);
    if (isNaN(num)) return population;
    return num.toLocaleString();
  };

  if (status === 'loading') {
    return <LoadingSpinner message="Loading planet details..." />;
  }

  if (error) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Planets
        </Button>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </Box>
    );
  }

  if (!planet) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Planets
        </Button>
        <Typography variant="h6">Planet not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={handleBack}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Planets
      </Button>

      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Public sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" component="h1">
              {planet.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Physical Characteristics
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Diameter"
                    secondary={planet.diameter === 'unknown' ? 'Unknown' : `${planet.diameter} km`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Rotation Period"
                    secondary={planet.rotation_period === 'unknown' ? 'Unknown' : `${planet.rotation_period} hours`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Orbital Period"
                    secondary={planet.orbital_period === 'unknown' ? 'Unknown' : `${planet.orbital_period} days`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gravity"
                    secondary={planet.gravity}
                  />
                </ListItem>
              </List>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Environmental Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Climate"
                    secondary={planet.climate}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Terrain"
                    secondary={planet.terrain}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Surface Water"
                    secondary={planet.surface_water === 'unknown' ? 'Unknown' : `${planet.surface_water}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Population"
                    secondary={formatPopulation(planet.population)}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Films Featured In
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {planet.films.length} film{planet.films.length !== 1 ? 's' : ''}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Notable Residents
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {planet.residents.length} resident{planet.residents.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(planet.created).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last edited: {new Date(planet.edited).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlanetDetail;
