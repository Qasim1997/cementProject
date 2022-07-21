import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/user' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: 'register',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'login',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    logoutUser: builder.mutation({
      query: ({ token }) => {
        return {
          url: 'logout',
          method: 'POST',
          body: {},
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),
    getLoggedUser: builder.query({
      query: (token) => {
        return {
          url: 'loggeduser',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: 'changepassword',
          method: 'POST',
          body: actualData,
          headers: {
            'authorization': `Bearer ${token}`,
          }
        }
      }
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: 'send-reset-password-email',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    resetPassword: builder.mutation({
      query: ({ actualData, token }) => {
        return {
          url: `/reset-password/${token}`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    productDetail: builder.mutation({
      query: ( actualData) => {
        return {
          url: `product`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    clienttDetail: builder.mutation({
      query: ( actualData) => {
        return {
          url: `client`,
          method: 'POST',
          body: actualData,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    productstock: builder.query({
      query: () => {
        return {
          url: 'product',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getsingleproduct: builder.query({
      query: (id) => {
        return {
          url: `product/${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getsinglecustomer: builder.query({
      query: (id) => {
        return {
          url: `client/${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    clientData: builder.query({
      query: () => {
        return {
          url: 'client',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    editclientData: builder.mutation({
      query: (actual_data) => {
        return {
          url: 'client',
          method: 'PUT',
          body:actual_data,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    editSingleroduct: builder.mutation({
      query: ({actual_data , id}) => {
        return {
          url: `product/${id}`,
          method: 'PUT',
          body:actual_data,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    editSingleclient: builder.mutation({
      query: ({actual_data , id}) => {
        return {
          url: `client/${id}`,
          method: 'PUT',
          body:actual_data,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    deleteclientData: builder.mutation({
      query: (id) => {
        return {
          url: `client/${id}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    deleteproductData: builder.mutation({
      query: (id) => {
        return {
          url: `product/${id}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
  }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetLoggedUserQuery, useChangeUserPasswordMutation, useSendPasswordResetEmailMutation, useResetPasswordMutation , useProductDetailMutation , useClienttDetailMutation , useProductstockQuery , useClientDataQuery,useEditclientDataMutation,useDeleteclientDataMutation , useGetsingleproductQuery ,useEditSingleroductMutation ,useDeleteproductDataMutation , useEditSingleclientMutation , useGetsinglecustomerQuery} = userAuthApi