import { ProductEntity } from "../entities/product_entity";
import { ApiResponseProducts, ProductParams } from "../usecases/get_all_products_usecase";

export interface IProductRepository {
  getAllProducts: (productParams: ProductParams) => Promise<ApiResponseProducts>
}