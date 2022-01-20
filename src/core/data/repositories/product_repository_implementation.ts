import { api } from "../../../api/api";
import { ProductEntity } from "../../domain/entities/product_entity";
import { IProductRepository } from "../../domain/repositories/product_repository_interface";
import {
  ApiResponseProducts,
  ProductParams,
} from "../../domain/usecases/get_all_products_usecase";

export class ProductRepository implements IProductRepository {
  async all(
    productParams: ProductParams
  ): Promise<ApiResponseProducts> {
    try {
      const response = await api.get(`/products`, {
        params: {
          limit: productParams.limit,
          offset: productParams.offset,
          order: productParams.order,
          element_to_order: productParams.orderElement,
          element_to_filter: productParams.elementToFilter,
          filter_value: productParams.filterValue,
          operator: productParams.condition,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  }

  async delete(productId: string): Promise<void>  {
    try {
      api.delete(`products/${productId}`)
    } catch (error: any){
      console.log(error.message);
    }
  };

  async find(id: string): Promise<ProductEntity> {
    const response = await api.get(`products/${id}`)
    return response.data;
  }

  async update(params: ProductEntity): Promise<ProductEntity> {
    const response = await api.patch(`products/${params.id}`, params)
    return response.data;
  }
}
