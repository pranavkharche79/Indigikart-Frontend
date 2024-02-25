import axios from "axios";
import { useEffect, useState } from "react";
import Footer2 from "./Footer2";

function SellerProfile() {
  const id = sessionStorage.getItem("id");
  const [user, setUser] = useState({
    id: sessionStorage.getItem("id"),
    name: "",
    city: "",
    userid: "",
    pwd: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(
        "https://indigikart-backend-production.up.railway.app/api/sellers/" + id
      )
      .then((resp) => {
        console.log(resp.data.data);
        setUser(resp.data.data);
      });
  }, []);
  return (
    <>
      <div className="container">
        <div className="card shadow m-3 p-2 bg-transparent text-black text-center">
          <h4
            className="p-2"
            style={{
              borderBottom: "2px solid green",
              width: "300px",
              margin: "auto",
            }}
          >
            Seller Profile Page
          </h4>
          <br />
          <h4>Welcome {user.name}</h4>
          <h5>City : {user.city}</h5>
          <h5>User Name: {user.userid}</h5>
          <h5>Contact No : {user.phone}</h5>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default SellerProfile;
