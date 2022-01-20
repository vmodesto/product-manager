import { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../../../../styles/ProductDetail.module.scss";
import { ProductInfo } from "../../../components/ProductDetail/ProductInfo";
import { ProductEntity } from "../../../core/domain/entities/product_entity";
import { ProductRepository } from "../../../core/data/repositories/product_repository_implementation";
const ProductDetail: NextPage = () => {
  const productRepository = new ProductRepository();
  const [product, setProduct] = useState<ProductEntity>({
    id: "",
  name: "",
  description: "",
  price: "",
  quantity: 0,
  related_products: []
  });
  useEffect(() => {
    const productId = window.location.pathname.substring(10)
    getProduct(productId);
  }, []);

  const getProduct = async (id: string) => {
    const response = await productRepository.find(id);
    setProduct(response);
  }

  return (
    <div className={styles.container}>
      <h1>Product detail</h1>
      <div className={styles.productDetailContainer}>
        <ProductInfo
          id={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          quantity={product.quantity}
          relatedProducts={product.related_products}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
