import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ProductEntity } from "../../core/domain/entities/product_entity";
import styles from "./styles/ProductTable.module.scss";

interface ProductTableProps {
  handlePageChange: (type: string) => void;
  products: ProductEntity[];
}

export function ProductTable({
  handlePageChange,
  products,
}: ProductTableProps) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableNavigation}>
        <button
          name="offset"
          onClick={(e: any) => handlePageChange("previus")}
        >
          <IoIosArrowBack className={styles.tableNavigationIcon} />
        </button>
        <button 
          name="offset"
          onClick={(e: any) => handlePageChange("next")}
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
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(parseFloat(product.price))}
              </td>
              <td>{product.quantity}</td>
              <td>
                <div>
                  <button>Show</button>
                  <button>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
