import {  useRef, useState } from 'react';
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

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


const {login} = useAuth();
const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(!email || !password || !firstName || !lastName){
      setError("Please fill all the fields");
      return;
    }
    //make a post request to the backend
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const token = await response.json();

    if(!token){
      setError("Unable to register user please try again later or contact support");
      return;
    }

    login(email, token);
    navigate('/');
  }
 


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
          Register New Account
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
        >
          <TextField
            inputRef={firstNameRef}
            label="First Name"
            name="firstName"
            fullWidth
            required
          />
           <TextField
            inputRef={lastNameRef}
            label="Last Name"
            name="lastName"
            fullWidth
            required
          />
          <TextField
            inputRef={emailRef}
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            fullWidth
          >
            Register
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography variant="body2" color="text.secondary" align="center" mt={2}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register; 