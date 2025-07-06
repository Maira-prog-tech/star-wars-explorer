import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {

  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CardActionArea,
} from '@mui/material';
import { Public } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchPlanets, setSearchQuery } from '../../store/slices/planetsSlice';
import { extractIdFromUrl } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import SearchBar from '../Common/SearchBar';
import Pagination from '../Common/Pagination';
import type { RootState } from '../../store';

const PlanetsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => (state.planets as any).items);
  const status = useAppSelector((state: RootState) => (state.planets as any).status);
  const error = useAppSelector((state: RootState) => (state.planets as any).error);
  const pagination = useAppSelector((state: RootState) => (state.planets as any).pagination);
  const search = useAppSelector((state: RootState) => (state.planets as any).search);

  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch(fetchPlanets({ page: 1 }));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      dispatch(fetchPlanets({ page: 1, search: query || undefined }));
    }, 500);

    setSearchTimeout(timeout);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchPlanets({ 
      page, 
      search: search.query || undefined 
    }));
  };

  const handlePlanetClick = (url: string) => {
    const id = extractIdFromUrl(url);
    navigate(`/planet/${id}`);
  };

  const handleRetry = () => {
    dispatch(fetchPlanets({ 
      page: pagination.currentPage, 
      search: search.query || undefined 
    }));
  };

  const formatPopulation = (population: string) => {
    if (population === 'unknown') return 'Unknown';
    const num = parseInt(population);
    if (isNaN(num)) return population;
    return num.toLocaleString();
  };

  if (status === 'loading' && items.length === 0) {
    return <LoadingSpinner message="Loading planets..." />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Star Wars Planets
      </Typography>

      <Box sx={{ mb: 3 }}>
        <SearchBar
          value={search.query}
          onChange={handleSearch}
          onSearch={handleSearch}
          placeholder="Search planets by name..."
          disabled={status === 'loading'}
        />
      </Box>

      {error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {status === 'success' && items.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No planets found
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {items.map((planet: any) => (
          <Box key={planet.url}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardActionArea 
                onClick={() => handlePlanetClick(planet.url)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Public sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="h2">
                      {planet.name}
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Climate:
                      </Typography>
                      <Typography variant="body2">
                        {planet.climate}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Terrain:
                      </Typography>
                      <Typography variant="body2">
                        {planet.terrain}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Population:
                      </Typography>
                      <Chip 
                        label={formatPopulation(planet.population)} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Diameter:
                      </Typography>
                      <Typography variant="body2">
                        {planet.diameter === 'unknown' ? 'Unknown' : `${planet.diameter} km`}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>

      {status === 'loading' && items.length > 0 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <LoadingSpinner message="Loading more planets..." />
        </Box>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalCount={pagination.totalCount}
        onPageChange={handlePageChange}
        disabled={status === 'loading'}
      />
    </Box>
  );
};

export default PlanetsList;
