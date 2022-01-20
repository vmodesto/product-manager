import { ProductEntity } from "../entities/product_entity";
import { IProductRepository } from "../repositories/product_repository_interface";

export class UpdateProductUsecase {
  repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(productParams: ProductEntity): Promise<ProductEntity> {
    if (productParams.name.length < 4) {
      throw new Error("The name needs to be bigger");
    } else if (
      parseFloat(productParams.price) === 0 ||
      parseFloat(productParams.price) < 0
    ) {
      throw new Error("Invalid price");
    } else if (productParams.quantity < 0) {
      throw new Error("Invalid quantity");
    }
    try {
      const response = await this.repository.update(productParams);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
