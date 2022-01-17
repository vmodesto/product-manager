import React from "react";
import { ProductParams } from "../../core/domain/usecases/get_all_products_usecase";
import styles from "./styles/OrderProducts.module.scss";

interface OrderProductsProps {
  productParams: ProductParams;
  handleOrderClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleOrderByClick: (e: React.FormEvent<HTMLElement>) => void;
}

export function OrderProducts({
  productParams,
  handleOrderClick,
  handleOrderByClick,
}: OrderProductsProps) {
  return (
    <div className={styles.orderContainer}>
      <h3>Order</h3>
      <div className={styles.order}>
        <button
          name="def"
          className={productParams.order === "" ? styles.selected : ""}
          onClick={handleOrderClick}
        >
          DEFAULT
        </button>
        <div className={styles.orderOptionsContainer}>
          <h5>Order by: </h5>
          <div className={styles.orderOptions}>
            
            <small
              id="id"
              className={
                productParams.orderElement === "id" ? styles.selected : ""
              }
              onClick={handleOrderByClick}
            >
              id
            </small>
            <small
              id="name"
              className={
                productParams.orderElement === "name" ? styles.selected : ""
              }
              onClick={handleOrderByClick}
            >
              name
            </small>
            <small
              id="description"
              className={
                productParams.orderElement === "description"
                  ? styles.selected
                  : ""
              }
              onClick={handleOrderByClick}
            >
              description
            </small>
            <small
              id="price"
              className={
                productParams.orderElement === "price" ? styles.selected : ""
              }
              onClick={handleOrderByClick}
            >
              price
            </small>
            <small
              id="quantity"
              className={
                productParams.orderElement === "quantity" ? styles.selected : ""
              }
              onClick={handleOrderByClick}
            >
              quantity
            </small>
          </div>
        </div>
        <div className={styles.orderTypeContainer}>
          <h5>Order type: </h5>
          <div className={styles.orderTypeButtons}>
            <button
              name="asc"
              onClick={handleOrderClick}
              className={productParams.order === "asc" ? styles.selected : ""}
            >
              ASC
            </button>
            <button
              name="desc"
              onClick={handleOrderClick}
              className={productParams.order === "desc" ? styles.selected : ""}
            >
              DESC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
