import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Box,
} from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchStarships, setSearchQuery } from '../../store/slices/starshipsSlice';
import { extractIdFromUrl } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import SearchBar from '../Common/SearchBar';
import Pagination from '../Common/Pagination';
import type { RootState } from '../../store';
import type { Starship } from '../../types';

const StarshipsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => (state.starships as any).items);
  const status = useAppSelector((state: RootState) => (state.starships as any).status);
  const error = useAppSelector((state: RootState) => (state.starships as any).error);
  const pagination = useAppSelector((state: RootState) => (state.starships as any).pagination);
  const search = useAppSelector((state: RootState) => (state.starships as any).search);

  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    dispatch(fetchStarships({ page: 1 }));
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      dispatch(fetchStarships({ page: 1, search: query || undefined }));
    }, 500);

    setSearchTimeout(timeout);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchStarships({ 
      page, 
      search: search.query || undefined 
    }));
  };

  const handleStarshipClick = (url: string) => {
    const id = extractIdFromUrl(url);
    navigate(`/starship/${id}`);
  };

  const handleRetry = () => {
    dispatch(fetchStarships({ 
      page: pagination.currentPage, 
      search: search.query || undefined 
    }));
  };

  const formatCost = (cost: string) => {
    if (cost === 'unknown') return 'Unknown';
    const num = parseInt(cost);
    if (isNaN(num)) return cost;
    return `${num.toLocaleString()} credits`;
  };

  if (status === 'loading' && items.length === 0) {
    return <LoadingSpinner message="Loading starships..." />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Star Wars Starships
      </Typography>

      <Box sx={{ mb: 3 }}>
        <SearchBar
          value={search.query}
          onChange={handleSearch}
          onSearch={handleSearch}
          placeholder="Search starships by name..."
          disabled={status === 'loading'}
        />
      </Box>

      {error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {status === 'success' && items.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No starships found
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
        {items.map((starship: Starship) => (
          <Box key={extractIdFromUrl(starship.url)}>
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
                onClick={() => handleStarshipClick(starship.url)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <RocketLaunch sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="h2">
                      {starship.name}
                    </Typography>
                  </Box>

                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Model:
                      </Typography>
                      <Typography variant="body2">
                        {starship.model}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Manufacturer:
                      </Typography>
                      <Typography variant="body2">
                        {starship.manufacturer}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Class:
                      </Typography>
                      <Chip 
                        label={starship.starship_class} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Max Speed:
                      </Typography>
                      <Typography variant="body2">
                        {starship.max_atmosphering_speed === 'unknown' || starship.max_atmosphering_speed === 'n/a' 
                          ? 'Unknown' 
                          : `${starship.max_atmosphering_speed} km/h`}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Cost:
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {formatCost(starship.cost_in_credits)}
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
          <LoadingSpinner message="Loading more starships..." />
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

export default StarshipsList;
