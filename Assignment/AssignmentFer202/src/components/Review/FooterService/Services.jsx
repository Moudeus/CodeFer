import React, { useEffect } from "react";
import "./ServiceStyles.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Particles from "./Particles";

const Services = () => {
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
            <h1 className="service-title">Our Services</h1>
            <p className="service-subtitle">
              Transforming ideas into digital excellence with cutting-edge solutions and innovative technology
            </p>
          </div>

          <div className="content-grid">
            <div className="content-text">
              <h3>Digital Solutions</h3>
              <p>
                We deliver comprehensive digital solutions tailored to your unique needs. From web applications to
                mobile platforms, our expertise spans across multiple domains to ensure your digital presence stands
                out.
              </p>
            </div>
            <div className="content-image">
              <img src="/images/Service1.jpg" alt="Digital Solutions" />
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-container">
          <div className="feature-grid">
            <div className="feature-item">
              <h4>Custom Development</h4>
              <p>Tailored solutions built from the ground up to meet your specific requirements and business goals.</p>
            </div>
            <div className="feature-item">
              <h4>Cloud Solutions</h4>
              <p>Scalable and secure cloud infrastructure to power your applications and services.</p>
            </div>
            <div className="feature-item">
              <h4>Mobile Apps</h4>
              <p>Native and cross-platform mobile applications that deliver exceptional user experiences.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-container">
          <div className="content-grid">
            <div className="content-image">
              <img src="/images/Service2.jpg" alt="Technical Expertise" />
            </div>
            <div className="content-text">
              <h3>Technical Excellence</h3>
              <p>
                Our team of experts brings years of experience in the latest technologies and best practices. We ensure
                your projects are built with scalability, security, and performance in mind, using cutting-edge tools
                and frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
