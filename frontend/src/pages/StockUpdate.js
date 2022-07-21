import React, { useRef, useState , useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Grid, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useEditSingleroductMutation,
  useGetsingleproductQuery,
  useProductDetailMutation,
} from "../services/userAuthApi";

const theme = createTheme();

export default function SignUp(props) {
  const { id, category } = useParams();
  const navigate = useNavigate()
  const  responseInfo= useGetsingleproductQuery(id);
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  console.log(id, "id", category);
  const [editsingleproduct] =   useEditSingleroductMutation()

  
  const editproductdata = async (event) => {
    event.preventDefault();
    const data =  new FormData(document.getElementById('formid'));

    console.log({
      name: data.get("name"),
      price: data.get("price"),
    });
    const actual_data = {
      name: data.get("name"),
      price: data.get("price"),
      stock: parseInt(responseInfo.data.stock) + parseInt(data.get("stock")),
      user: data.get("user"),
    };
console.log(parseInt(responseInfo.data.stock) - data.get('stock') ,'data');
    if (
      actual_data.name &&
      actual_data.price &&
      actual_data.stock &&
      actual_data.user
    ) {
      const res = await editsingleproduct({actual_data , id});
      console.log(res, "res");
      if (res.data && res.data.status === "success") {
        setError({ status: true, msg: res.data.message, type: "success" });
        document.getElementById("formid").reset();
        navigate('/stock')
      }
      if (res.error && res.error.data.status == "failed") {
        setError({ status: true, msg: res.error.data.message, type: "error" });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };
  const [productDetail] = useProductDetailMutation();
  console.log( responseInfo);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data =  new FormData(document.getElementById('formid'));

    console.log({
      name: data.get("name"),
      price: data.get("price"),
    });
    const actual_data = {
      name: data.get("name"),
      price: data.get("price"),
      stock: responseInfo.data.stock - data.get("stock"),
      user: data.get("user"),
    };
console.log(responseInfo.data.stock -data.get('stock') ,'data');
    if (
      actual_data.name &&
      actual_data.price &&
      actual_data.stock &&
      actual_data.user
    ) {
      const res = await editsingleproduct({actual_data , id});
      console.log(res, "res");
      if (res.data && res.data.status === "success") {
        setError({ status: true, msg: res.data.message, type: "success" });
        document.getElementById("formid").reset();
        navigate('/stock')

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
        {responseInfo.isSuccess && (
          <>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Product
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                id="formid"
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
                      focused
                      value={responseInfo.data.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="price"
                      label=" "
                      name="price"
                      value={responseInfo.data.price}
                      autoComplete="price"
                      focused
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="stock"
                      label="stock"
                      id="stock"
                      autoComplete="stock"
                      focused
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="user"
                      label="User"
                      id="user"
                      autoComplete="user"
                    />
                  </Grid>
                </Grid>
                {(() => {
                  if (category === "edit") {
                    return (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}
                      >
                        Edit
                      </Button>
                    );
                  } else {
                    return (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} onClick={editproductdata}
                      >
                        Add
                      </Button>
                    );
                  }
                })()}

                {error.status ? (
                  <Alert severity={error.type} sx={{ mt: 3 }}>
                    {error.msg}
                  </Alert>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}

          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
