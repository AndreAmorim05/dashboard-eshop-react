import { Typography, Box, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import FlexBetween from './FlexBetween';

const Header = ({ title, subtitle, source }) => {
  const theme = useTheme();

  return (
    <>
      {source ? (
        <FlexBetween>
          <Box>
            <Typography
              variant="h2"
              color={theme.palette.secondary[100]}
              fontWeight="bold"
              sx={{ mb: '5px' }}
            >
              {title}
            </Typography>
            <Typography variant="h5" color={theme.palette.secondary[300]}>
              {subtitle}
            </Typography>
          </Box>
          <Box>{source}</Box>
        </FlexBetween>
      ) : (
        <Box>
          <Typography
            variant="h2"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mb: '5px' }}
          >
            {title}
          </Typography>
          <Typography variant="h5" color={theme.palette.secondary[300]}>
            {subtitle}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Header;
