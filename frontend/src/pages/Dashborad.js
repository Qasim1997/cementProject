import React , {useEffect} from "react";
import Card from "../component/Card";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useGetLoggedUserQuery, useLoginUserMutation, useProductDetailMutation } from '../services/userAuthApi';
import { getToken, storeToken } from '../services/LocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../features/user/UserSlice'
import { setUserToken } from '../features/user/authSlice'
function Dashborad() {
  const name = useSelector((state) => state.user.name);

  const token = getToken()
  const {data ,isSuccess} = useGetLoggedUserQuery(token)
  console.log( useGetLoggedUserQuery(token));
  const dispatch = useDispatch()
  useEffect(() => {
    if(data && isSuccess){
      dispatch(setUserInfo({
        email: data.user.email,
        name: data.user.name, 
      }))
    }
  }, [data , isSuccess , dispatch])
  useEffect(() => {
    if(data && isSuccess){
      dispatch(setUserToken({
        token: token,
      }))
    }
  }, [data , isSuccess , dispatch])
  return (
    <div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 0.5 }} className='ms-5'>
      <Grid item xs={12} md={6} lg={4} >
          <Card img={<img src="./images/cement1.png" width={100}/>} title='Add Product' links='product_add'/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
        <Card img={<img src="./images/client.jpg" width={100}/>} title='Add Customer' links='customer'/>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
        <Card img={<img src="./images/staf.webp" width={100}/>} title='Stock' links='stock'/>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
        <Card img={<img src="./images/staf.webp" width={100}/>} title='Customer' links='customer_detail'/>
        </Grid>
  
      </Grid>
     
    </div>
  );
}

export default Dashborad;
