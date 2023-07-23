import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [displayError, setDisplayError] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredEmail = "admin@gmail.com";
    const requiredPasword = "Abcd@1234";
    const email = e?.target[0].value;
    const password = e?.target[1].value;
    if (requiredEmail === email && requiredPasword === password) {
      navigate("/DashBoard");
    } else {
      setDisplayError(true);
      // alert("Worng Email or Password");
    }
  };

  const handleClose = () => {
    setDisplayError(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // border: "1px solid red",
          height: "auto",
          marginTop: "150px",
        }}
      >
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "65ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            variant="standard"
            id="standard-basic"
            name="Email"
            type="text"
            label="Email"
          />
          <br />
          <TextField
            variant="standard"
            id="standard-basic"
            name="Password"
            type="text"
            label="Password"
          />
          <br />

          <Button
            style={{ width: "150px" }}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={displayError}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Worng Email or Password...!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
