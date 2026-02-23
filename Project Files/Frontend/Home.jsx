import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../images/p1.jpg';
import p2 from '../../images/p2.jpg';
import p3 from '../../images/p3.jpg';

const Home = () => {
  return (
    <>
      {/* Fullscreen Background Carousel */}
      <Carousel fade controls={false} indicators={false} interval={3000} className="hero-carousel">
        {[p1, p2, p3].map((image, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="carousel-bg"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                position: 'relative'
              }}
            >
              <div className="carousel-overlay">
                <div className="text-center text-white">
                  <h1 className="display-3 fw-bold text-shadow">Welcome to RentEase</h1>
                  <p className="lead text-shadow">Find or rent properties easily and securely.</p>
                  <div className="mt-4">
                    <Link className="btn btn-outline-light mx-2" to="/login">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/register">Register</Link>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Property Section */}
      <div className="property-section text-center py-5">
        <div className="container">
          <h2 className="property-heading mb-4">
            Explore <span className="highlight">All Properties</span> You Might Be Looking For
          </h2>
          <p className="property-subtext mb-4">
            Want to post your property?
            <Link to="/register">
              <button className="btn btn-outline-info ms-2 register-btn">Register as Owner</button>
            </Link>
          </p>

          {/* Property Cards Component */}
          {/* <AllPropertiesCards /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
