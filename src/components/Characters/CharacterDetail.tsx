import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,

  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ArrowBack, Person } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCharacterById, clearCurrentCharacter } from '../../store/slices/charactersSlice';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import type { RootState } from '../../store';

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const character = useAppSelector((state: RootState) => (state.characters as any).currentItem);
  const status = useAppSelector((state: RootState) => (state.characters as any).status);
  const error = useAppSelector((state: RootState) => (state.characters as any).error);

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterById(id));
    }
    
    return () => {
      dispatch(clearCurrentCharacter());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate('/');
  };

  const handleRetry = () => {
    if (id) {
      dispatch(fetchCharacterById(id));
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner message="Loading character details..." />;
  }

  if (error) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Characters
        </Button>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </Box>
    );
  }

  if (!character) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Characters
        </Button>
        <Typography variant="h6">Character not found</Typography>
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
        Back to Characters
      </Button>

      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Person sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" component="h1">
              {character.name}
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
                    primary="Height"
                    secondary={character.height === 'unknown' ? 'Unknown' : `${character.height} cm`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Mass"
                    secondary={character.mass === 'unknown' ? 'Unknown' : `${character.mass} kg`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Hair Color"
                    secondary={character.hair_color}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Skin Color"
                    secondary={character.skin_color}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Eye Color"
                    secondary={character.eye_color}
                  />
                </ListItem>
              </List>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Birth Year"
                    secondary={character.birth_year}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gender"
                    secondary={
                      <Chip 
                        label={character.gender} 
                        size="small" 
                        color={character.gender === 'male' ? 'primary' : 
                               character.gender === 'female' ? 'secondary' : 'default'}
                      />
                    }
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
                Films Appeared In
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {character.films.length} film{character.films.length !== 1 ? 's' : ''}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Starships Piloted
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {character.starships.length} starship{character.starships.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </Box>

          <Box mt={3}>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(character.created).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last edited: {new Date(character.edited).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CharacterDetail;
