import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../../styles/Home.module.scss";
import React, { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { ProductRepository } from "../../core/data/repositories/product_repository_implementation";
import {
  ApiResponseProducts,
  GetAllProductsUsecase,
  ProductParams,
} from "../../core/domain/usecases/get_all_products_usecase";
import { OrderProducts } from "../../components/Home/OrderProducts";
import { ProductFilter } from "../../components/Home/ProductFilter";
import { ProductsInfo } from "../../components/Home/ProductsInfo";
import { ProductTable } from "../../components/Home/ProductTable";
import { useLocalStorage } from "../../utils/use_local_storage";

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useLocalStorage("currentPage", 0);
  const [productParams, setProductParams] = useState<ProductParams>({
    limit: 25,
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
    setProductParams({...productParams, offset: currentPage});
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
      setCurrentPage(newOffset);
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

  const handleProductDeletion = (id: string) => {
    getProducts();
  };

  const handleFilterConditionClick = (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    setProductParams({ ...productParams, condition: e.currentTarget.id });
  };

  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setProductParams({
      ...productParams,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleApplyFilterClick = async () => {
    setCurrentPage(0);
    setProductParams({...productParams, offset: 0});
  };

  return (
    <main className={styles.container}>
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
          handleProductDeletion={handleProductDeletion}
        />
      </div>
    </main>
  );
};

export default Home;
