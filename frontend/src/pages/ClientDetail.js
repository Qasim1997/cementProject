import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useClientDataQuery,
  useDeleteclientDataMutation,
  useProductstockQuery,
} from "../services/userAuthApi";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Grid, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useClienttDetailMutation,
  useRegisterUserMutation,
} from "../services/userAuthApi";

const theme = createTheme();
const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

export default function BasicTable() {
  const x = 1;

  for (let x = 0; x < 1; x++) {
    // window.location.reload(false);
    console.log(x, "x");
  }
  const navigate = useNavigate();
  console.log(useProductstockQuery(), "data");
  const { data, isSuccess, isError, errorMessage, isLoading } =
    useClientDataQuery();
  const [deleteclientData] = useDeleteclientDataMutation();
  const deletedata = async (id) => {
    const res = await deleteclientData(id);
    console.log(res, "res");
    navigate("/client");
  };

  ///
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
      }
      if (res.error && res.error.data.status == "failed") {
        setError({ status: true, msg: res.error.data.message, type: "error" });
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };

  return (
    <>
      <div className="isErrorIsLoading">
        {isError && <p>An error occured</p>}
        <div className="po">{isLoading && <h1>sdssds</h1>}</div>
      </div>
      {isSuccess && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">product</TableCell>
                <TableCell align="right">address</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.product}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup>
                      {row.id}
                      <Link to='/customer'>
                        <Button variant="contained" className="me-2">
                          Add
                        </Button>
                      </Link>

                      <Link to={`edit/${row.id}`}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className="me-2"
                        >
                          edit
                        </Button>
                      </Link>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deletedata(row.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
