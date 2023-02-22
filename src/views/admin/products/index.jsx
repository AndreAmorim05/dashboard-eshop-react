import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BaseContainer from "components/BaseContainer";
import { useGetProducts } from "api/hooks/useProducts";
// import { useGetProductsQuery } from "state/api";


const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  // category,
  // supply,
  // stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[600]}
          gutterBottom
        >
          Category
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[300]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          {/* <Typography>Supply Left: {supply}</Typography> */}
          <Typography>Supply Left: </Typography>
          <Typography>
            {/* Yearly Sales This Year: {stat.yearlySalesTotal} */}
            Yearly Sales This Year:
          </Typography>
          <Typography>
            {/* Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits} */}
            Yearly Units Sold This Year:
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  // const { data, isLoading } = useGetProductsQuery();
  const { data, isLoading } = useGetProducts();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <BaseContainer title="PRODUCTS" subtitle="See your list of products." >
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data ? data.data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              // category,
              // supply,
              // stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                // category={category.name}
                // supply={supply}
                // stat={stat}
              />
            )
          ) : 
          <h1>No products here</h1>}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </BaseContainer>
  );
};

export default Products;