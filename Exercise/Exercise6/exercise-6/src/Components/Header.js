import banner from '../Pizza_Images/banner.png';


import 'bootstrap/dist/js/bootstrap.bundle.min';

const Header = () => {
    return (
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {[banner, banner, banner].map((image, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index} data-bs-interval="3000">
              <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} style={{ height: '500px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="carousel-indicators">
          {[banner, banner, banner].map((_, index) => (
            <button key={index} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={index} className={index === 0 ? "active" : ""}></button>
          ))}
        </div>
      </div>
    );
  };

export default Header;