import React from "react";
import PropTypes from "prop-types";
import "./Footer.css";

const Footer = ({ copyright, socialLinks, links, contactInfo }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {links && (
          <div className="footer-links">
            {links.map((section, index) => (
              <div key={index} className="footer-section">
                <h3>{section.title}</h3>
                <ul>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href={item.link}>{item.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {socialLinks && (
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="social-link">
                {social.icon && <img src={social.icon} alt={social.name} />}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        )}

        {contactInfo && (
          <div className="contact-info">
            {contactInfo.address && <p>{contactInfo.address}</p>}
            {contactInfo.phone && <p>Tel: {contactInfo.phone}</p>}
            {contactInfo.email && <p>Email: {contactInfo.email}</p>}
          </div>
        )}

        {copyright && (
          <div className="copyright">
            <p>{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
};

Footer.propTypes = {
  copyright: PropTypes.string,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  contactInfo: PropTypes.shape({
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default Footer;
