import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import {Grid , Alert} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useClienttDetailMutation,
  useRegisterUserMutation,
} from "../services/userAuthApi";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [clienttDetail] = useClienttDetailMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      product: data.get("product"),
      address: data.get("address"),
    });
    const actual_data = {
      name: data.get("name"),
      product: data.get("product"),
      address: data.get("address"),
    };

    if (actual_data.name && actual_data.product && actual_data.address) {
      const res = await clienttDetail(actual_data);
      console.log(res, "res");
      if (res.data && res.data.status === "success") {
        setError({ status: true, msg: res.data.message, type: "success" });
        document.getElementById("formid").reset();
        navigate('/')
      }
      if (res.error && res.error.data.status == "failed") {
        setError({ status: true, msg: res.error.data.message, type: "error" });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
           <img src="./images/customer.jpg" width={100}/>
          <Typography component="h1" variant="h5">
            Add Customer
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            id='formid'
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="product"
                  label="Product"
                  name="product"
                  autoComplete="product"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
            {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
