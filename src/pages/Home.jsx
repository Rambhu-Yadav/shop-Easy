import React, {useContext} from "react";
import Banner from "../components/Banner/Banner";
import { Typography } from "@mui/material";
import ProductCard from "../components/ProductCard/ProductCard";
import { ProductContext } from "../App";
import { useSelector } from "react-redux";

const Home = () => {
  const {products} = useSelector(state => state.productState)

  return (
    <div>
      <Banner />
      <div style={{
        paddingBottom : "80px"
      }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "38px",
            fontWeight: "700",
            textAlign: "center",
            my: 4,
            color: "#1B3F5E",
          }}
          color={"primary.main"}
        >
          Featured Products
        </Typography>
        <div style={{
          display : "flex",
          flexWrap : "wrap",
          justifyContent :"center",
          gap : "30px"
        }}>
          {
            products && products.filter(product => product.rating > 4.7).map((product) =>(
              <ProductCard key={product.id} product={product}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
