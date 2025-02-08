import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#" style={{ fontSize: "2rem" }}>
          Navbar
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <a className="nav-link fw-bold" href="#">
                Home
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="#">
                Dropdown
              </a>
            </li>
          </ul>
        </div>
        <form className="d-flex">
          <input className="" type="search" placeholder="Search" aria-label="Search" />
          <button className="border border-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
