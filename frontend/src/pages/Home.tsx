import Container from "@mui/material/Container";
import ProductCard from "../components/porductcard";
import Grid from "@mui/material/GridLegacy";
import { useState, useEffect } from "react";
import type { Product } from "../types/Prouduct";
import { BASE_URL } from "../constants/baseUrl";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/product`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="info">No products available at the moment.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item md={4} lg={3} key={product._id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 