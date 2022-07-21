import  React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Alert} from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGetLoggedUserQuery, useLoginUserMutation, useProductDetailMutation } from '../services/userAuthApi';
import { getToken, storeToken } from '../services/LocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../features/user/UserSlice'



const theme = createTheme();

export default function SignInSide() {
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
      })

      const navigate = useNavigate();
    const [loginUser , ] = useLoginUserMutation()
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const actual_data = {
        email: data.get('email'),
        password: data.get('password'),
    }
    if (actual_data.email && actual_data.password) {
        const res = await loginUser(actual_data)
        console.log(res,'res');
        if(res.data && res.data.status ==="success"){
            setError({ status: true, msg: res.data.message, type: 'success' })
            storeToken(res.data.token)
          console.log(res.data.token,'token');
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
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
             
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

 

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
              <Grid container>
                <Grid item xs>
                <Link to='/signup'>
                  <Typography  variant="body2">
                    Forgot password?
                  </Typography>
                </Link>

                </Grid>
                <Grid item>

                <Link to='/signup'>

                  <Typography  variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Typography>
                  </Link>

                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      

    </ThemeProvider>
  

  );
}