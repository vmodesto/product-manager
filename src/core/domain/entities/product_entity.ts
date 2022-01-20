export interface ProductEntity {
  id: string,
  name: string,
  description: string,
  price: string,
  quantity: number,
  related_products?: ProductEntity[],
}