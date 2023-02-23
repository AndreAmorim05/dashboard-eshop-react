import {
  Box,
  Button,
  Card,
  Grid,
  styled,
  TextField,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMG from 'assets/images/illustrations/forgot_password.svg';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
}));

const ForgotPasswordRoot = styled(JustifyBox)(({ theme }) => ({
  background: theme.palette.background.alt,
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');

  const handleFormSubmit = () => {
    console.log(email);
  };

  return (
    <ForgotPasswordRoot>
      <Card
        className="card"
        sx={{ background: theme.palette.background.default }}
      >
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src={IMG} alt="" />
            </JustifyBox>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="email"
                  name="email"
                  size="small"
                  label="Email"
                  value={email}
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    color: theme.palette.primary[900],
                    backgroundColor: theme.palette.secondary[500],
                    '&:hover': {
                      color: theme.palette.secondary[500],
                      backgroundColor: theme.palette.background.alt,
                    },
                  }}
                >
                  Reset Password
                </Button>

                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    mt: 2,
                    color: theme.palette.secondary[500],
                  }}
                >
                  Go Back
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default ForgotPassword;
