import axios from "axios";
import { IProductRepository } from "../../domain/repositories/product_repository_interface";
import {
  ApiResponseProducts,
  ProductParams,
} from "../../domain/usecases/get_all_products_usecase";

export class ProductRepository implements IProductRepository {
  async getAllProducts(
    productParams: ProductParams
  ): Promise<ApiResponseProducts> {
    try {
      const response = await axios.get(`http://localhost:3000/products`, {
        params: {
          limit: productParams.limit,
          offset: productParams.offset,
          order: productParams.order,
          order_element: productParams.orderElement,
          element_to_filter: productParams.elementToFilter,
          filter_value: productParams.filterValue,
          condition: productParams.condition,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
