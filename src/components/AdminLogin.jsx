import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../validations/loginvalidation";
import { enqueueSnackbar } from "notistack";
import Footer2 from "./Footer2";

function AdminLogin() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userid: "",
    pwd: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [errmsg, setErrmsg] = useState();
  const history = useHistory();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user));
    setSubmitted(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      axios
        .post(
          "https://indigikart-backend-production.up.railway.app/api/admin/validate",
          user
        )
        .then((resp) => {
          let result = resp.data.data;
          sessionStorage.setItem("userid", result.userid);
          sessionStorage.setItem("uname", result.uname);
          sessionStorage.setItem("role", "admin");
          dispatch({ type: "IsLoggedIn" });
          enqueueSnackbar("Login Successfully", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          history.push("/aprofile");
        })
        .catch((error) => {
          console.log("Error", error);
          setErrmsg("Invalid username or password..!!");
        });
    }
  }, [errors]);

  return (
    <>
      <div className="container py-5">
        <div
          className="card shadow p-4"
          style={{
            background: "#f7ebc6",
            borderRadius: "15px",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <h2
            className="text-center mb-4"
            style={{ color: "#6b4b3e", fontFamily: "Times New Roman" }}
          >
            Admin Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="userid"
                className="form-label"
                style={{ color: "#6b4b3e" }}
              >
                User Name
              </label>
              <input
                type="text"
                name="userid"
                placeholder="Enter Username"
                value={user.userid}
                onChange={handleInput}
                className={`form-control ${errors.userid ? "is-invalid" : ""}`}
                id="userid"
              />
              {errors.userid && (
                <div className="invalid-feedback">{errors.userid}</div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="pwd"
                className="form-label"
                style={{ color: "#6b4b3e" }}
              >
                Password
              </label>
              <input
                type="password"
                name="pwd"
                Placeholder="Enter Password"
                value={user.pwd}
                onChange={handleInput}
                className={`form-control ${errors.pwd ? "is-invalid" : ""}`}
                id="pwd"
              />
              {errors.pwd && (
                <div className="invalid-feedback">{errors.pwd}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          {errmsg && (
            <p className="alert alert-danger mt-4 text-center font-weight-bold">
              {errmsg}
            </p>
          )}
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default AdminLogin;
