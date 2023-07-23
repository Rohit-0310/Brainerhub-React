import React from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import classes from "./Dashboard.module.scss";
import { CartContext } from "../Context/CartContext";
const DashBoard = () => {
  const [data, setData] = React.useState([]);
  const { setCartCount } = React.useContext(CartContext);

  const productData = () => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setData(res?.data);
    });
  };
  React.useEffect(() => {
    productData();
  }, []);

  const handleCard = (item) => {
    const cartValue = localStorage.getItem("cartItems");
    const cartItem = cartValue ? JSON.parse(cartValue) : [];
    cartItem?.push(item);
    localStorage.setItem("cartItems", [JSON.stringify(cartItem)]);
    setCartCount(cartItem);
  };
  return (
    <div>
      <Navbar />
      <Box className={classes.product}>
        {data &&
          data.map((item) => {
            return (
              <Box key={item?.id} className={classes.card}>
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      height="200px"
                      width="150px"
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "20px" }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: "16px" }}>
                      {item.category}
                    </Typography>
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
                    <Box>
                      <Button
                        onClick={() => handleCard(item)}
                        className={classes.cartButton}
                        variant="contained"
                      >
                        Add To Cart
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Box>
    </div>
  );
};

export default DashBoard;
