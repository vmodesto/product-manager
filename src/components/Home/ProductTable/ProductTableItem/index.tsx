import router from "next/router";
import { useState } from "react";
import { ProductEntity } from "../../../../core/domain/entities/product_entity";
import { ModalDeleteProduct } from "./ModalDeleteProduct";

interface ProductTableItemProps {
  id: string,
  name: string,
  description: string,
  price: string,
  quantity: number,
  products: ProductEntity[],
  handleProductDeletion: (id: string) => void
}

export function ProductTableItem({
  id,
  name,
  description,
  price,
  quantity,
  products,
  handleProductDeletion
}: ProductTableItemProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(parseFloat(price))}
        </td>
        <td>{quantity}</td>
        <td>
          <div>
            <button onClick={() => router.push(`/products/${id}`)}>Show</button>
            <button onClick={openModal}>Delete</button>
          </div>
        </td>
      </tr>
      <ModalDeleteProduct
        modalIsOpen={modalIsOpen}
        onRequestClose={closeModal}
        id={id}
        name={name}
        products={products}
        handleProductDeletion={handleProductDeletion}
      />
    </>
  );
}
