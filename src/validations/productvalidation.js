const productvalidation = (values) => {
  let errors = {};
  if (!values.pname) {
    errors.pname = "Product Name is required";
  }
  if (!values.price) {
    errors.price = "Price is required";
  }
  if (!values.category) {
    errors.category = "Category is required";
  }
  return errors;
};

export default productvalidation;
