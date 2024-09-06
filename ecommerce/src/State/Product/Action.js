import { api } from "../../config/apiConfig";
import {
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  
  const {
    colors = [],
    sizes = [],
    minPrice,
    maxprice,
    priceValue
  } = reqData;

  try {
    const { data } = await api.get('/api/products', {
      params: {
        color: colors.length > 0 ? colors.join(',') : undefined, // Send all selected colors as a comma-separated string
        // Add other filter parameters here if needed
        size: sizes.length > 0 ? sizes.join(',') : undefined,
        minPrice,
    maxprice,
    priceValue
      },
    });

    console.log("Product data", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;
  
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    console.log("data",data)
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};
