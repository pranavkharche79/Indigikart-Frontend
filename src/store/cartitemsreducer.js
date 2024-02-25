import { enqueueSnackbar } from "notistack";

const initialState = [];

const cartitemsreducer = (state = initialState, action) => {
  switch (action.type) {
    case "AddItem":
      console.log("ACTION PAYLOAD=>", action.payload);
      return [...state, action.payload];
    case "Increment_Quantity":
      console.log("ACTION increment=>", action.payload);
      const updatedCart = state.map((cartItem) =>
        cartItem.prodid === action.payload.prodid
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem
      );
      return [...updatedCart];

    case "Decrement_Quantity":
      console.log("ACTION decrement=>", action.payload);
      const item_qty = state.filter(
        (item) => item.prodid == action.payload.prodid
      )[0].qty;
      console.log(item_qty);
      if (item_qty > 1) {
        const updatedCart1 = state.map((cartItem) =>
          cartItem.prodid === action.payload.prodid
            ? { ...cartItem, qty: cartItem.qty - 1 }
            : cartItem
        );
        return [...updatedCart1];
      } else {
        enqueueSnackbar("Quantity can not be 0", {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        return state;
      }
    case "RemoveItem":
      state = state.filter((x) => x.prodid !== action.payload.prodid);
      return state;
    case "Clear":
      state = [];
      return state;
    default:
      return state;
  }
};

export default cartitemsreducer;
