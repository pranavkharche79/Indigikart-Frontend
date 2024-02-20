import "./App.css";
import Header from "./components/Header";
import RegSupplier from "./components/RegSupplier";
import NavBar from "./components/NavBar";
import RegCustomer from "./components/RegCustomer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminProfile from "./components/AdminProfile";
import AllCustomers from "./components/AllCustomers";
import AllSellers from "./components/AllSellers";
import SellerLogin from "./components/SellerLogin";
import CustomerLogin from "./components/CustomerLogin";
import SellerProfile from "./components/SellerProfile";
import AddProduct from "./components/AddProduct";
import MyProducts from "./components/MyProducts";
import AllProduct from "./components/AllProducts";
import EditProduct from "./components/EditProduct";
import CustomerProfile from "./components/CustomerProfile";
import MyOrders from "./components/MyOrders";
import Orders from "./components/Orders";
import ViewCart from "./components/ViewCart";
import Categories from "./components/Categories";
import GoToTop from "./components/GoToTop";

function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <NavBar />
        <div className="container-fluid p-2"></div>
        <Switch>
          {/* DEFAULT */}
          <Route component={AllProduct} path="/" exact />
          <Route component={AllProduct} path="/cats/:catid" />

          {/* ADMIN */}
          <Route component={AdminLogin} path="/alogin" />
          <Route component={AdminProfile} path="/aprofile" />
          <Route component={Categories} path="/categories" />
          <Route component={AllSellers} path="/sellers" />
          <Route component={AllCustomers} path="/customers" />
          <Route component={Orders} path="/orders" />
          <Route component={Categories} path="/categories/:catid" />

          {/* CUSTOMER */}
          <Route component={RegCustomer} path="/register" />
          <Route component={CustomerLogin} path="/clogin" />
          <Route component={CustomerProfile} path="/cprofile" />
          <Route component={MyOrders} path="/myorders" />
          <Route component={ViewCart} path="/cart" />

          {/* SELLER */}
          <Route component={RegSupplier} path="/regsupplier" />
          <Route component={SellerLogin} path="/slogin" />
          <Route component={SellerProfile} path="/sprofile" />
          <Route component={AddProduct} path="/add-product" />
          <Route component={MyProducts} path="/myproducts" />
          <Route component={EditProduct} path="/edit/:prodid" />
        </Switch>
        <GoToTop />
      </BrowserRouter>
    </div>
  );
}

export default App;
