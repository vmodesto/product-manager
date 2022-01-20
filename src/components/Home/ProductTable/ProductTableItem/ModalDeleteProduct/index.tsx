import ReactModal from "react-modal";
import { ProductRepository } from "../../../../../core/data/repositories/product_repository_implementation";
import { ProductEntity } from "../../../../../core/domain/entities/product_entity";
import { ProductsInfo } from "../../../ProductsInfo";
import styles from "./styles/ModalDeleteProduct.module.scss";

interface ModalDeleteProductProps {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  id: string,
  name: string,
  products: ProductEntity[]
  handleProductDeletion: (id: string) => void
}

export function ModalDeleteProduct({
  modalIsOpen,
  onRequestClose,
  id,
  name,
  handleProductDeletion,
}: ModalDeleteProductProps) {
  const productRepository = new ProductRepository();

  const deleteProduct = async (productToDeleteId: string) => {
    await productRepository.delete(productToDeleteId);
    handleProductDeletion(productToDeleteId);
    onRequestClose();
  }
  return (
    <ReactModal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Are you sure?</h2>
      <div className={styles.productInfo}>
      <h5><small>id:</small> {id}</h5>
      <h5><small>name:</small> {name}</h5>
      </div>
      
      <div className={styles.buttonsContainer}>
        <button onClick={onRequestClose}><label>No, close!</label></button>
        <button onClick={() => deleteProduct(id)}>Yes</button>
      </div>
    </ReactModal>
  );
}
