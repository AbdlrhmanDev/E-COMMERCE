import { Box, Container, Typography, Paper, Divider, Button, IconButton } from "@mui/material";
import { useCart } from "../context/cart/CartContext";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { CartItem } from "../types/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, totalPrice, updateCart, removeFromCart, clearCart } = useCart();

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/checkout');
  };


  const handleQuantity = (productId: string, quantity: number) => {
    updateCart(productId, quantity);
  };
  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };
  if (!cartItems.length) {
    return (
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="sm">
          <Paper 
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(224, 231, 255, 0.8)',
              animation: 'fadeIn 0.7s ease-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'none' }
              }
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2
              }}
            >
              Your Cart is Empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/"
              sx={{
                borderRadius: 99,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                  boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Browse Products
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      py: 6,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '40vh',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%)',
        zIndex: 0
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: 4, 
            fontWeight: 800, 
            letterSpacing: 1,
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Shopping Cart
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: { md: '2' } }}>
            {cartItems.map((item: CartItem, idx: number) => (
              <Box 
                key={item.productId} 
                sx={{ 
                  mb: 4, 
                  animation: 'slideUp 0.5s ease-out',
                  animationFillMode: 'both',
                  animationDelay: `${idx * 0.1}s`,
                  '@keyframes slideUp': {
                    from: { 
                      opacity: 0, 
                      transform: 'translateY(30px)',
                    },
                    to: { 
                      opacity: 1, 
                      transform: 'none',
                    }
                  }
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 3 },
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 32px rgba(99, 102, 241, 0.08)',
                    border: '1.5px solid rgba(224, 231, 255, 0.8)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 8px 40px rgba(99, 102, 241, 0.15)',
                      border: '1.5px solid #6366f1',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  {/* Image */}
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: { xs: 100, sm: 120 },
                      height: { xs: 100, sm: 120 },
                      objectFit: 'cover',
                      borderRadius: 3,
                      boxShadow: 3,
                      border: '3px solid #e0e7ff',
                      transition: 'transform 0.2s, border 0.2s',
                      mr: { sm: 3 },
                      mb: { xs: 2, sm: 0 },
                      '&:hover': {
                        transform: 'scale(1.04)',
                        border: '3px solid #6366f1',
                      }
                    }}
                  />
                  {/* Details and controls */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 250, mb: 1, wordBreak: 'break-word', color: '#1e293b' }}
                    >
                      {item.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0,
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 99,
                        py: 0.5,
                        px: 1.5,
                        width: 'fit-content',
                        mb: 1,
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.08)',
                        border: '1.5px solid rgba(224, 231, 255, 0.8)',
                        backdropFilter: 'blur(4px)',
                        minWidth: 120,
                        justifyContent: 'space-between',
                      }}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        sx={{
                          border: 'none',
                          background: 'none',
                          borderRadius: '50%',
                          transition: 'transform 0.15s',
                          '&:hover': {
                            backgroundColor: '#e0e7ff',
                            transform: 'scale(1.15)',
                          }
                        }}
                        onClick={() => handleQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#e0e7ff' }} />
                      <Typography
                        variant="h5"
                        sx={{
                          minWidth: '36px',
                          textAlign: 'center',
                          fontWeight: 800,
                          color: '#6366f1',
                          letterSpacing: 1,
                          userSelect: 'none'
                        }}
                      >
                        {item.quantity} 
                      </Typography>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: '#e0e7ff' }} />
                      <IconButton
                        size="small"
                        color="primary"
                        sx={{
                          border: 'none',
                          background: 'none',
                          borderRadius: '50%',
                          transition: 'transform 0.15s',
                          '&:hover': {
                            backgroundColor: '#e0e7ff',
                            transform: 'scale(1.15)',
                          }
                        }}
                        onClick={() => handleQuantity(item.productId, item.quantity + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ mt: 1, fontWeight: 800, color: '#6366f1', fontSize: 22 }}
                    >
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                      <Typography
                        component="span"
                        sx={{ 
                          ml: 1, 
                          fontSize: 16, 
                          color: '#94a3b8',
                          fontWeight: 500 
                        }}
                      >
                        (${item.unitPrice.toFixed(2)} each)
                      </Typography>
                    </Typography>
                  </Box>
                  {/* Remove button */}
                  <Box
                    sx={{
                      alignSelf: { xs: 'flex-end', sm: 'center' },
                      mt: { xs: 2, sm: 0 }
                    }}
                  >
                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemove(item.productId)}
                      sx={{
                        fontWeight: 600,
                        fontSize: 15,
                        textTransform: 'none',
                        background: 'rgba(254, 226, 226, 0.8)',
                        backdropFilter: 'blur(4px)',
                        borderColor: '#fecaca',
                        color: '#ef4444',
                        '&:hover': {
                          background: 'rgba(254, 226, 226, 0.9)',
                          borderColor: '#ef4444',
                          color: '#dc2626',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Paper>
                {idx < cartItems.length - 1 && (
                  <Divider 
                    sx={{ 
                      my: 4, 
                      borderColor: 'rgba(224, 231, 255, 0.8)',
                      opacity: 0.8 
                    }} 
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Order Summary */}
          <Box sx={{ flex: { md: '1' }, minWidth: { md: '320px' } }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                position: { md: 'sticky' }, 
                top: 24,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 32px rgba(99, 102, 241, 0.08)',
                border: '1.5px solid rgba(224, 231, 255, 0.8)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0 8px 40px rgba(99, 102, 241, 0.15)',
                  border: '1.5px solid #6366f1',
                }
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Order Summary
              </Typography>
              <Divider sx={{ my: 2, borderColor: '#e0e7ff' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal</Typography>
                <Typography sx={{ color: '#6366f1', fontWeight: 700 }}>${totalPrice.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Box>
              <Divider sx={{ my: 2, borderColor: '#e0e7ff' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h6" sx={{ color: '#6366f1', fontWeight: 600 }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={handleCheckout}
                color="primary"
                fullWidth
                size="large"
                sx={{ 
                  borderRadius: 99, 
                  fontWeight: 600, 
                  fontSize: 16, 
                  py: 1.5, 
                  mb: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                size="large"
                onClick={clearCart}
                sx={{ 
                  borderRadius: 99, 
                  fontWeight: 600, 
                  fontSize: 15, 
                  py: 1.5,
                  background: 'rgba(254, 226, 226, 0.8)',
                  backdropFilter: 'blur(4px)',
                  borderColor: '#fecaca',
                  color: '#ef4444',
                  '&:hover': {
                    background: 'rgba(254, 226, 226, 0.9)',
                    borderColor: '#ef4444',
                    color: '#dc2626',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Clear Cart
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;