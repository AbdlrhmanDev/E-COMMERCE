import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../context/cart/CartContext';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ _id, name, price, image}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      elevation={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 32px rgba(99, 102, 241, 0.08)',
        border: '1.5px solid rgba(224, 231, 255, 0.8)',
        transition: 'all 0.3s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 40px rgba(99, 102, 241, 0.15)',
          border: '1.5px solid #6366f1',
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
          '& .MuiButton-root': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          alt={name}
          height="240"
          image={image}
          sx={{
            transition: 'transform 0.5s ease-in-out',
            objectFit: 'cover',
            borderBottom: '1px solid rgba(224, 231, 255, 0.8)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            borderRadius: 99,
            px: 2,
            py: 0.5,
            border: '1px solid rgba(224, 231, 255, 0.8)',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.08)',
            transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '1.1rem',
            }}
          >
            ${price.toFixed(2)}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ 
        flexGrow: 1, 
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Typography 
          variant="h5" 
          component="div"
          sx={{
            fontWeight: 600,
            color: '#1e293b',
            fontSize: '1.25rem',
            lineHeight: 1.4,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={() => addToCart(_id)}
          sx={{
            borderRadius: 99,
            py: 1.2,
            fontWeight: 600,
            fontSize: '0.95rem',
            textTransform: 'none',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(1px)',
            }
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
