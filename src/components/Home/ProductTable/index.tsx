import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ProductEntity } from "../../../core/domain/entities/product_entity";
import { ProductTableItem } from "./ProductTableItem";
import styles from "./styles/ProductTable.module.scss";

interface ProductTableProps {
  handlePageChange: (type: string) => void;
  products: ProductEntity[];
  handleProductDeletion: (id: string) => void
}

export function ProductTable({
  handlePageChange,
  products,
  handleProductDeletion,
}: ProductTableProps) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableNavigation}>
        <button
          name="offset"
          onClick={() => handlePageChange("previus")}
        >
          <IoIosArrowBack className={styles.tableNavigationIcon} />
        </button>
        <button 
          name="offset"
          onClick={() => handlePageChange("next")}
        >
          next page
          <IoIosArrowForward className={styles.tableNavigationIcon} />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductTableItem
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              products={products}
              handleProductDeletion={handleProductDeletion}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
