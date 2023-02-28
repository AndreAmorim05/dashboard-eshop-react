import React from 'react';
import { Box, Grid, Card, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import BaseContainer from 'components/BaseContainer';
import AnalyticEcommerce from './AnalyticEcommerce';

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const Dashboard = () => {
  return (
    <BaseContainer title={'DASHBOARD'} subtitle={'Monitor your data'}>
      <Grid container spacing={3} mt="20px">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Page Views"
            count="442,236"
            percentage={59.3}
            extra="35,000"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Users"
            count="78,250"
            percentage={70.5}
            extra="8,900"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Order"
            count="18,800"
            percentage={27.4}
            isLoss
            color="warning"
            extra="1,943"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Sales"
            count="$35,078"
            percentage={27.4}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </Grid>

        <Grid
          item
          md={8}
          sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }}
        />
      </Grid>
    </BaseContainer>
  );
};

export default Dashboard;
