import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Button, Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../slices/singleProductSlice";
import { addToCart } from "../slices/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userState);
  const { cart } = useSelector((state) => state.cartState);
  const [qty, setQty] = useState(1);
  const { singleProduct, loading, error } = useSelector(
    (state) => state.singleProductState
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        userId: user.id,
        product: {
          productId: singleProduct.id,
          productName: singleProduct.title,
          price: singleProduct.price,
          image: singleProduct.images[0],
          qty,
        },
      })
    );
  };

  // console.log(singleProduct);
  // console.log(user);
  return (
    <Box
      sx={{
        padding: {
          xs: "30px 20px",
          md: "50px 70px",
          lg: "50px 100px",
        },
      }}
    >
      <Grid container component={Paper} elevation={3} p={3}>
        <Grid item xs={12} sm={5} lg={6} height={"400px"} px={4}>
          <img
            src={singleProduct?.images[0]}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt=""
          />
        </Grid>
        <Grid item xs={12} sm={7} lg={6} height={"400px"} px={4} pt={3}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "35px",
              fontFamily: "'Jost', sans-serif",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            {singleProduct?.title}
          </Typography>
          <Rating
            value={singleProduct?.rating ? singleProduct.rating : 0}
            precision={0.2}
            readOnly
          />
          <Typography
            variant="body1"
            sx={{
              marginBlock: "15px",
              fontSize: "16px",
            }}
          >
            {" "}
            <span style={{ fontWeight: "bold" }}>Price</span> : Rs.
            {singleProduct?.price}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBlock: "15px",
              fontSize: "16px",
            }}
          >
            {" "}
            <span style={{ fontWeight: "bold" }}>Category</span> :
            {singleProduct?.category}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBlock: "15px",
              fontSize: "16px",
            }}
          >
            {" "}
            <span style={{ fontWeight: "bold" }}>Description</span> :
            {singleProduct?.description}
          </Typography>
          <Box display={"flex"} gap={"20px"}>
            <Button variant="contained" onClick={handleAddToCart}>
              Add to cart
            </Button>
            <Box
              display={"flex"}
              alignItems={"center"}
              border={"1px solid #e2e2e2"}
              width={"fit-content"}
            >
              <button
                onClick={() => {
                  if (qty > 1) {
                    setQty(qty - 1);
                  }
                }}
                style={{
                  width: "20px",
                  border: "none",
                  cursor :"pointer",
                  backgroundColor: "transparent",
                }}
              >
                -
              </button>
              <p style={{width : "40px", textAlign : "center"}}>{qty}</p>
              <button
                style={{
                  width: "20px",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor :"pointer"
                }}
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
