import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
const Navbar = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const { cartCount } = React.useContext(CartContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    handleClose();
  };

  const handleClose = () => {
    setOpenLogoutDialog(false);
  };
  const handleDashboart = () => {
    navigate("/DashBoard");
  };
  const handleOpenCart = () => {
    navigate("/cart");
  };

  const count = React.useMemo(() => {
    const cartValue = localStorage.getItem("cartItems");
    const getCount = cartCount.length > 0 ? cartCount : JSON.parse(cartValue);
    return getCount?.length > 0 ? getCount?.length : 0;
  }, [cartCount]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={handleDashboart}
            >
              Dashboard
            </Typography>
            <IconButton onClick={handleOpenCart}>
              <Badge badgeContent={count} color="error">
                <ShoppingCartIcon sx={{ color: "#FFFFFF" }} />
              </Badge>
            </IconButton>
            <IconButton onClick={() => setOpenLogoutDialog(true)}>
              <LogoutIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      {openLogoutDialog && (
        <div>
          <Dialog
            open={openLogoutDialog}
            onClose={setOpenLogoutDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure, Do you want to logout. ?
            </DialogTitle>
            {/* <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent> */}
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleLogout} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Navbar;
