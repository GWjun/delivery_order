import { useEffect, useState } from "react";
import { useDialog, useLoading } from "../../lib/MyLayout";

import ProductApi from "../../../shared/api/ProductApi";
import OrderableProductItem from "./OrderableProductItem";

import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import ErrorDialog from "../../components/ErrorDialog";

const ProductPage = () => {
  const [productList, setProductList] = useState([]);

  const { startLoading, finishLoading } = useLoading();
  const { openDialog } = useDialog();

  const fetch = async () => {
    startLoading("메뉴목록 로딩중...");
    try {
      const productList = await ProductApi.fetchProductList();
      setProductList(productList);
    } catch (e) {
      openDialog(<ErrorDialog />);
      console.error(e);
    }
    finishLoading();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="ProductPage">
      <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
        <ul>
          {productList.map((product) => (
            <li key={product.id}>
              <OrderableProductItem product={product} />
            </li>
          ))}
        </ul>
      </Page>
    </div>
  );
};

export default ProductPage;
