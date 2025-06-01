import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

const OrderSuccess: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            width: '100%',
            maxWidth: 600,
          }}
        >
          <CheckCircle
            sx={{
              fontSize: 80,
              color: 'success.main',
            }}
          />
          
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Order Placed Successfully!
          </Typography>
          
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            Thank you for your purchase. Your order has been received and is being processed.
            You will receive an email confirmation shortly with your order details.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Button
              component={Link}
              to="/my-orders"
              variant="contained"
              color="primary"
              size="large"
            >
              View Orders
            </Button>
            
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="primary"
              size="large"
            >
              Continue Shopping
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default OrderSuccess;
