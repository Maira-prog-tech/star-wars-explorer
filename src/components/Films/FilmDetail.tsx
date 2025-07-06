import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { RootState } from '../../store';
import { fetchFilmById, clearCurrentFilm } from '../../store/slices/filmsSlice';

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentFilm, status, error } = useAppSelector((state: RootState) => state.films as any);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmById(id));
    }
    return () => {
      dispatch(clearCurrentFilm());
    };
  }, [dispatch, id]);

  if (status === 'loading' || !currentFilm) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        {error ? <Typography color="error">{error}</Typography> : <CircularProgress />}
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Button startIcon={<ArrowBack />} sx={{ mb: 4 }} onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Episode {currentFilm.episode_id}: {currentFilm.title}
      </Typography>
      <Typography sx={{ mb: 1 }}>Director: {currentFilm.director}</Typography>
      <Typography sx={{ mb: 1 }}>Producer: {currentFilm.producer}</Typography>
      <Typography sx={{ mb: 1 }}>Release Date: {currentFilm.release_date}</Typography>
      <Typography variant="h6" sx={{ mt: 4, mb:1 }}>Opening Crawl</Typography>
      <Typography whiteSpace="pre-line">{currentFilm.opening_crawl}</Typography>
    </Container>
  );
};

export default FilmDetail;
