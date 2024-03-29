import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Product from "./Product";
import TopSlider from "./TopSlider";
import Footer2 from "./Footer2";
import { closeSnackbar, enqueueSnackbar } from "notistack";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const { catid } = useParams();
  const state = useSelector((state) => state);
  const [item, setItem] = useState({});
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showDialog, setShowDialog] = useState("modal fade");
  const [display, setDisplay] = useState("none");

  const showModal = (prod) => {
    console.log("Child call parent");
    setShowDialog("modal fade show");
    setDisplay("block");
    setItem(prod);
  };

  const checkItem = (prodid) => {
    return state.cart.findIndex((x) => x.prodid === prodid) < 0;
  };

  const closeDialog = () => {
    setShowDialog("modal fade");
    setDisplay("none");
  };

  const loadDataFromServer = (page = 0, pagesize = 8) => {
    axios
      .get(
        "https://indigikart-backend-production.up.railway.app/api/products/paginated?page=" +
          page +
          "&pagesize=" +
          pagesize
      )
      .then((resp) => {
        console.log(resp.data.data.total);
        setProducts(resp.data.data.plist);
        setTotalPage(Math.ceil(resp.data.data.total / pagesize));
        console.log(products);
      });
  };

  useEffect(() => {
    console.log(catid);
    if (catid !== undefined) {
      axios
        .get(
          "https://indigikart-backend-production.up.railway.app/api/products/cats/" +
            catid
        )
        .then((resp) => {
          console.log(resp.data);
          setProducts(resp.data);
          console.log(products);
        });
    } else {
      loadDataFromServer();
    }
  }, [catid]);
  const addToCart = (item) => {
    if (sessionStorage.getItem("userid") == null) {
      enqueueSnackbar("Please login first to buy product", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      history.push("/clogin");
    } else if (sessionStorage.getItem("role") !== "customer") {
      enqueueSnackbar("Only customer can buy product", {
        variant: "error",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else {
      if (checkItem(item.prodid)) {
        showModal();
        setDisplay("none");
        setShowDialog("modal fade");
        item.qty = qty;
        dispatch({ type: "AddItem", payload: item });
        enqueueSnackbar("Item added to cart successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      } else {
        enqueueSnackbar("Item already in cart", {
          variant: "success",
          autoHideDuration: 10000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
        });
      }
    }
  };

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

  const handlePageClick = ({ selected: selectedPage }) => {
    loadDataFromServer(selectedPage);
  };

  return (
    <>
      <TopSlider />
      <div className="container-fluid" style={{ width: "92%" }}>
        <div className="card shadow bg-transparent">
          <div className="card-body">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              containerClassName={"pagination"}
              pageCount={totalPage}
              onPageChange={handlePageClick}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
            <div className="row">
              {products.map((x) => (
                <Product key={x.prodid} x={x} showModal={showModal} />
              ))}
            </div>
          </div>
        </div>
        {display == "block" ? (
          <div
            className={showDialog}
            style={{ zIndex: "1000", display: display }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Add to Cart</h5>
                  <button onClick={closeDialog} className="close">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <div className="d-flex">
                    <img src={item.photo} style={{ width: "200px" }} />
                    <div className="ml-3">
                      <h4 className="p-2 text-warning">{item.pname}</h4>
                      <h5 className="px-2">About: {item.descr}</h5>
                      <h5 className="px-2">
                        Category: {item.category.catname}
                      </h5>
                      <h5 className="px-2">Seller: {item.sellerName}</h5>
                      <h5 className="px-2">Price: &#8377; {item.price}</h5>
                      <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={(e) => addToCart(item)}
                    className="btn btn-warning btn-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer2 />
    </>
  );
}

export default AllProduct;
