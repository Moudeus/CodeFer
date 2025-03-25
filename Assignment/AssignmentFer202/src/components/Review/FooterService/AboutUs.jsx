import React, { useEffect } from "react";
import "./ServiceStyles.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Particles from "./Particles";

const AboutUs = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".service-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="service-page">
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <Link to="/home" className="back-home">
        <FaHome /> Back to Home
      </Link>
      <section className="service-section">
        <div className="service-container">
          <div className="service-header">
            <h1 className="service-title">About Us</h1>
            <p className="service-subtitle">
              Pioneering digital innovation with passion, expertise, and dedication to excellence
            </p>
          </div>

          <div className="content-grid">
            <div className="content-text">
              <h3>Our Story</h3>
              <p>
                Founded with a vision to transform digital experiences, we've grown from a small team of passionate
                developers to a comprehensive digital solutions provider. Our journey is marked by continuous
                innovation, learning, and dedication to delivering excellence in every project we undertake.
              </p>
            </div>
            <div className="content-image">
              <img src="/images/Aboutus1.jpg" alt="Company History" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-container">
          <div className="feature-grid">
            <div className="feature-item">
              <h4>Our Mission</h4>
              <p>
                To empower businesses with innovative digital solutions that drive growth and success in the modern
                world.
              </p>
            </div>
            <div className="feature-item">
              <h4>Our Vision</h4>
              <p>
                To be the leading force in digital transformation, setting new standards in technology and creativity.
              </p>
            </div>
            <div className="feature-item">
              <h4>Our Values</h4>
              <p>Innovation, integrity, excellence, and client success drive everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-container">
          <div className="content-grid">
            <div className="content-image">
              <img src="/images/Aboutus2.jpg" alt="Our Team" />
            </div>
            <div className="content-text">
              <h3>Our Team</h3>
              <p>
                Our diverse team of experts brings together years of experience in different domains of technology and
                design. We believe in collaborative innovation and continuous learning, ensuring we stay at the
                forefront of technological advancement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
