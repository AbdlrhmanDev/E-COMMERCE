import { useState } from 'react';
import './Checkout.css';
import { useCart } from "../context/cart/CartContext";
import { 
  Box, 
  Paper, 
  Typography, 
  Divider, 
  Button, 
  TextField,
  Container,
  Card,
  CardContent,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { BASE_URL } from '../constants/baseUrl';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth/AuthContext';
const Checkout = () => {
  const theme = useTheme();
  const { cartItems, totalPrice, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
   address: ''
  });
  const navigate = useNavigate();
  const { token } = useAuth();
  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Calculate shipping based on order total
  const calculateShipping = (subtotal: number) => {
    if (subtotal >= 100) return 0; // Free shipping for orders over $100
    if (subtotal >= 50) return 5; // $5 shipping for orders over $50
    return 10; // $10 shipping for orders under $50
  };
  const handleConfirmOrder = async () => {
    const address = formData.address;

    if (!address) {
      alert('Please enter a valid address');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
       alert('Failed to confirm order');
      }

      navigate('/order-Success');

      
    }catch (error) {
      console.error('Error confirming order:', error);
      alert('An error occurred while confirming your order. Please try again.');
    }

    
    
      
  };

  // Calculate tax (assuming 8% tax rate)
  const calculateTax = (subtotal: number) => {
    return subtotal * 0.08;
  };

  const shipping = calculateShipping(totalPrice);
  const tax = calculateTax(totalPrice);
  const finalTotal = totalPrice + shipping + tax;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Checkout
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 4 }}>
        {/* Order Summary */}
        <Box>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              height: '100%'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ShoppingBagIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Order Summary
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {cartItems.map((item) => (
                  <Paper
                    key={item.productId}
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      background: alpha(theme.palette.background.paper, 0.6),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                    <IconButton 
                      onClick={() => handleRemove(item.productId)}
                      sx={{ 
                        color: theme.palette.error.main,
                        '&:hover': { 
                          background: alpha(theme.palette.error.main, 0.1)
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                ))}

                <Box 
                  sx={{ 
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography color="text.secondary">Subtotal</Typography>
                    <Typography>${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography color="text.secondary">
                      Shipping
                      {shipping === 0 && (
                        <Typography 
                          component="span" 
                          sx={{ 
                            ml: 1, 
                            color: theme.palette.success.main,
                            fontSize: '0.8rem',
                            fontWeight: 500
                          }}
                        >
                          (Free)
                        </Typography>
                      )}
                    </Typography>
                    <Typography>${shipping.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography color="text.secondary">
                      Tax (8%)
                    </Typography>
                    <Typography>${tax.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Total</Typography>
                    <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                      ${finalTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Checkout Form */}
        <Box>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 4,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              height: '100%'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <LocalShippingIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Delivery Address
                    </Typography>
                  </Box>
                  
                  <TextField
                    required
                    fullWidth
                    label="Full Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    placeholder="Enter your complete delivery address"
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    re
                    onClick={handleConfirmOrder}
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      }
                    }}
                  >
                    Pay Now ${finalTotal.toFixed(2)}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout; 