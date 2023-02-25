import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  useTheme,
} from '@mui/material';
import { Formik, useFormik } from 'formik';
import BaseContainer from 'components/BaseContainer';

const LabelTextField = ({ label, children }) => {
  return (
    <Box m="1.5rem 1rem">
      <FormControl variant="standard" sx={{ width: '100%' }}>
        <FormLabel>{label}</FormLabel>
        {children}
      </FormControl>
    </Box>
  );
};

const categories = [
  {
    value: 1,
    label: 'Category 1',
  },
  {
    value: 2,
    label: 'Category 2',
  },
  {
    value: 3,
    label: 'Category 3',
  },
];

const AddProduct = () => {
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      name: '',
      brand: '',
      price: '',
      description: '',
      isFeatured: false,
      countInStock: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const handleFormSubmit = () => {
    console.log('submit');
  };

  return (
    <BaseContainer title="Add Product" subtitle="Add the product's data below">
      <Box mt="2rem" sx={{ background: theme.palette.background.alt }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Box></Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <LabelTextField label="Product name">
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </LabelTextField>
              <LabelTextField label="Category">
                <TextField
                  select
                  name="category"
                  // helperText="Please select a category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </LabelTextField>
              <LabelTextField label="Brand">
                <TextField
                  fullWidth
                  size="small"
                  name="brand"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.brand}
                />
              </LabelTextField>
              <LabelTextField label="Price">
                <TextField
                  fullWidth
                  size="small"
                  name="price"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
              </LabelTextField>
              <LabelTextField label="Count in stock">
                <TextField
                  fullWidth
                  size="small"
                  name="countInStock"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.countInStock}
                />
              </LabelTextField>
              <LabelTextField>
                <FormControlLabel
                  label="Is featured?"
                  labelPlacement="end"
                  control={
                    <Checkbox
                      sx={{
                        color: theme.palette.secondary[500],
                        '&.Mui-checked': {
                          color: theme.palette.secondary[500],
                        },
                      }}
                      name="isFeatured"
                      onChange={formik.handleChange}
                      value={formik.values.isFeatured}
                    />
                  }
                />
              </LabelTextField>
              <LabelTextField label="Description">
                <TextField
                  fullWidth
                  name="description"
                  multiline
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  rows={4}
                />
              </LabelTextField>
              <LabelTextField>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
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
                    Publish Product
                  </Button>
                </Box>
              </LabelTextField>
            </Grid>
          </Grid>
        </form>
      </Box>
    </BaseContainer>
  );
};

export default AddProduct;
