import {
  Box,
  Card,
  Checkbox,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import IMG from 'assets/images/illustrations/login.svg';

const Paragraph = ({ children }) => {
  return <Typography variant="body2">{children}</Typography>;
};

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
}));

const JWTRoot = styled(JustifyBox)(({ theme }) => ({
  background: theme.palette.background.alt,
  minHeight: '100% !important',
  height: '100vh',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: 'j@gmail.com',
  password: '123',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Password must be 3 character length')
    .required('Password is required!'),
  email: Yup.string()
    .email('Invalid Email address')
    .required('Email is required!'),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      <Card
        className="card"
        sx={{ background: theme.palette.background.default }}
      >
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src={IMG} width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <FlexBox justifyContent="space-between">
                      <FlexBox gap={1}>
                        <Checkbox
                          size="small"
                          name="remember"
                          onChange={handleChange}
                          checked={values.remember}
                          sx={{
                            padding: 0,
                            color: theme.palette.secondary[500],
                            '&.Mui-checked': {
                              color: theme.palette.secondary[500],
                            },
                          }}
                        />

                        <Paragraph>Remember Me</Paragraph>
                      </FlexBox>

                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.secondary[500] }}
                      >
                        Forgot password?
                      </NavLink>
                    </FlexBox>

                    <LoadingButton
                      type="submit"
                      loading={loading}
                      variant="contained"
                      sx={{
                        my: 2,
                        color: theme.palette.primary[900],
                        backgroundColor: theme.palette.secondary[500],
                        '&:hover': {
                          color: theme.palette.secondary[500],
                          backgroundColor: theme.palette.background.alt,
                        },
                      }}
                    >
                      Login
                    </LoadingButton>

                    <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{
                          color: theme.palette.secondary[500],
                          marginLeft: 5,
                        }}
                      >
                        Register
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
