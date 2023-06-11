import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ width:250, height : "280px", borderRadius : "0" }} elevation={1}>
      <CardMedia
        sx={{ height: 140, backgroundSize : "contain", backgroundPosition : 'center' }}
        image={product?.images[0]}
        title="green iguana"
        component={Link}
        to={`/products/${product.id}`}
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontSize: "20px", color: "black", fontWeight: "600" }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "18px", color: "black", fontWeight: "600" }}
        >
          Price : Rs. {product.price.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category : {product.category}
        </Typography>
      </CardContent>
    </Card>
  );
}
