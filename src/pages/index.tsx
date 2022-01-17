import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import styles from "../../styles/Home.module.scss";
import React, { useEffect, useState } from "react";
import {
  ApiResponseProducts,
  GetAllProductsUsecase,
  ProductParams,
} from "../core/domain/usecases/get_all_products_usecase";
import { ProductRepository } from "../core/data/repositories/product_repository_implementation";
import { ProductTable } from "../components/ProductTable";
import { OrderProducts } from "../components/OrderProducts";
import { ProductsInfo } from "../components/ProductsInfo";
import { ProductFilter } from "../components/ProductFilter";

const Home: NextPage = () => {
  const [productParams, setProductParams] = useState<ProductParams>({
    limit: 15,
    offset: 0,
    order: "",
    orderElement: "",
    elementToFilter: "",
    condition: "",
    filterValue: "",
  });
  const [productsData, setProductsData] = useState<ApiResponseProducts>({
    meta: {
      current_page: 0,
      items_per_page: 0,
      total_items_filtered: 0,
      total_items: 0,
      total_pages: 0,
    },
    products: [],
  });
  const repository = new ProductRepository();
  const usecase = new GetAllProductsUsecase(repository);

  useEffect(() => {
    getProducts();
  }, [
    productParams.order,
    productParams.orderElement,
    productParams.offset,
  ]);

  const getProducts = async () => {
    const response = await usecase.execute(productParams);
    setProductsData(response);
  };

  const handlePageChange = (type: string) => {
    const newOffset =
      type === "next"
        ? productParams.offset + productParams.limit
        : productParams.offset - productParams.limit;
    if (newOffset >= 0 && newOffset <= productsData?.meta.total_items) {
      setProductParams({ ...productParams, offset: newOffset });
    } else {
      return;
    }
  };

  const handleOrderClick = (e: React.FormEvent<HTMLButtonElement>) => {
    if (e.currentTarget.name === "def") {
      setProductParams({ ...productParams, order: "", orderElement: "" });
    } else if (productParams.orderElement === "") {
      setProductParams({
        ...productParams,
        order: e.currentTarget.name,
        orderElement: "id",
      });
    } else {
      setProductParams({ ...productParams, order: e.currentTarget.name });
    }
  };

  const handleOrderByClick = (e: React.FormEvent<HTMLElement>) => {
    if (productParams.order === "") {
      setProductParams({
        ...productParams,
        orderElement: e.currentTarget.id,
        order: "asc",
      });
    } else {
      setProductParams({
        ...productParams,
        orderElement: e.currentTarget.id,
      });
    }
  };

  const handleFilterConditionClick = (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    console.log(e.currentTarget.id);
    setProductParams({ ...productParams, condition: e.currentTarget.id });
  };

  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setProductParams({
      ...productParams,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleApplyFilterClick = () => {
    getProducts();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>HOME | ProductManager</title>
      </Head>
      <Header />
      <div className={styles.productsContainer}>
        <div className={styles.tableOptions}>
          <div className={styles.headerGroup}>
            <OrderProducts
              productParams={productParams}
              handleOrderClick={handleOrderClick}
              handleOrderByClick={handleOrderByClick}
            />
            <ProductFilter
              elementToFilter={productParams.elementToFilter}
              filterValue={productParams.filterValue}
              condition={productParams.condition}
              handleFilterConditionClick={handleFilterConditionClick}
              handleFilterChange={handleFilterChange}
              handleApplyFilterClick={handleApplyFilterClick}
            />
          </div>
          <ProductsInfo meta={productsData.meta} />
        </div>
        <ProductTable
          handlePageChange={handlePageChange}
          products={productsData.products}
        />
      </div>
    </div>
  );
};

export default Home;
