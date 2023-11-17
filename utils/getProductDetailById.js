import React, { useContext } from "react";
import { ProductsDetailsContext } from "../App";

const GetProductDetailById = (id) => {
  let productDetails = useContext(ProductsDetailsContext);

  productDetails = productDetails.filter(
    (item, i) => Number(item.id) == Number(id)
  );
  return productDetails[0];
};

export default GetProductDetailById;
