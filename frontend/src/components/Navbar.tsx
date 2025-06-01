import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import type { BadgeProps } from '@mui/material/Badge';
import { useAuth } from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useCart } from '../context/cart/CartContext';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.25)',
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
      '0%': {
        boxShadow: '0 0 0 0 rgba(99, 102, 241, 0.4)',
      },
      '70%': {
        boxShadow: '0 0 0 6px rgba(99, 102, 241, 0)',
      },
      '100%': {
        boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)',
      },
    },
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    marginTop: theme.spacing(1.5),
    minWidth: 180,
    boxShadow: '0 4px 32px rgba(99, 102, 241, 0.15)',
    border: '1px solid rgba(224, 231, 255, 0.8)',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    '& .MuiList-root': {
      padding: '8px 0',
    },
    '& .MuiMenuItem-root': {
      padding: '12px 20px',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        background: 'rgba(99, 102, 241, 0.08)',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 20,
        marginRight: theme.spacing(1.5),
        color: '#6366f1',
      },
    },
  },
}));

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { username, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleCloseUserMenu();
  };
 
const handleMyOrders = () => {
  handleCloseUserMenu();

  navigate('/my-orders');
}
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(224, 231, 255, 0.8)',
        boxShadow: '0 4px 32px rgba(99, 102, 241, 0.08)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 70 }}>
          <StorefrontIcon 
            sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              mr: 1,
              color: '#6366f1',
              fontSize: 28,
            }} 
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-1px)',
              }
            }}
          >
            Tech Store
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Cart Icon */}
          <Box sx={{ mr: 2 }}>
            <Tooltip title="View Cart">
              <IconButton
                aria-label="cart"
                size="large"
                onClick={() => navigate('/cart')}
                sx={{
                  color: '#6366f1',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                <StyledBadge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon sx={{ fontSize: 26 }} />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </Box>

          <StorefrontIcon 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              mr: 1,
              color: '#6366f1',
              fontSize: 24,
            }} 
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none',
            }}
          >
            Tech Store
          </Typography>

          {isAuthenticated() ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Account settings">
                <Box
                  onClick={handleOpenUserMenu}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    p: 1,
                    borderRadius: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    }
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: '#1e293b',
                      fontSize: '0.95rem',
                    }}
                  >
                    {username}
                  </Typography>
                  <Avatar
                    alt={username || "User"}
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      width: 36,
                      height: 36,
                      border: '2px solid #e0e7ff',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        border: '2px solid #6366f1',
                      }
                    }}
                  />
                </Box>
              </Tooltip>
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleMyOrders}>
                  <PersonIcon />
                  <Typography>My Orders</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  <Typography>Logout</Typography>
                </MenuItem>
              </StyledMenu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={() => navigate('/login')}
                variant="contained"
                sx={{
                  borderRadius: 99,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
