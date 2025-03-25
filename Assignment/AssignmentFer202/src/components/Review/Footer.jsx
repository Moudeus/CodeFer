import React from "react";
import "../Review/Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-glass">
      <div className="glass-overlay"></div>

      <div className="footer-content-wrapper">
        {/* Main Content Section */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <h2>ShopFer</h2>
            <p className="slogan">Shop with Us and Experience the Joy of Finding What You Love.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/namson03/" className="social-link glass-icon" aria-label="Facebook">
                <FaFacebook />
                <span className="tooltip">Facebook</span>
              </a>
              <a
                href="https://github.com/Vigclid/AssignmentFer202"
                className="social-link glass-icon"
                aria-label="Twitter">
                <FaGithub />
                <span className="tooltip">Github</span>
              </a>
              <a href="https://www.instagram.com/namson.10/" className="social-link glass-icon" aria-label="Instagram">
                <FaInstagram />
                <span className="tooltip">Instagram</span>
              </a>
              <a
                href="https://www.google.com/maps/d/u/0/edit?mid=1ZSCC6a4h468H9WnE3SVu6R2FV7l3vhg&usp=sharing"
                className="social-link glass-icon"
                aria-label="LinkedIn">
                <FaMapMarkerAlt />
                <span className="tooltip">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Info Grid */}
          <div className="footer-grid">
            {/* Navigation Links */}
            <div className="footer-section nav-section">
              <h3>Navigation</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="footer-section services-section">
              <h3>Our Services</h3>
              <ul className="footer-links">
                <li>
                  <Link to="/web-design">Web Design</Link>
                </li>
                <li>
                  <Link to="/development">Development</Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="footer-section contact-section">
              <h3>Get in Touch</h3>
              <div className="contact-info">
                <p>
                  <FaPhone className="contact-icon" /> (+84) 921 386 978
                </p>
                <p>
                  <FaEnvelope className="contact-icon" /> namson1821@gmail.com
                </p>
                <p>
                  <FaMapMarkerAlt className="contact-icon" /> FPT University, Danang, Vietnam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>
              © {new Date().getFullYear()} ShopFer. Made with <FaHeart className="heart-icon" /> in Vietnam
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
