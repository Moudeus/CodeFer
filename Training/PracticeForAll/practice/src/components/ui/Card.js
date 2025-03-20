import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({
  title,
  subtitle,
  children,
  image,
  imageAlt,
  imagePosition = "top",
  footer,
  className,
  hoverable = false,
  bordered = true,
  shadow = true,
  actions,
  ...props
}) => {
  const cardClasses = [
    "custom-card",
    hoverable ? "card-hoverable" : "",
    bordered ? "card-bordered" : "",
    shadow ? "card-shadow" : "",
    `image-${imagePosition}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} {...props}>
      {image && imagePosition === "top" && (
        <div className="card-image">
          <img src={image} alt={imageAlt || title} />
        </div>
      )}

      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}

        {image && imagePosition === "middle" && (
          <div className="card-image">
            <img src={image} alt={imageAlt || title} />
          </div>
        )}

        <div className="card-body">{children}</div>

        {actions && <div className="card-actions">{actions}</div>}
      </div>

      {image && imagePosition === "bottom" && (
        <div className="card-image">
          <img src={image} alt={imageAlt || title} />
        </div>
      )}

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.oneOf(["top", "middle", "bottom"]),
  footer: PropTypes.node,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  bordered: PropTypes.bool,
  shadow: PropTypes.bool,
  actions: PropTypes.node,
};

export default Card;
