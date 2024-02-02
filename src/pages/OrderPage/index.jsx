import { useEffect, useState } from "react";
import { useDialog, useLoading } from "../../lib/MyLayout";

import OrderApi from "../../../shared/api/OrderApi";

import OrderDeliveryCard from "./OrderDeliveryCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderStatusCard from "./OrderStatusCard";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import ErrorDialog from "../../components/ErrorDialog";

const OrderPage = () => {
  const [order, setOrder] = useState();

  const { startLoading, finishLoading } = useLoading();
  const { openDialog } = useDialog();

  const fetch = async () => {
    startLoading("주문 정보 로딩중...");
    try {
      const order = await OrderApi.fetchMyOrder();
      setOrder(order);
    } catch (e) {
      openDialog(<ErrorDialog />);
      console.error(e);
      return;
    }
    finishLoading();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="OrderPage">
      <Page header={<Title>주문내역</Title>} footer={<Navbar />}>
        {order && (
          <>
            <OrderStatusCard order={order} />
            <OrderPaymentCard order={order} />
            <OrderDeliveryCard order={order} />
          </>
        )}
      </Page>
    </div>
  );
};

export default OrderPage;
