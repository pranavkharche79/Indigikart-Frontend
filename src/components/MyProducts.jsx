import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer2 from "./Footer2";

function MyProducts() {
  const sellerid = sessionStorage.getItem("id");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://indigikart-backend-production.up.railway.app/api/products?sellerid=" +
          sellerid
      )
      .then((resp) => {
        console.log(resp.data);
        setProducts(resp.data.data);
        console.log(products);
      });
  }, []);

  const deleteProduct = (prodid) => {
    let resp = window.confirm("Are you sure to delete this product ?");
    if (resp) {
      axios
        .delete(
          "https://indigikart-backend-production.up.railway.app/api/products/" +
            prodid
        )
        .then((resp) => {
          enqueueSnackbar("Product deleted successfully", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          axios
            .get(
              "https://indigikart-backend-production.up.railway.app/api/products?sellerid=" +
                sellerid
            )
            .then((resp) => {
              console.log(resp.data);
              setProducts(resp.data.data);
              console.log(products);
            });
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="card shadow bg-transparent text-black">
          <div className="card-body">
            <h4>My Products</h4>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((x) => (
                  <tr key={x.prodid}>
                    <td>
                      <img width="100" src={x.photo} className="img-thumnail" />
                      {x.pname}
                    </td>
                    <td>{x.category.catname}</td>
                    <td>{x.descr}</td>
                    <td>{x.price}</td>
                    <td>
                      <Link
                        to={"/edit/" + x.prodid}
                        className="btn btn-primary btn-sm mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(x.prodid)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default MyProducts;
