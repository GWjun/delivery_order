import React, { useEffect, useState } from "react";

import OrderApi from "../../../shared/api/OrderApi";
import ProductApi from "../../../shared/api/ProductApi";

import PaymentButton from "./PaymentButton";
import PaymentSuccessDialog from "./PaymentSuccessDialog";
import Page from "../../components/Page";
import Title from "../../components/Title";
import OrderForm from "./OrderForm";
import ProductItem from "../../components/ProductItem";

const CartPage = () => {
  const [product, setProduct] = useState();

  const handleSubmit = async (values) => {
    try {
      await OrderApi.createOrder(values);
    } catch (e) {
      console.errer(e);
    }
  };

  const fetch = async (productId) => {
    try {
      const product = await ProductApi.fetchProduct(productId);
      setProduct(product);
    } catch (e) {
      console.errer(e);
    }
  };

  useEffect(() => {
    fetch("CACDA421");
  }, []);

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
