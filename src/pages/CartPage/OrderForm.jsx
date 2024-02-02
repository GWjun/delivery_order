import React, { useRef, useState } from "react";
import FormControl from "../../components/FormControl";

const OrderForm = ({ onSubmit }) => {
  const initialValues = {
    deliveryAddress: "",
    deliveryContact: "",
    paymentMethod: "",
    messageToShop: "",
    messageToRider: "",
  };
  const [values, setValues] = useState(initialValues);

  const blur = useRef({
    deliveryAddress: false,
    deliveryContact: false,
  });

  const handleChange = (e) => {
    const onBlur = e.target.value.length > 0;
    blur.current = {
      ...blur.current,
      [e.target.name]: onBlur,
    };

    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="OrderForm" id="order-form" onSubmit={handleSubmit}>
      <FormControl
        label="주소"
        htmlFor="deliveryAddress"
        required
        error={!blur.current.deliveryAddress && "주소를 입력하세요"}
      >
        <input
          type="text"
          name="deliveryAddress"
          id="deliveryAddress"
          placeholder="배달받을 주소를 입력하세요"
          required
          autoFocus
          value={values.deliveryAddress}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl
        label="연락처"
        htmlFor="deliveryContact"
        required
        error={
          !blur.current.deliveryContact &&
          "전화번호 형식으로 입력하세요. (예: 010-1234-5678)"
        }
      >
        <input
          type="text"
          name="deliveryContact"
          id="deliveryContact"
          placeholder="연락처를 입력하세요"
          pattern="^\d{2,3}-\d{3,4}-\d{4}$"
          required
          value={values.deliveryContact}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl label="결재수단" htmlFor="paymentMethod" required>
        <select name="paymentMethod" id="paymentMethod">
          <option value="마이페이">마이페이</option>
          <option value="만나서 결제">만나서 결제</option>
        </select>
      </FormControl>
      <FormControl label="가게 사장님께" htmlFor="messageToShop">
        <textarea name="messageToShop" id="messageToShop"></textarea>
      </FormControl>
      <FormControl label="라이더님께" htmlFor="messageToRider">
        <textarea name="messageToRider" id="messageToRider"></textarea>
      </FormControl>
    </form>
  );
};

export default OrderForm;
