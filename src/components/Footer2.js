import React from "react";
import "./Footer2.css";
import { Link } from "react-router-dom";
const Footer2 = () => {
  return (
    <div className="footer">
      <div className="footerin1">
        <div className="f1">
          <Link to="/" className="stylenone">
            <img
              src={"/IndiGIKart.png"}
              // src={'/assets/IndiKart.png'}
              style={{ borderRadius: "150px" }}
              alt="IndiGI"
            />
          </Link>
          <div>
            <a href="https://www.instagram.com/indigikart_/" target="_blank">
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png"
                }
                // src={require("../pages/INSTA.jpg")}
                // src={"/assets/INSTA.jpg"}
                alt="social"
                className="social"
                style={{
                  maxWidth: "40px",
                  maxHeight: "40px",
                  borderRadius: "100%",
                }}
              />
            </a>
            <span>&nbsp;&nbsp;</span>
            <a
              href="https://www.facebook.com/profile.php?id=61556595004097"
              target="_blank"
            >
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
                }
                alt="social"
                className="social"
                style={{
                  maxWidth: "40px",
                  maxHeight: "40px",
                  borderRadius: "100%",
                }}
              />
            </a>
            <span>&nbsp;&nbsp;</span>
            <a
              href="https://www.youtube.com/channel/UC_jEx6OIOUiqRjE8amCzpfA"
              target="_blank"
            >
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/YouTube_social_white_square_%282017%29.svg/1200px-YouTube_social_white_square_%282017%29.svg.png"
                }
                alt="social"
                className="social"
                style={{
                  maxWidth: "40px",
                  maxHeight: "40px",
                  borderRadius: "100%",
                }}
              />
            </a>
          </div>
        </div>
        <div>
          <h3>About Us</h3>
          <p>
            INDIGI-Kart is a “one-stop store” of celebrated products having
            geographical origin (GI Tag). Our motto is “from the very land to
            your hand”.{" "}
          </p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <div>Phone no. : 9325874792</div>
          <span>Email: indigikart@gmail.com</span>
          <div>Address : 13th Cross,Sector 7 SB Road,Pune 411016.</div>
        </div>
        <div>
          <h3>Pages</h3>
          <Link to="/" className="stylenone">
            <p>Home</p>
          </Link>
          <Link to="/slogin" className="stylenone">
            <p>Seller Login</p>
          </Link>
          <Link to="/clogin" className="stylenone">
            <p>Customer Login</p>
          </Link>
        </div>
      </div>
      <div className="footerin2">
        <h3>
          <b>© Copyright 2024 INDIGI-KART. All rights reserved</b>
        </h3>
      </div>
    </div>
  );
};

export default Footer2;
