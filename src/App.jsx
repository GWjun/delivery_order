import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./lib/MyLayout";

import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";

const App = () => (
  <Layout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  </Layout>
);

export default App;
