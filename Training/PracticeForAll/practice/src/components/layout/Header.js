import React from "react";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ title, logo, navItems }) => {
  return (
    <header className="header">
      <div className="header-logo">{logo && <img src={logo} alt="logo" className="logo" />}</div>
      <h1 className="header-title">{title}</h1>
      {navItems && (
        <nav className="header-nav">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.link}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
};

export default Header;
