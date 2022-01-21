import { NextPage } from "next";
import router from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../../../styles/EditProduct.module.scss";
import { ProductRepository } from "../../../core/data/repositories/product_repository_implementation";
import { ProductEntity } from "../../../core/domain/entities/product_entity";
import { UpdateProductUsecase } from "../../../core/domain/usecases/update_product_usecase";
import { useLocalStorage } from "../../../utils/use_local_storage";

interface ErrorMessages {
  name: string,
  description: string,
  price: string,
  quantity: string,
}


const EditProduct: NextPage = () => {
  const [productId] = useLocalStorage("productId", "");
  const repository = new ProductRepository();
  const usecase = new UpdateProductUsecase(repository);
  const [product, setProduct] = useState<ProductEntity>({
    name: "",
    id: "",
    description: "",
    quantity: 0,
    price: "",
  });
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const productRepository = new ProductRepository();
  useEffect(() => {
    getProduct(productId);
  }, []);

  const getProduct = async (id: string) => {
    const response = await productRepository.find(id);
    setProduct(response);
  };

  const handleProductInputsChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdateButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      await usecase.execute(product);
      router.push(`/products/${product.id}`);
    } catch (error: any) {
      const errorMessage = error.message;
      if (error.message === "The name needs to be bigger") {
        setErrorMessages({ ...errorMessages, name: errorMessage });
      } else if (error.message === "Invalid price") {
        setErrorMessages({ ...errorMessages, price: errorMessage });
        console.log(errorMessages.price);
      } else if (error.message === "Invalid quantity") {
        setErrorMessages({ ...errorMessages, quantity: errorMessage });
      }
    }
  };

  return (
    <main className={styles.container}>
      <h1>Edit product</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleUpdateButtonClick}>
          <label>
            Name
            <input
              name="name"
              type="text"
              value={product.name}
              onChange={handleProductInputsChange}
              placeholder="Name"
            ></input>
            {errorMessages.name.trim() && <small>{errorMessages.name}</small>}
          </label>
          <label>
            Description
            <input
              name="description"
              type="text"
              value={product.description}
              onChange={handleProductInputsChange}
              placeholder="Description"
            ></input>
            {errorMessages.description.trim() && (
              <small>{errorMessages.description}</small>
            )}
          </label>
          <label>
            Price
            <input
              name="price"
              value={product.price}
              onChange={handleProductInputsChange}
              placeholder="Price"
            ></input>
            {errorMessages.price.trim() && (
              <small>{errorMessages.price}</small>
            )}
          </label>
          <label>
            Quantity
            <input
              name="quantity"
              value={product.quantity}
              onChange={handleProductInputsChange}
              type="number"
              placeholder="quantity"
            ></input>
            {errorMessages.quantity.trim() && (
              <small>{errorMessages.quantity}</small>
            )}
          </label>
          <button>Update product</button>
        </form>
      </div>
    </main>
  );
};

export default EditProduct;
