import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import p4 from '../../images/p4.jpg'; // Adjust path as per your project structure

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = data;

    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8001/api/user/forgotpassword", data);
      if (res.data.success) {
        alert('Your password has been changed!');
        navigate('/login');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("User doesn't exist");
        navigate("/register");
      }
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand><h2>RentEase</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Link to="/" className="nav-link fw-bold">Home</Link>
              <Link to="/login" className="nav-link fw-bold">Login</Link>
              <Link to="/register" className="nav-link fw-bold">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${p4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255,255,255,0.08)',
              padding: 4,
              borderRadius: '16px',
              boxShadow: 6,
              color: 'white',
              maxWidth: 450,
              mx: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'purple' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ mt: 1, fontWeight: 'bold', color: '#00bfff' }}>
                Forgot Password?
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email Address"
                  value={data.email}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      '&:hover fieldset': { borderColor: '#90caf9' },
                      '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      '&:hover fieldset': { borderColor: '#90caf9' },
                      '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                    }
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                  InputProps={{
                    sx: {
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      '&:hover fieldset': { borderColor: '#90caf9' },
                      '&.Mui-focused fieldset': { borderColor: '#90caf9' }
                    }
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: 'linear-gradient(90deg, #8e2de2, #4a00e0)',
                    color: 'white',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Change Password
                </Button>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="body2" color="white">
                      Don't have an account?
                      <Link to="/register" style={{ color: '#90caf9', marginLeft: '6px' }}>
                        Sign Up
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default ForgotPassword;
