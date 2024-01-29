import React, { useEffect, useState } from "react";
import MyReact from "../../lib/MyReact";

import OrderApi from "../../../shared/api/OrderApi";
import ProductApi from "../../../shared/api/ProductApi";

import PaymentButton from "./PaymentButton";
import Page from "../../components/Page";
import Title from "../../components/Title";
import OrderForm from "./OrderForm";
import ProductItem from "../../components/ProductItem";
import { useDialog, useLoading } from "../../lib/MyLayout";
import PaymentSuccessDialog from "./PaymentSuccessDialog";
import ErrorDialog from "../../components/ErrorDialog";

const CartPage = () => {
  const [product, setProduct] = useState();
  const { productId } = MyReact.useParams();

  const { startLoading, finishLoading } = useLoading();
  const { openDialog } = useDialog();

  const handleSubmit = async (values) => {
    startLoading("결제중...");
    try {
      await OrderApi.createOrder(values);
    } catch (e) {
      console.errer(e);
    }
    finishLoading();
    openDialog(<PaymentSuccessDialog />);
  };

  const fetch = async (productId) => {
    startLoading("장바구니에 담는중...");
    try {
      const product = await ProductApi.fetchProduct(productId);
      setProduct(product);
    } catch (e) {
      openDialog(<ErrorDialog />);
      console.errer(e);
    }
    finishLoading();
  };

  useEffect(() => {
    if (productId) fetch(productId);
  }, [productId]);

  return (
    <div className="CartPage">
      <Page
        header={<Title backUrl="/">장바구니</Title>}
        footer={<PaymentButton />}
      >
        {product && <ProductItem product={product} />}
        <OrderForm onSubmit={handleSubmit} />
      </Page>
    </div>
  );
};

export default CartPage;
