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
  Chip,
} from '@mui/material';
import { ArrowBack, RocketLaunch } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStarshipById, clearCurrentStarship } from '../../store/slices/starshipsSlice';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import type { RootState } from '../../store';

const StarshipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const starship = useAppSelector((state: RootState) => (state.starships as any).currentItem);
  const status = useAppSelector((state: RootState) => (state.starships as any).status);
  const error = useAppSelector((state: RootState) => (state.starships as any).error);

  useEffect(() => {
    if (id) {
      dispatch(fetchStarshipById(id));
    }
    
    return () => {
      dispatch(clearCurrentStarship());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate('/starships');
  };

  const handleRetry = () => {
    if (id) {
      dispatch(fetchStarshipById(id));
    }
  };

  const formatNumber = (value: string, unit: string = '') => {
    if (value === 'unknown' || value === 'n/a') return 'Unknown';
    const num = parseInt(value.replace(/,/g, ''));
    if (isNaN(num)) return value;
    return `${num.toLocaleString()}${unit}`;
  };

  if (status === 'loading') {
    return <LoadingSpinner message="Loading starship details..." />;
  }

  if (error) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Starships
        </Button>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </Box>
    );
  }

  if (!starship) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Starships
        </Button>
        <Typography variant="h6">Starship not found</Typography>
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
        Back to Starships
      </Button>

      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <RocketLaunch sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1">
                {starship.name}
              </Typography>
              <Chip 
                label={starship.starship_class} 
                color="primary" 
                sx={{ mt: 1 }}
              />
            </Box>
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
                Basic Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Model"
                    secondary={starship.model}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Manufacturer"
                    secondary={starship.manufacturer}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Cost in Credits"
                    secondary={formatNumber(starship.cost_in_credits, ' credits')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Length"
                    secondary={formatNumber(starship.length, ' meters')}
                  />
                </ListItem>
              </List>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Performance Specifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Max Atmosphering Speed"
                    secondary={formatNumber(starship.max_atmosphering_speed, ' km/h')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Hyperdrive Rating"
                    secondary={formatNumber(starship.hyperdrive_rating)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="MGLT"
                    secondary={formatNumber(starship.MGLT)}
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
                Capacity & Crew
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Crew"
                    secondary={formatNumber(starship.crew)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Passengers"
                    secondary={formatNumber(starship.passengers)}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Cargo Capacity"
                    secondary={formatNumber(starship.cargo_capacity, ' kg')}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Consumables"
                    secondary={starship.consumables}
                  />
                </ListItem>
              </List>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Appearances
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Films"
                    secondary={`${starship.films.length} film${starship.films.length !== 1 ? 's' : ''}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Pilots"
                    secondary={`${starship.pilots.length} pilot${starship.pilots.length !== 1 ? 's' : ''}`}
                  />
                </ListItem>
              </List>
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(starship.created).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last edited: {new Date(starship.edited).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StarshipDetail;
