import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { message } from 'antd';
import p4 from '../../images/p4.jpg'; // Adjust path if needed

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.type) {
      alert('Please fill all fields');
      return;
    }

    axios.post('http://localhost:8001/api/user/register', data)
      .then((response) => {
        if (response.data.success) {
          message.success(response.data.message);
          navigate('/login');
        } else {
          message.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand><h2>RentEase</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Link to={'/'} className="nav-link">Home</Link>
              <Link to={'/login'} className="nav-link">Login</Link>
              <Link to={'/register'} className="nav-link">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Background with gradient overlay */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${p4})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <Container maxWidth="xs">
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              p: 4,
              boxShadow: 5,
              width: '100%',
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Avatar sx={{ bgcolor: 'purple', mb: 1 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" color="white" fontWeight="bold">
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    style: { backgroundColor: '#fff', borderRadius: '10px' }
                  }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    style: { backgroundColor: '#fff', borderRadius: '10px' }
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    style: { backgroundColor: '#fff', borderRadius: '10px' }
                  }}
                />

                <InputLabel id="user-type-label" sx={{ mt: 2, color: 'white' }}>
                  User Type
                </InputLabel>
                <Select
                  labelId="user-type-label"
                  id="type"
                  name="type"
                  value={data.type}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    mt: 1
                  }}
                >
                  <MenuItem value="" disabled>Select User Type</MenuItem>
                  <MenuItem value="Renter">Renter</MenuItem>
                  <MenuItem value="Owner">Owner</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: 'linear-gradient(to right, #6a11cb, #2575fc)',
                    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '10px'
                  }}
                >
                  SIGN UP
                </Button>

                <Grid container justifyContent="center">
                  <Grid item>
                    <Typography variant="body2" color="white">
                      Already have an account?{' '}
                      <Link to="/login" style={{ color: '#00f' }}>
                        Sign In
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

export default Register;
