import React, { useEffect } from "react";
import "./ServiceStyles.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Particles from "./Particles";

const Development = () => {
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
            <h1 className="service-title">Development</h1>
            <p className="service-subtitle">Building powerful, scalable, and innovative digital solutions</p>
          </div>

          <div className="content-grid">
            <div className="content-text">
              <h3>Technical Excellence</h3>
              <p>
                We leverage cutting-edge technologies and best practices to deliver robust, scalable, and
                high-performance applications. Our development team excels in creating solutions that power business
                growth and digital transformation.
              </p>
            </div>
            <div className="content-image">
              <img src="/images/Develop1.jpg" alt="Development Process" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-container">
          <div className="feature-grid">
            <div className="feature-item">
              <h4>Full-Stack Development</h4>
              <p>Comprehensive development services covering both frontend and backend technologies.</p>
            </div>
            <div className="feature-item">
              <h4>Cloud Solutions</h4>
              <p>Cloud-native applications with scalability and reliability built-in from the ground up.</p>
            </div>
            <div className="feature-item">
              <h4>API Integration</h4>
              <p>Seamless integration with third-party services and custom API development.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-container">
          <div className="content-grid">
            <div className="content-image">
              <img src="/images/Develop2.jpg" alt="Technology Stack" />
            </div>
            <div className="content-text">
              <h3>Our Tech Stack</h3>
              <p>
                We work with a modern technology stack including React, Node.js, Python, and cloud platforms like AWS
                and Azure. Our expertise extends to mobile development, database design, and microservices architecture,
                ensuring we can tackle any development challenge.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Development;
