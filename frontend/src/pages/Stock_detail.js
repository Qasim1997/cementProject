import  React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDeleteproductDataMutation, useProductstockQuery } from "../services/userAuthApi";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {Link, useNavigate} from 'react-router-dom'



export default function BasicTable() {
  console.log(useProductstockQuery(), "data");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate()
    const { data, isSuccess, isError, errorMessage, isLoading } =
    useProductstockQuery();
    const [deleteproductData] = useDeleteproductDataMutation()
    const deleteproduct = async(id) => {
       const  res = await  deleteproductData(id)
       if (res.data && res.data.status === "success") {
        window.location.reload(false);
        setError({ status: true, msg: res.data.message, type: "success" });
        navigate('/customer_detail')
        
      }
      if (res.error && res.error.data.status == "failed") {
        setError({ status: true, msg: res.error.data.message, type: "error" });
      }
    }
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
                <TableCell align="right">price</TableCell>
                <TableCell align="right">stock</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup>
                    <Link to={`add/${row.id}`}>

                      <Button variant="contained" className="me-2" >
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
                     
                      <Button variant="contained" color="error" onClick={() => deleteproduct(row.id)}>
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
