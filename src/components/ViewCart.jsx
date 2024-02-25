import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ViewCart() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState({
    city: "",
    state: "",
    zip: "",
    country: "India",
  });
  const [payment, setPayment] = useState({
    cardno: "",
    nameoncard: "",
    cvv: "",
    amount: state.cart.reduce((a, b) => a + b.price, 0),
  });
  const deleteItem = (item) => {
    let resp = window.confirm("Are you sure to delete this item ?");
    if (resp) {
      dispatch({ type: "RemoveItem", payload: item });
      enqueueSnackbar("Deleted Successfully", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      let amount = state.cart.reduce((a, b) => a + b.price, 0);
      console.log("Amount ", amount);
    }
  };
  const handleAddressInput = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaymentInput = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // console.log(state.cart)
    let amount = state.cart.reduce(
      (a, b) => a + parseInt(b.price) * parseInt(b.qty),
      0
    );
    setPayment((prevPayment) => ({ ...prevPayment, amount: amount }));
    console.log("Amount => ", amount);
  }, [state.cart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //setSubmitted(true)
    let amount = state.cart.reduce((a, b) => a + b.price * parseInt(b.qty), 0);
    console.log("Amount ", payment.amount);
    setPayment({ ...payment, amount: amount });

    let data = {
      cart: state.cart,
      payment: payment,
      address: address,
      customerid: sessionStorage.getItem("id"),
    };
    console.log(data);
    axios
      .post(
        "https://indigikart-backend-production.up.railway.app/api/orders",
        data
      )
      .then((resp) => {
        console.log(resp);
        enqueueSnackbar("Order Placed Successfully", {
          variant: "success",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        dispatch({ type: "Clear" });
        history.push("/myorders");
      });
  };

  return (
    <div className="container-fluid text-black">
      {state.cart.length > 0 ? (
        <div className="row">
          <div className="col-sm-7">
            <h4 className="p-2">Cart View</h4>
            <table className="table table-bordered table-dark table-striped">
              <thead>
                <tr>
                  {/* <th>Prodid</th> */}
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.map((item) => (
                  <tr key={item.prodid}>
                    {/* <td>{item.prodid}</td> */}
                    <td>
                      <img
                        className="mr-2 float-left"
                        src={item.photo}
                        alt="Not loded"
                        width="100"
                      />
                      {item.pname}
                    </td>
                    <td>&#8377; {item.price}</td>
                    <td>
                      <div class="input-group">
                        <button
                          class="quantity-left-minus btn btn-danger btn-number"
                          onClick={(e) => {
                            dispatch({
                              type: "Decrement_Quantity",
                              payload: item,
                            });
                          }}
                        >
                          <span class="glyphicon glyphicon-minus">-</span>
                        </button>
                        <input
                          type="text"
                          id="qty"
                          style={{ width: "1px" }}
                          name="qty"
                          class="form-control input-number"
                          readOnly
                          value={item.qty}
                          max="100"
                        ></input>
                        <button
                          class="quantity-right-plus btn btn-success btn-number"
                          onClick={(e) => {
                            dispatch({
                              type: "Increment_Quantity",
                              payload: item,
                            });
                          }}
                        >
                          <span class="glyphicon glyphicon-plus">+</span>
                        </button>
                      </div>
                    </td>
                    <td>&#8377; {item.price * item.qty}</td>
                    <td>
                      <button
                        onClick={(e) => deleteItem(item)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="4">Total Amount</th>
                  <th>
                    &#8377;{" "}
                    {state.cart.reduce(
                      (a, b) => a + b.price * parseInt(b.qty),
                      0
                    )}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="col-sm-4">
            <form onSubmit={handleSubmit}>
              <h5 className="p-2">Address Information</h5>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">City</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="city"
                    pattern="[A-Za-z]+"
                    title="Only Alphabet input is allowed"
                    required
                    placeholder="Enter the City"
                    value={address.city}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">State</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="state"
                    pattern="[A-Za-z]+"
                    title="Only Alphabet input is allowed"
                    required
                    placeholder="Enter the State"
                    value={address.state}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Pin Code</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    pattern="[0-9]+"
                    minLength={6}
                    maxLength={6}
                    placeholder="Enter 6 digit Pin Code"
                    title="Only numerical values allowed of 6 digits"
                    required
                    name="zip"
                    value={address.zip}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Country</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="country"
                    readOnly
                    value={address.country}
                    onChange={handleAddressInput}
                    className="form-control"
                  />
                </div>
              </div>

              <h5 className="p-2">Payment Information</h5>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">Card No</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    pattern="[0-9]+"
                    minLength={16}
                    maxLength={16}
                    placeholder="Enter 16 digit No."
                    title="Only numerical value allowed of 16 digits"
                    name="cardno"
                    value={payment.cardno}
                    onChange={handlePaymentInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Name on Card
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    pattern="[A-Za-z ]+"
                    title="Only Alphabet input is allowed"
                    required
                    placeholder="Enter Name on Card"
                    name="nameoncard"
                    value={payment.nameoncard}
                    onChange={handlePaymentInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Expiry Date
                </label>
                <div className="col-sm-8">
                  {/* <input type="month" required className="form-control" />                  */}
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    maxLength="5" // Set maximum length to prevent input beyond MM/YY format
                    pattern="\d{2}/\d{2}" // Add pattern for MM/YY format
                    title="Please enter a valid expiry date in the format MM/YY eg. 02/28"
                    required // Make the input required
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">CVV</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    pattern="[0-9]+"
                    minLength={3}
                    maxLength={3}
                    placeholder="Enter 3 digit No."
                    title="Only numerical value allowed of 3 digits"
                    name="cvv"
                    required
                    value={payment.cvv}
                    onChange={handlePaymentInput}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-sm-4 form-control-label">
                  Billed Amount
                </label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="amount"
                    readOnly
                    value={payment.amount}
                    className="form-control"
                  />
                </div>
              </div>
              <button className="btn btn-success float-right">
                Place Order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h4>Cart is Empty</h4>
      )}
    </div>
  );
}

export default ViewCart;
