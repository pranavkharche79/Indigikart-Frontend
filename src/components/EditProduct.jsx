import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import productvalidation from "../validations/productvalidation";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import Footer2 from "./Footer2";

function EditProduct() {
  console.log("Edit product page");
  const sellerid = sessionStorage.getItem("id");
  const [cats, setcats] = useState([]);
  const { prodid } = useParams();
  const [product, setProduct] = useState({
    prodid: prodid,
    pname: "",
    category: "",
    descr: "",
    price: "",
    seller: sellerid,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(productvalidation(product));
    setSubmitted(true);
  };

  useEffect(() => {
    axios
      .get(
        "https://indigikart-backend-production.up.railway.app/api/categories"
      )
      .then((resp) => setcats(resp.data))
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: "error",
          autoHideDuration: 10000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
        });
      });

    axios
      .get(
        "https://indigikart-backend-production.up.railway.app/api/products/" +
          prodid
      )
      .then((resp) => {
        console.log(resp.data);
        setProduct(resp.data);
      });
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitted) {
      console.log(product);
      axios
        .put(
          "https://indigikart-backend-production.up.railway.app/api/products/" +
            prodid,
          product
        )
        .then((resp) => {
          let result = resp.data.data;
          console.log(result);
          enqueueSnackbar("Product saved successfully", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          history.push("/myproducts");
        })
        .catch((error) => {
          console.log("Error", error);
          enqueueSnackbar("Error saving product", {
            variant: "error",
            autoHideDuration: 10000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            action,
          });
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
      <div className="container-fluid">
        <div className="row">
          <div class="col-sm-3">
            <img width="300" src={product?.photo} />
          </div>
          <div className="col-sm-9">
            <h4 className="text-center p-2">Edit Product Form</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Product Name
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    required
                    name="pname"
                    value={product?.pname}
                    onChange={handleInput}
                    className="form-control"
                  />
                  {errors.pname && (
                    <small className="text-danger float-right">
                      {errors.pname}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Category</label>
                <div className="col-sm-8">
                  <select
                    name="category"
                    required
                    value={product?.category.id}
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Category</option>
                    {cats
                      .filter((x) => x.isactive)
                      .map((x) => (
                        <option value={x.id}>{x.catname}</option>
                      ))}
                  </select>
                  {errors.category && (
                    <small className="text-danger float-right">
                      {errors.category}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Price</label>
                <div className="col-sm-8">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    required
                    name="price"
                    value={product?.price}
                    onChange={handleInput}
                    className="form-control"
                  />
                  {errors.price && (
                    <small className="text-danger float-right">
                      {errors.price}
                    </small>
                  )}
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Description
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="descr"
                    maxLength={250}
                    title="Max 250 Characters allowed"
                    required
                    placeholder="Enter Description"
                    value={product?.descr}
                    onChange={handleInput}
                    className="form-control"
                  />
                  {errors.descr && (
                    <small className="text-danger float-right">
                      {errors.descr}
                    </small>
                  )}
                </div>
              </div>

              <button className="btn btn-primary float-right">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default EditProduct;
