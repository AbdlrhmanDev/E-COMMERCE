import { useRef, useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import { BASE_URL } from '../constants/baseUrl';
import { useAuth } from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("Unable to login. Please check your credentials!");
      return;
    }

    const { data: token } = await response.json();

    if (!token) {
      setError("Login failed. Please try again.");
      return;
    }

    login(email, token);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 8,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff"
        }}
      >
        <Typography variant="h4" mb={2} color="primary">
          Welcome Back
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
        >
          <TextField
            inputRef={emailRef}
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            autoComplete="username"
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            fullWidth
          >
            Login
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography variant="body2" color="text.secondary" align="center" mt={2}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;