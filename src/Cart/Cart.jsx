import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/Context/CartContext";
import Navbar from "../components/navbar/Navbar";
import classes from "./Cart.module.scss";
const Cart = () => {
  const [cart, setCart] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const { setCartCount } = React.useContext(CartContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    const cartValue = localStorage.getItem("cartItems");
    setCart(JSON.parse(cartValue));
  }, []);
  console.log("cart========>>>>>>>", cart);
  const calculateTotalPrice = React.useMemo(() => {
    let totalPrice = 0;
    cart &&
      cart.forEach((product) => {
        totalPrice += product.price;
      });

    return totalPrice;
  }, [cart]);

  const handleBuy = () => {
    setOpen(true);
    localStorage.clear();
    setCartCount([]);
    setTimeout(() => {
      navigate("/DashBoard");
    }, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("cart?.length", !cart);

  return (
    <div>
      <Navbar />
      <Box className={classes.cartCard}>
        <Grid container spacing={2} sx={{ marginTop: "30px" }}>
          <Grid item xs={9}>
            {cart &&
              cart.map((item) => {
                return (
                  <Grid
                    container
                    spacing={2}
                    key={item.id}
                    className={classes.card}
                  >
                    <Grid item xs={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        height="120px"
                        width="120px"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography sx={{ fontSize: "20px" }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: "16px" }}>
                        {item.category}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          <Box className={classes.rating}>
                            {item.rating?.rate} *
                          </Box>
                          <Box className={classes.count}>
                            ({item.rating?.count})
                          </Box>
                          <Box className={classes.count}>
                            <b>₹ {item.price}</b>
                          </Box>
                        </Box>
                        <Box className={classes.remove}>
                          <Button variant="contained">Remove</Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          <Grid item xs={3} sx={{ padding: "0 30px" }}>
            <Box>
              <Typography>
                <b>Order Summary</b>
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Cart Item</Box>
                <Box>{cart?.length || 0}</Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>Price</Box>
                <Box>
                  <b>₹ {calculateTotalPrice}</b>
                </Box>
              </Box>
              <Box>
                <Button
                  className={classes.buy}
                  onClick={handleBuy}
                  disabled={!cart}
                  variant="contained"
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ThankYou for Purchage. Your order is on the way
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
