import { useNavigate } from "react-router-dom";
import ProductItem from "../../components/ProductItem";

const OrderableProductItem = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cart?productId=${product.id}`);
  };
  return <ProductItem product={product} onClick={handleClick} />;
};

export default OrderableProductItem;
