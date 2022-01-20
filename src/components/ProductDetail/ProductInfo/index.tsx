import styles from "./styles/ProductInfo.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { ProductEntity } from "../../../core/domain/entities/product_entity";
import router from "next/router";
import { useLocalStorage } from "../../../utils/use_local_storage";

interface ProductInfoProps {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  relatedProducts?: ProductEntity[];
}

export function ProductInfo({
  id,
  name,
  description,
  price,
  quantity,
  relatedProducts,
}: ProductInfoProps) {
  const [productId, setProductId] = useLocalStorage("productId", "");
  return (
    <div className={styles.container}>
      <div className={styles.productInfoContainer}>
        <h3>Info</h3>
        <div className={styles.productInfo}>
          <h2>
            {name}
            <small
              onClick={() => {
                router.push(`${id}/edit`);
                setProductId(id);
              }}
            >
              edit product
              <AiOutlineEdit id={styles.editProductIcon} />
            </small>
          </h2>
          <p>{description}</p>
          <div>
            <div>
              <small>price:</small>
              <h4>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(parseFloat(price))}
              </h4>
            </div>
            <div>
              <small>quantity:</small>
              <h4>{quantity}</h4>
            </div>
            <div>
              <small>id:</small>
              <h4>{id}</h4>
            </div>
          </div>
        </div>
      </div>
      {relatedProducts?.length !== 0 ? (
        <div className={styles.relatedProductInfoContainer}>
          <h3>Related products</h3>
          <div className={styles.relatedProductsList}>
            {relatedProducts?.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className={styles.relatedProductInfo}
              >
                <h2>{relatedProduct.name}</h2>
                <p>{relatedProduct.description}</p>
                <div>
                  <div>
                    <small>price:</small>
                    <h4>
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(parseFloat(relatedProduct.price))}
                    </h4>
                  </div>
                  <div>
                    <small>quantity:</small>
                    <h4>{relatedProduct.quantity}</h4>
                  </div>
                  <div>
                    <small>id:</small>
                    <h4>{relatedProduct.id}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h4>No related products</h4>
      )}
    </div>
  );
}
