import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
// import Highlighter from './third-party/Highlighter';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

const MainCard = ({
  border = true,
  children,
  content = true,
  contentSX = {},
  darkTitle,
  divider = true,
  elevation,
  secondary = '',
  sx = {},
  title,
  codeHighlight,
  ...others
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={elevation || 0}
      {...others}
      sx={{
        ...sx,
        background: theme.palette.background.alt,
        border: border ? '1px solid' : 'none',
        borderRadius: 2,
        borderColor:
          theme.palette.mode === 'dark'
            ? theme.palette.divider
            : theme.palette.grey.A800,
        '& pre': {
          m: 0,
          p: '16px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem',
        },
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader
          sx={headerSX}
          titleTypographyProps={{ variant: 'subtitle1' }}
          title={title}
          action={secondary}
        />
      )}
      {darkTitle && title && (
        <CardHeader
          sx={headerSX}
          title={<Typography variant="h3">{title}</Typography>}
          action={secondary}
        />
      )}

      {/* content & header divider */}
      {title && divider && <Divider />}

      {/* card content */}
      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}

      {/* card footer - clipboard & highlighter  */}
      {codeHighlight && (
        <>
          <Divider sx={{ borderStyle: 'dashed' }} />
          {children}
          {/* <Highlighter codeHighlight={codeHighlight} main>
          </Highlighter> */}
        </>
      )}
    </Card>
  );
};

export default MainCard;
