import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function CustomerSidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch({ type: "LogOut" });
    sessionStorage.clear();
    enqueueSnackbar("Logout Successfully", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    history.push("/");
  };
  return (
    <div className="list-group">
      <Link to="/cprofile" className="list-group-item list-group-item-action">
        Profile
      </Link>
      <Link to="/myorders" className="list-group-item list-group-item-action">
        My Orders
      </Link>
      <Link
        to="#"
        onClick={logout}
        className="list-group-item list-group-item-action"
      >
        Logout
      </Link>
    </div>
  );
}

export default CustomerSidebar;
