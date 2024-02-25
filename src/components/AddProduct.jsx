import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import productvalidation from "../validations/productvalidation";
import { enqueueSnackbar } from "notistack";
import Footer2 from "./Footer2";

function AddProduct() {
  const sellerid = sessionStorage.getItem("id");
  const [image, setImage] = useState("");
  const [cats, setcats] = useState([]);
  const [product, setProduct] = useState({
    photo: "",
    pname: "",
    category: "",
    price: "",
    descr: "",
    seller: sellerid,
  });
  const [errors, setErrors] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setSelectedPhoto(e.target.files[0]);
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
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  }, []);

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && submitted) {
      const formData = new FormData();
      formData.append("photo", product.photo);
      formData.append("pname", product.pname);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("descr", product.descr);
      formData.append("seller", sellerid);
      console.log(product);
      axios
        .post(
          "https://indigikart-backend-production.up.railway.app/api/products",
          formData
        )
        .then((resp) => {
          let result = resp.data.data;
          console.log(result);
          enqueueSnackbar("Product Added successfully", {
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
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        });
    }
  }, [errors]);

  const submitImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pranav");
    data.append("cloud_name", "dvizikqng");

    fetch("https://api.cloudinary.com/v1_1/dvizikqng/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        enqueueSnackbar("Photo uploaded successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        setProduct({ ...product, photo: data.secure_url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="card shadow bg-transparent text-black">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 mx-auto">
                <h4 className="text-center p-2">Add Product Form</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">
                      Product Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        required
                        placeholder="Enter the Product Name"
                        name="pname"
                        value={product.pname}
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
                    <label className="col-sm-4 form-control-label">Photo</label>
                    <div className="col-sm-8">
                      <input
                        type="file"
                        required
                        name="photo"
                        accept=".jpg,.png"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="form-control-file"
                      />
                    </div>
                  </div>

                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label"></label>
                    <div className="col-sm-8">
                      <button
                        onClick={submitImage}
                        required
                        class="btn btn-success"
                      >
                        Upload Photo
                      </button>
                    </div>
                  </div>

                  <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">
                      Category
                    </label>
                    <div className="col-sm-8">
                      <select
                        name="category"
                        required
                        value={product.category}
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
                      {errors.pcat && (
                        <small className="text-danger float-right">
                          {errors.pcat}
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
                        placeholder="Enter the Price"
                        name="price"
                        value={product.price}
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
                        name="descr"
                        maxLength={250}
                        title="Max 250 Characters allowed"
                        required
                        placeholder="Enter Description"
                        value={product.descr}
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errors.descr && (
                        <small className="text-danger float-right">
                          {errors.brand}
                        </small>
                      )}
                    </div>
                  </div>

                  <button className="btn btn-primary float-right">
                    Add Product
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

export default AddProduct;
