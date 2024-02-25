import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import loginvalidation from "../validations/loginvalidation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import Footer2 from "./Footer2";

function SellerLogin() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userid: "",
    pwd: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
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
          "https://indigikart-backend-production.up.railway.app/api/sellers/validate",
          user
        )
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.status === "error") {
            enqueueSnackbar(resp.data.error, {
              variant: "error",
              autoHideDuration: 10000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              action,
            });
          } else {
            let result = resp.data.data;
            console.log(resp.data.data);
            sessionStorage.setItem("userid", result.userid);
            sessionStorage.setItem("uname", result.name);
            sessionStorage.setItem("role", "seller");
            sessionStorage.setItem("id", result.id);
            dispatch({ type: "IsLoggedIn" });
            enqueueSnackbar("Login Successfully", {
              variant: "success",
              autoHideDuration: 2000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
            history.push("/sprofile");
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }, [errors]);

  const action = (snackbarId) => (
    <>
      <button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        <b>OK</b>
      </button>
    </>
  );

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
            Seller Login
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
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default SellerLogin;
