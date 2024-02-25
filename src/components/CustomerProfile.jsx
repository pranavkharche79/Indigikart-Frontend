import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";
import Footer2 from "./Footer2";

function CustomerProfile() {
  const [uname, setUname] = useState(sessionStorage.getItem("uname"));
  const userid = sessionStorage.getItem("userid");
  const id = sessionStorage.getItem("id");

  const [user, setUser] = useState({
    id: sessionStorage.getItem("id"),
    name: "",
    city: "",
    userid: "",
    pwd: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    axios
      .get(
        "https://indigikart-backend-production.up.railway.app/api/customers/" +
          id
      )
      .then((resp) => {
        console.log(resp.data.data);
        setUser(resp.data.data);
      });
  }, []);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "https://indigikart-backend-production.up.railway.app/api/customers/" +
          id,
        user
      )
      .then((resp) => {
        enqueueSnackbar("Profile updated successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        setUname(user.name);
      });
  };

  return (
    <>
      <div className="container text-black">
        <div className="row">
          <div className="col-sm-7 mx-auto">
            <div className="card shadow bg-transparent mt-3">
              <div className="card-body">
                <h4 className="p-2 text-center">Welcome {uname}</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">
                      Customer Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        pattern="[A-Za-z ]+"
                        title="Only Alphabet input is allowed"
                        required
                        placeholder="Enter the Customer Name"
                        name="name"
                        value={user.name}
                        onChange={handleInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">City</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        pattern="[A-Za-z]+"
                        title="Only Alphabet input is allowed"
                        required
                        placeholder="Enter the City"
                        name="city"
                        value={user.city}
                        onChange={handleInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">
                      Gender
                    </label>
                    <div className="col-sm-8">
                      <select
                        required
                        name="gender"
                        value={user.gender}
                        onChange={handleInput}
                        className="form-control"
                      >
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">
                      User Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        readOnly
                        name="userid"
                        value={user.userid}
                        onChange={handleInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Phone</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        pattern="[0-9]+"
                        minLength={10}
                        maxLength={10}
                        name="phone"
                        placeholder="Enter 10 digit phone number"
                        title="Only numerical values allowed of 10 digits"
                        required
                        value={user.phone}
                        onChange={handleInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">
                      Password
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        required
                        placeholder="Enter the Password"
                        maxLength={16}
                        minLength={8}
                        title="min 8 and max 16 characters"
                        name="pwd"
                        value={user.pwd}
                        onChange={handleInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary float-right">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default CustomerProfile;
