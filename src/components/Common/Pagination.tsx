import React from 'react';
import { Box, Pagination as MuiPagination, Typography } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  disabled = false,
}) => {
  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      gap={2} 
      sx={{ mt: 3 }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing page {currentPage} of {totalPages} ({totalCount} total items)
      </Typography>
      
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        disabled={disabled}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default Pagination;
