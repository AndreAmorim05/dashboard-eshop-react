import { Box } from '@mui/material';
import Header from './Header';

import React from 'react';

const BaseContainer = ({ title, subtitle, children }) => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={title} subtitle={subtitle} />
      {children}
    </Box>
  );
};

export default BaseContainer;
