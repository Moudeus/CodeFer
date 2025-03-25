import React, { useEffect } from "react";
import "./ServiceStyles.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Particles from "./Particles";

const WebDesign = () => {
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
            <h1 className="service-title">Web Design</h1>
            <p className="service-subtitle">Creating stunning, user-centric designs that captivate and convert</p>
          </div>

          <div className="content-grid">
            <div className="content-text">
              <h3>Creative Excellence</h3>
              <p>
                Our web design approach combines aesthetic beauty with functional efficiency. We create immersive
                digital experiences that engage users and drive results, using the latest design trends and user
                experience best practices.
              </p>
            </div>
            <div className="content-image">
              <img src="/images/Web1.jpg" alt="Web Design Showcase" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-container">
          <div className="feature-grid">
            <div className="feature-item">
              <h4>UI/UX Design</h4>
              <p>User-centered design approach focused on creating intuitive and engaging interfaces.</p>
            </div>
            <div className="feature-item">
              <h4>Responsive Design</h4>
              <p>Seamless experiences across all devices and screen sizes.</p>
            </div>
            <div className="feature-item">
              <h4>Brand Integration</h4>
              <p>Cohesive design that perfectly aligns with your brand identity.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-container">
          <div className="content-grid">
            <div className="content-image">
              <img src="/images/Web2.jpg" alt="Design Process" />
            </div>
            <div className="content-text">
              <h3>Our Design Process</h3>
              <p>
                From concept to completion, our design process is thorough and collaborative. We begin with deep
                research, move through iterative design phases, and finish with pixel-perfect implementation. Each step
                is crafted to ensure your website not only looks beautiful but also performs exceptionally.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDesign;
