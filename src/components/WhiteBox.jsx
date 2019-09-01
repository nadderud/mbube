import React from 'react';
import { Box } from 'grommet';
import MaxWidthContainer from './MaxWidthContainer';

const WhiteBox = ({ children }) => (
  <Box background="white" pad={{ vertical: 'medium' }} margin={{ bottom: 'medium' }}>
    <MaxWidthContainer margin={{ horizontal: 'auto' }}>{children}</MaxWidthContainer>
  </Box>
);

export default WhiteBox;
