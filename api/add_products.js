const axios = require("axios");
const products = require("./products.js");

const baseURL = "http://localhost:3000";

function addProducts() {
  // debugger;

  products.forEach(async (product) => {
    try {
      const response = await axios.post(baseURL + "/api/products", product);
      console.log(response.data);
    } catch (err) {
      console.log(err, "error");
    }
  });
}

// export
module.exports = { addProducts };
