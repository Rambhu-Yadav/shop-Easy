import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { Paper } from "@mui/material";
import bannerImg from "../../assets/banner_img.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <Grid
      container
      sx={{ minHeight: "400px", paddingInline: "70px" }}
      borderBottom={"1px solid #e2e2e2"}
    >
      <Grid
        item
        xs={12}
        lg={6}
        p={5}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: "800",
            color: "#1B3F5E",
          }}
        >
          Shopsy
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: "500",
            color: "black",
            fontSize: "16px",
            mt: 2,
            pr: "140px",
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos
          commodi pariatur eaque quam praesentium atque amet illum aliquid,
          aspernatur recusandae vel non beatae nesciunt, voluptates odio qui
          sint corporis deserunt!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            width: "fit-content",
            bgcolor: "#1B3F5E",
            ":hover": {
              bgcolor: "#124D75",
            },
            borderRadius: "0",
            padding: "15px 30px",
          }}
          size="large"
        >
          <Link style={{color : "inherit", textDecoration : "none"}} to={"/products"}>Shop Now</Link>
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        p={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img
          style={{ width: "440px" }}
          src={bannerImg}
          alt="Ecommerce Banner"
        />
      </Grid>
    </Grid>
  );
};

export default Banner;
