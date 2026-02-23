import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import AllUsers from './AllUsers';
import AllProperty from './AllProperty';
import AllBookings from './AllBookings';
import PropTypes from 'prop-types';

import { Container, Nav, Navbar } from 'react-bootstrap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import backgroundImage from '../../images/p4.jpg'; // Adjust if path differs

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{
          p: 3,
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 2,
          boxShadow: 3,
          backdropFilter: 'blur(6px)',
          marginTop: 2
        }}>
          <Typography sx={{ color: '#000' }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!user) return null;

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingBottom: '30px'
      }}
    >
      <Navbar expand="lg" style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}>
        <Container fluid>
          <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#007BFF' }}>
            Rent<span style={{ color: '#000' }}>Ease</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab label="ALL USERS" {...a11yProps(0)} />
                <Tab label="ALL PROPERTIES" {...a11yProps(1)} />
                <Tab label="ALL BOOKINGS" {...a11yProps(2)} />
              </Tabs>
            </Nav>
            <Nav className="ms-auto d-flex align-items-center">
              <Typography sx={{ fontWeight: 'bold', mr: 2, textShadow: '0 0 5px #fff' }}>
                Hi, {user.userData.name}
              </Typography>
              <Link to="/" onClick={handleLogOut} className="btn btn-outline-primary btn-sm">
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Box sx={{ px: { xs: 2, md: 5 } }}>
        <CustomTabPanel value={value} index={0}>
          <AllUsers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default AdminHome;
