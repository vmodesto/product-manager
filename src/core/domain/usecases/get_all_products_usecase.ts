import { ProductsMetaEntity } from "../entities/products_meta_entity";
import { ProductEntity } from "../entities/product_entity";
import { IProductRepository } from "../repositories/product_repository_interface";

export type ProductParams = {
  limit: number,
  offset: number,
  order?: string,
  orderElement?: string,
  elementToFilter?: string,
  filterValue?: string
  condition?: string
}

export type ApiResponseProducts = {
  meta: ProductsMetaEntity,
  products: ProductEntity[]
}

export class GetAllProductsUsecase {
  repository: IProductRepository;
  constructor(repository: IProductRepository) {
    this.repository = repository
  }

  async execute(productParams: ProductParams): Promise<ApiResponseProducts> {
    const response = await this.repository.all(productParams)
    return response;
  }
}