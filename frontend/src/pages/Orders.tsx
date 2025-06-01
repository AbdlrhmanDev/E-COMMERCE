/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Divider, 
  CircularProgress,
  Button,
  Alert,
  Container,
  Paper,
  Stack,
  Chip
} from '@mui/material';
import { useAuth } from '../context/Auth/AuthContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Orders = () => {
  const { getMyOrders, myOrders, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!myOrders.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No Orders Found
          </Typography>
          <Typography color="text.secondary" paragraph>
            You haven't placed any orders yet.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Start Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            My Orders
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ 
              px: 3,
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'transform 0.2s'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
        
        <Stack spacing={2}>
          {myOrders.map((order) => (
            <Card 
              key={order._id} 
              elevation={2}
              sx={{ 
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent>
                <Stack spacing={3}>
                  {/* Order Header */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                    <Box>
                      <Typography variant="subtitle1" color="primary" fontWeight="medium">
                        Order #{order._id.slice(-6)}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                    <Chip 
                      label={`${order.orderItems.length} Items`}
                      color="primary"
                      variant="outlined"
                      icon={<ShoppingBagIcon />}
                    />
                  </Box>

                  <Divider />

                  {/* Order Items */}
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ReceiptIcon fontSize="small" />
                      Order Items
                    </Typography>
                    <Stack spacing={1.5}>
                      {order.orderItems.map((item, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            py: 1,
                            px: 2,
                            borderRadius: 1,
                            bgcolor: 'background.default',
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr 1fr', sm: '2fr 1fr 1fr' },
                            gap: 2,
                            alignItems: 'center'
                          }}
                        >
                          <Typography variant="body1">
                            {item.productTitle}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                          <Box sx={{ 
                            textAlign: { xs: 'right', sm: 'left' },
                            gridColumn: { xs: '2', sm: 'auto' }
                          }}>
                            <Typography variant="body1" fontWeight="medium">
                              ${(item.uniyPrice * item.quantity).toFixed(2)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ${item.uniyPrice.toFixed(2)} each
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  <Divider />

                  {/* Address and Total */}
                  <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 2
                  }}>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 1,
                      bgcolor: 'background.default',
                      height: '100%'
                    }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon fontSize="small" />
                        Shipping Address
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {order.address}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      p: 2, 
                      borderRadius: 1,
                      bgcolor: 'background.default',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Order Summary
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Subtotal
                          </Typography>
                          <Typography variant="body2">
                            ${order.total.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Shipping
                          </Typography>
                          <Typography variant="body2">
                            Free
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Total
                        </Typography>
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ${order.total.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Orders;
