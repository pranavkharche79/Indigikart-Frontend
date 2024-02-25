import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";
import Footer2 from "./Footer2";

function Categories() {
  const [cats, setcats] = useState([]);
  const [catname, setcatname] = useState();
  const updateCategory = (cat) => {
    axios
      .put(
        "https://indigikart-backend-production.up.railway.app/api/categories/" +
          cat.id,
        {
          isactive: !cat.isactive,
        }
      )
      .then((resp) => {
        enqueueSnackbar(resp.data.data, {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        loaddata();
      })
      .catch((err) => {
        enqueueSnackbar(err.error, {
          variant: "error",
          autoHideDuration: 10000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (catname === undefined) {
      enqueueSnackbar("Please provide full information", {
        variant: "error",
        autoHideDuration: 10000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action,
      });
      return;
    }
    axios
      .post(
        "https://indigikart-backend-production.up.railway.app/api/categories",
        { catname: catname }
      )
      .then((resp) => {
        setcatname("");
        enqueueSnackbar(resp.data.data, {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        loaddata();
      })
      .catch((error) => {
        enqueueSnackbar(error.error, {
          variant: "error",
          autoHideDuration: 10000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
        });
      });
  };

  const loaddata = () => {
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
  };
  useEffect(() => {
    loaddata();
  }, []);

  const action = (snackbarId) => (
    <>
      <button
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        OK
      </button>
    </>
  );

  const handleCategoryNameChange = (e) => {
    const inputText = e.target.value;
    const filteredText = inputText.replace(/[^A-Za-z\s]/gi, ""); // Replace anything not alphabets or spaces with an empty string
    setcatname(filteredText);
  };

  return (
    <>
      <div className="container-fluid text-dark">
        <h4 className="p-2">Categories</h4>
        <div className="row">
          <div className="col-sm-8">
            <table className="table table-bordered table-striped table-light table-hover">
              <thead className="table-dark">
                <tr>
                  {/* <th>Id</th> */}
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cats
                  .filter((x) => x.isactive)
                  .map((x) => (
                    <tr key={x.id}>
                      {/* <td>{x.id}</td> */}
                      <td>{x.catname}</td>
                      <td>
                        <button
                          onClick={(e) => updateCategory(x)}
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
          <div className="col-sm-4">
            <h4>Add Category</h4>
            <form>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  pattern="[A-Za-z ]+"
                  title="Only Alphabet input is allowed"
                  required
                  placeholder="Enter the Category Name"
                  onChange={handleCategoryNameChange}
                  value={catname}
                  className="form-control"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-primary float-right"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
}

export default Categories;
