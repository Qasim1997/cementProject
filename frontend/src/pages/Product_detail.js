import  React, {useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import {Grid , Alert} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLoginUserMutation, useProductDetailMutation } from '../services/userAuthApi';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();


export default function SignUp() {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })
      const navigate = useNavigate()
    const [productDetail] = useProductDetailMutation()
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        name: data.get('name'),
        price: data.get('price'),
    });
    const actual_data = {
        name: data.get('name'),
        price: data.get('price'),
        stock: data.get('stock'),
        user: data.get('user'),

    }

    if (actual_data.name && actual_data.price && actual_data.stock && actual_data.user) {
        const res = await productDetail(actual_data)
        console.log(res,'res');
        if(res.data && res.data.status ==="success"){
            setError({ status: true, msg: res.data.message, type: 'success' })
            document.getElementById('formid').reset();
        navigate('/')

        
  
        }
        if(res.error && res.error.data.status =="failed"){
          setError({ status: true, msg: res.error.data.message, type: 'error' })
        }
      } else {
        setError({ status: true, msg: "All Fields are Required", type: 'error' })
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
          <img src="./images/product.jpg" width={100}/>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }} id='formid'
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
                  id="price"
                  label=" product price"
                  name="price"
                  autoComplete="price"
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
