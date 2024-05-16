import React from 'react';
import { Link } from 'react-router-dom';
// import portada from '../imagenes/portada.png';

const Header = () => {
    
  return (
    <>
    <header>
      {/* <img src={portada} className="w-100 vh-100" alt="portada restaurante" /> */}
      <nav className="navbar bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">Restaurant First</a>
          <button className="navbar-toggler bg-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Restaurant First</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Mesas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu">Menu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/ticket">Ticket</Link>
            </li>
          </ul>
        <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        </div>
        </div>
        </div>
      </nav>
    </header>   
    </>
  );
};

export default Header;
