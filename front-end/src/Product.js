import { Button, Card, Dialog, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
// const { addProducts } = require("./add_products.js");

import { LoadingButton } from "@mui/lab";

function Product(props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  // const is in cart
  const isInCart = props.cart.find((item) => {
    return item.id === props.product.id;
  });

  let originalQuantity = 0;

  if (isInCart) {
    originalQuantity = isInCart.quantity;
  }

  console.log(props);

  const [quantity, setQuantity] = useState(originalQuantity);

  useEffect(() => {
    setQuantity(originalQuantity);
  }, [props.cart]);

  const id = props.id;
  const product = props.product;
  const setError = props.setError;
  const updateCart = props.updateCart;

  const [adding, setAdding] = useState(false);

  const updateQuantity = async () => {
    try {
      setAdding(true);
      console.log(id);
      await updateCart(id, quantity);
      setAdding(false);
      setDialogOpen(false);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Card sx={{}}>
      <Typography>{product.name}</Typography>
      <Typography>{product.price}</Typography>
      {
        // display quantity

        "Quantity: " + quantity
      }
      <br></br>
      <Button
        onClick={() => {
          // open dialog
          setDialogOpen(true);
        }}
      >
        {isInCart ? (
          <Typography>Update Quantity</Typography>
        ) : (
          <Typography>Add to Cart</Typography>
        )}
      </Button>

      <Dialog
        PaperProps={{
          sx: {
            p: 2,
          },
        }}
        open={dialogOpen}
        onClose={() => {
          // close dialog
          setDialogOpen(false);
        }}
      >
        <TextField
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          label="Quantity"
          type="number"
        ></TextField>

        <LoadingButton onClick={updateQuantity} loading={adding}>
          {isInCart ? (
            <Typography>Update Quantity</Typography>
          ) : (
            <Typography>Add to Cart</Typography>
          )}{" "}
        </LoadingButton>
      </Dialog>
    </Card>
  );
}

export default Product;
