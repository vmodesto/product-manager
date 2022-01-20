import { ProductEntity } from "../entities/product_entity";
import { ApiResponseProducts, ProductParams } from "../usecases/get_all_products_usecase";

export interface IProductRepository {
  all: (params: ProductParams) => Promise<ApiResponseProducts>,
  delete: (id: string) => Promise<void>,
  find: (id: string) => Promise<ProductEntity>,
  update: (params: ProductEntity) => Promise<ProductEntity>
}