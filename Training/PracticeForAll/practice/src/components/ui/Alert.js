import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Alert.css";

const Alert = ({
  type = "info",
  title,
  message,
  icon,
  dismissible = true,
  autoClose = false,
  autoCloseTime = 5000,
  onClose,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer;
    if (autoClose && isVisible) {
      timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoClose, autoCloseTime, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const alertClasses = ["custom-alert", `alert-${type}`, dismissible ? "alert-dismissible" : "", className]
    .filter(Boolean)
    .join(" ");

  // Default icons for different alert types
  const defaultIcons = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  };

  return (
    <div className={alertClasses} role="alert" {...props}>
      <div className="alert-content">
        {(icon || defaultIcons[type]) && <span className="alert-icon">{icon || defaultIcons[type]}</span>}
        <div className="alert-text">
          {title && <h4 className="alert-title">{title}</h4>}
          {message && <div className="alert-message">{message}</div>}
          {!title && !message && props.children}
        </div>
      </div>

      {dismissible && (
        <button type="button" className="alert-close" onClick={handleClose} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  title: PropTypes.node,
  message: PropTypes.node,
  icon: PropTypes.node,
  dismissible: PropTypes.bool,
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
  onClose: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Alert;
