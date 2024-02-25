import { Fragment } from "react";
import { Link } from "react-router-dom";

function LoginRegisterMenu() {
  return (
    <ul className="navbar-nav ml-auto">
      <Link to="/clogin" className="stylenone">
        <img
          src={"/assets/cart.jpg"}
          alt="social"
          className="social"
          style={{
            maxWidth: "40px",
            maxHeight: "40px",
            borderRadius: "100%",
          }}
        />
      </Link>
      <span>&nbsp;&nbsp;</span>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Login
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/alogin">
            Admin
          </Link>
          <Link className="dropdown-item" to="/slogin">
            Seller
          </Link>
          <Link className="dropdown-item" to="/clogin">
            Customer
          </Link>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Register
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="/regsupplier">
            Seller
          </Link>
          <Link className="dropdown-item" to="/register">
            Customer
          </Link>
        </div>
      </li>
    </ul>
  );
}

export default LoginRegisterMenu;
