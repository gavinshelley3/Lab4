import "./App.css";
import React, { useState, useEffect } from "react";
import Product from "./Product";
import Error from "./Error";
import axios from "axios";
import { Stack } from "@mui/system";

function App() {
  const [cart, setCart] = useState([]);
  const [store, setStore] = useState([]);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart");
      setCart(res.data);
    } catch (err) {
      setError(err);
    }
  };

  const fetchStore = async () => {
    try {
      // await addProducts();
      const res = await axios.get("/api/products");
      console.log(res.data);
      setStore(res.data);
    } catch (err) {
      setError(err);
    }
  };

  const updateCart = async (id, quantity) => {
    try {
      console.log(id, quantity);

      await axios.post(`/api/cart/${id}`);
      console.log(id, quantity);

      // wait half a second
      await new Promise((resolve) => setTimeout(resolve, 500));
      await axios.put(`/api/cart/${id}/${quantity}`);

      await fetchCart();
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchStore();
    fetchCart();
  }, []);

  return (
    <>
      <script src="add_products.js"></script>
      <div className="App">
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "100%",
            height: "100vh",
            margin: "20px",
          }}
        >
          <div className="store">
            <h1>Store</h1>
            <div className="products">
              <Stack spacing={2}>
                {store.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    setError={setError}
                    updateCart={updateCart}
                    cart={cart}
                  />
                ))}
              </Stack>
            </div>
          </div>
          <div className="cart">
            <h1>Cart</h1>
            <div className="products">
              <Stack spacing={2}>
                {cart.map((cartRecord) => {
                  const product = store.find((product) => {
                    return product.id === cartRecord.id;
                  });

                  return (
                    <Product
                      key={cartRecord.id}
                      product={product}
                      setError={setError}
                      updateCart={updateCart}
                      cart={cart}
                    />
                  );
                })}
              </Stack>
            </div>
          </div>
        </div>
        {error && <Error error={error} />}
      </div>
    </>
  );
}

export default App;
