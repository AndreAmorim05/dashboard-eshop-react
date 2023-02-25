import {
  Box,
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import FilterIcon from '@mui/icons-material/Filter';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';

const initialImages = [];

const ImageDropzone = ({ form, field = [], ...props }) => {
  const [images, setImages] = useState(initialImages);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const updatedImages = acceptedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        dataURL: URL.createObjectURL(file),
      }));
      const newImages = [...images, ...updatedImages];
      setImages(newImages);
      form.setFieldValue(field.name, newImages);
    },
    [field.name, form, images]
  );

  const handleRemoveImage = useCallback(
    (index) => {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
      form.setFieldValue(field.name, newImages);
    },
    [field.name, form, images]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <Grid container>
      <Grid item sm={12} sx={{ width: '100%' }}>
        <Box
          {...getRootProps()}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 250,
            width: '100%',
            border: '2px dashed grey',
            borderRadius: '8px',
          }}
        >
          <input {...getInputProps()} {...field} {...props} multiple />
          <FilterIcon fontSize="large" />
          <Typography variant="body1" color="textSecondary">
            <UploadFileIcon fontSize="8rem" />
            Drop your images here, or Browse
          </Typography>
        </Box>
      </Grid>
      <Grid item sm={12} sx={{ width: '100%' }}>
        {images.length > 0 && (
          <List sx={{ width: '100%' }}>
            {images.map((image, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={image.dataURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={image.name}
                  secondary={`${(image.size / 1024).toFixed(2)} KB`}
                />
                <IconButton
                  variant="text"
                  color="error"
                  onClick={() => handleRemoveImage(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
    </Grid>
  );
};

export default ImageDropzone;
