import React from "react";
import { Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { removeToken , getToken } from '../services/LocalStorage'
import {  unsetUserInfo } from '../features/user/UserSlice'
import { unsetUserToken } from '../features/user/authSlice'
import { useLogoutUserMutation } from "../services/userAuthApi";
function Navbar() {
  const name = useSelector((state) => state.user.name);
  const tokens = useSelector((state) => state.token.token);

console.log(name ,'name');
const  [ logoutUser] = useLogoutUserMutation()
const navigate = useNavigate()
const dispatch = useDispatch()
let token = getToken()
const handleLogout = async () => {
  const res = await logoutUser({ token })
  if (res.data.status === "success") {
    dispatch(unsetUserInfo({ email: "", name: "" }))
    dispatch(unsetUserToken({ token: null}))
    removeToken('token')
    navigate('/login')
  }
}


  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">
          ShoppingX
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {tokens != null ? (
            <>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>             
              </ul>
              <form class="d-flex" action="" method="">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-warning">
                  S
                </button>
              </form>
              <ul>
                <li class="nav-item dropdown mx-2">
                  <a
                    class="nav-link dropdown-toggle text-white"
                    href="#"
                    id="nameDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {name}
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="nameDropdown">
                    <li>
                      <Link class="nav-link dropdown-item" to="/name">
                        name
                      </Link>
                    </li>
                    <li>
                      <a class="nav-link"  onClick={handleLogout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul class="navbar-nav   mb-lg-0">
 
              </ul>
            </>
          ) : (
            <>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item mx-2 nav-link text-white">
                  <Link class="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li class="nav-item mx-2 nav-link text-white">
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </ul>
            </>
          )}

          <div></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
