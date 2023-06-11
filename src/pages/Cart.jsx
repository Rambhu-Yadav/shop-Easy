import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {
  Alert,
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProductFromCart } from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, totalAmount } = useSelector((state) => state.cartState);
  const { user } = useSelector((state) => state.userState);

  const handleDelete = (id) => {
    dispatch(deleteProductFromCart({ productId: id, userId: user.id }));
  };

  let gstPer = Number((0.18 * totalAmount).toFixed(1));

  return (
    <div>
      <Breadcrumb text={"Cart"} />
      <Box minHeight={"400px"} px={4} py={4} maxWidth={"1320px"} mx={"auto"}>
        {cart?.items?.length === 0 ? (
          <Alert severity="info" variant="standard">
            <Typography variant="h2" fontSize={"18px"} fontWeight={"500"}>
              You Don't Have any items in your cart right now. Please Add Some
              to checkout. <Link to={"/products"}>Shop Now</Link>
            </Typography>
          </Alert>
        ) : (
          <Grid container>
            <Grid item xs={12} md={7} lg={8} px={4}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" width={"25%"}>
                        Image
                      </TableCell>
                      <TableCell align="center" width={"20%"}>
                        Name
                      </TableCell>
                      <TableCell align="center" width={"20%"}>
                        Price
                      </TableCell>
                      <TableCell align="center" width={"15%"}>
                        Qty
                      </TableCell>
                      <TableCell align="center" width={"20%"}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart?.items?.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell align="left" width={"25%"}>
                          <img
                            src={item.image}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                          {item.productName}
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                          {item.price}
                        </TableCell>
                        <TableCell align="center" width={"15%"}>
                          {item.qty}
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                          <Typography
                            onClick={() => handleDelete(item.productId)}
                            variant="subtitle2"
                            sx={{
                              cursor: "pointer",
                              py: "5px",
                              ":hover": {
                                backgroundColor: "#e2e2e2",
                              },
                              transition: "all 0.3s ease-in-out",
                            }}
                          >
                            x Remove
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={5} lg={4} px={4}>
              <Box
                boxShadow={"1px 1px 15px 3px lightgray"}
                height={"100%"}
                px={2}
              >
                <Box p={"10px 12px "} borderBottom={"1px solid #e2e2e2"}>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "16px", fontWeight: "500", mb: "12px" }}
                  >
                    Item List :{" "}
                  </Typography>
                  {cart?.items?.map((item) => (
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      mb={"5px"}
                      key={item.productId}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: "14px", fontWeight: "400" }}
                      >
                        {item.productName} x {item.qty}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: "14px", fontWeight: "400" }}
                      >
                        Rs.{(item.price * item.qty).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box
                  p={"10px 12px "}
                  borderBottom={"1px solid #e2e2e2"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "16px", fontWeight: "500", my: "12px" }}
                  >
                    Subtotal :{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "14px", fontWeight: "400", my: "12px" }}
                  >
                    Rs. {totalAmount?.toLocaleString("en-IN")}
                  </Typography>
                </Box>

                <Box p={"10px 12px "} borderBottom={"1px solid #e2e2e2"}>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "16px", fontWeight: "500", mb: "12px" }}
                  >
                    Taxes :{" "}
                  </Typography>

                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    mb={"5px"}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "14px", fontWeight: "400" }}
                    >
                      GST (18%)
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: "14px", fontWeight: "400" }}
                    >
                      Rs. {gstPer}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  p={"10px 12px "}
                  borderBottom={"1px solid #e2e2e2"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "16px", fontWeight: "500", my: "12px" }}
                  >
                    Grand Total :{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "14px", fontWeight: "400", my: "12px" }}
                  >
                    Rs. {(totalAmount + gstPer).toLocaleString("en-IN")}
                  </Typography>
                </Box>
                <Button variant="contained" sx={{my : 3, borderRadius : 0, bgcolor : "#1B3F5E", ":hover" : {
                  bgcolor : "#234f75"
                }}} fullWidth>Check out</Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default Cart;
