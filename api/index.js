const crypto = require("node:crypto");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const { getDb } = require("./database");
const { addProducts } = require("./add_products");
const app = express();

groceryStore = [];

groceryCart = [];

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.get("/api/products", async (req, res) => {
  products = groceryStore;
  res.status(200).json(products);
});

app.get("/api/products/:id", async (req, res) => {
  product = groceryStore.find((product) => {
    return product.id === req.params.id;
  });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.post("/api/products", async (req, res) => {
  const id = crypto.randomUUID();
  let checkProduct = groceryStore.find((product) => {
    return product.name === req.body.name;
  });
  if (checkProduct !== undefined) {
    res.status(400).send("Product already exists");
  } else {
    let product = {
      id: id,
      name: req.body.name,
      price: req.body.price,
      quantity: 1,
    };
    groceryStore.push(product);
    res.status(200).json(product);
  }
});

app.put("/api/products/:id/:quantity", async (req, res) => {
  product = groceryStore.find((product) => {
    item = product.id === req.params.id;
    if (item) {
      product.quantity = req.params.quantity;

      if (product.quantity === 0) {
        groceryStore = groceryStore.filter((product) => {
          return product.id !== req.params.id;
        });
      } else {
        res.status(200).json(product);
      }
    } else {
      res.status(404).send("Product not found");
    }
  });
});

app.delete("/api/products/:id", async (req, res) => {
  product = groceryStore.find((product) => {
    return product.id === req.params.id;
  });
  if (product) {
    groceryStore = groceryStore.filter((product) => {
      return product.id !== req.params.id;
    });
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.get("/api/cart", async (req, res) => {
  products = groceryCart;
  res.status(200).json(products);
});

app.get("/api/cart/:id", async (req, res) => {
  let product = groceryCart.find((product) => {
    return product.id === req.params.id;
  });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.post("/api/cart/:id", async (req, res) => {
  const id = req.params.id;
  let findProduct = groceryStore.find((product) => {
    return product.id === id;
  });
  if (findProduct) {
    let checkProduct = groceryCart.find((product) => {
      return product.id === id;
    });
    if (checkProduct) {
      checkProduct.quantity += 1;
      res.status(200).json(checkProduct);
    } else {
      let product = {
        id: id,
        quantity: 1,
      };
      groceryCart.push(product);
      res.status(200).json(product);
    }
  } else {
    res.status(404).send("Product not found");
  }
});

app.put("/api/cart/:id/:quantity", async (req, res) => {
  console.log(req.params);

  const quantity = parseInt(req.params.quantity);
  let product = groceryCart.find((product) => {
    return product.id === req.params.id;
  });
  if (product) {
    product.quantity = quantity;
    if (product.quantity == 0) {
      groceryCart = groceryCart.filter((product) => {
        return product.id !== req.params.id;
      });
    }
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  product = groceryCart.find((product) => {
    return product.id === req.params.id;
  });
  if (product) {
    groceryCart = groceryCart.filter((product) => {
      return product.id !== req.params.id;
    });
    res.status(200).json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

// app.listen(3000, () => {
//   console.log("Server listening on port 3000");
//   addProducts();
// });

module.exports = app;
