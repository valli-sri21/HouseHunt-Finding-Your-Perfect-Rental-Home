import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navbar, Nav } from "react-bootstrap";
import p4 from "../../images/p4.jpg"; // adjust path if needed

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8001/api/user/login", data);

      if (res.data.success) {
        const user = res.data.user;
        const token = res.data.token;

        // ✅ Save to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        // ✅ Navigate based on user role
        if (user.type === "Admin") navigate("/AdminHome");
        else if (user.type === "Owner") navigate("/OwnerHome");
        else if (user.type === "Renter") navigate("/RenterHome");
        else navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand><h2>RentEase</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Background */}
      <div
        style={{
          backgroundImage: `url(${p4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Login Box */}
        <Box
          sx={{
            background: "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.4))",
            borderRadius: 5,
            p: 5,
            width: 400,
            color: "#fff",
            backdropFilter: "blur(10px)",
            boxShadow: 8,
          }}
        >
          <Box textAlign="center" mb={2}>
            <Avatar sx={{ bgcolor: "blue", mx: "auto" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "#00d1ff", mt: 1 }}>
              Login
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              variant="filled"
              name="email"
              label="Email Address"
              value={data.email}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="filled"
              type="password"
              name="password"
              label="Password"
              value={data.password}
              onChange={handleChange}
              InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
            />

            <Box mt={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #00c6ff, #0072ff)",
                  fontWeight: "bold"
                }}
              >
                LOGIN
              </Button>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#00c6ff", fontWeight: "bold" }}>
                  Sign Up
                </Link>
              </Typography>
              <Typography variant="body2">
                <Link to="/forgotpassword" style={{ color: "#ffcc00", fontWeight: "bold" }}>
                  Forgot Password?
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Login;
