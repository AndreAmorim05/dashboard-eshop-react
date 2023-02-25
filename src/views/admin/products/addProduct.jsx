import React, { useState } from 'react';
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
import { Formik, Field, ErrorMessage } from 'formik';
import BaseContainer from 'components/BaseContainer';
import ImageDropzone from 'components/ImageDropzone';

const LabelTextField = ({ label, children }) => {
  return (
    <Box m="1.5rem 1.5rem">
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
  const [images, setImages] = useState([]);

  const handleFormSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <BaseContainer title="Add Product" subtitle="Add the product's data below">
      <Box
        mt="2rem"
        sx={{
          borderRadius: '8px',
          background: theme.palette.background.alt,
        }}
      >
        <Formik
          initialValues={{
            name: '',
            brand: '',
            price: '',
            image: [],
            description: '',
            isFeatured: false,
            countInStock: '',
          }}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(values);
              }}
            >
              <Grid container>
                <Grid item sm={6} xs={12}>
                  <LabelTextField label="Add Image">
                    <Field
                      component={ImageDropzone}
                      name="image"
                      field={images}
                    ></Field>
                  </LabelTextField>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <LabelTextField label="Product name">
                    <Field
                      fullWidth
                      size="small"
                      name="name"
                      type="text"
                      as={TextField}
                    />
                  </LabelTextField>
                  <LabelTextField label="Category">
                    <Field
                      select
                      name="category"
                      // helperText="Please select a category"
                      as={TextField}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </LabelTextField>
                  <LabelTextField label="Brand">
                    <Field
                      fullWidth
                      size="small"
                      name="brand"
                      type="text"
                      as={TextField}
                    />
                  </LabelTextField>
                  <LabelTextField label="Price">
                    <Field
                      fullWidth
                      size="small"
                      name="price"
                      type="text"
                      as={TextField}
                    />
                  </LabelTextField>
                  <LabelTextField label="Count in stock">
                    <Field
                      fullWidth
                      size="small"
                      name="countInStock"
                      type="text"
                      as={TextField}
                    />
                  </LabelTextField>
                  <LabelTextField>
                    <FormControlLabel
                      label="Is featured?"
                      labelPlacement="end"
                      control={
                        <Field
                          sx={{
                            color: theme.palette.secondary[500],
                            '&.Mui-checked': {
                              color: theme.palette.secondary[500],
                            },
                          }}
                          name="isFeatured"
                          as={Checkbox}
                        />
                      }
                    />
                  </LabelTextField>
                  <LabelTextField label="Description">
                    <Field
                      fullWidth
                      name="description"
                      multiline
                      rows={4}
                      as={TextField}
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
          )}
        </Formik>
      </Box>
    </BaseContainer>
  );
};

export default AddProduct;
