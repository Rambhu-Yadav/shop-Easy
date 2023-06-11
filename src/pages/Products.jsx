import React, { useContext, useDebugValue, useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { ProductContext } from "../App";
import ProductCard from "../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../utils/utils";
import {
  fetchAllProducts,
  filterProducts,
  setPriceRange,
  setSearchKeyword,
  setSelectedCategories,
} from "../slices/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    filteredProducts,
    searchKeyword,
    priceRange,
    selectedCategories,
  } = useSelector((state) => state.productState);
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [range, setRange] = useState([priceRange.min, priceRange.max]);

  useEffect(() => {
    dispatch(filterProducts())
  }, [searchKeyword, priceRange, selectedCategories]);

  const handleSearch = (e) => {
    dispatch(setSearchKeyword(e.target.value));
  };
  const handlePriceChange = (e, value) => {
    setRange(value);
    dispatch(setPriceRange({ min: value[0], max: value[1] }));
  };
  const handleCategoryChange = (e) => {
    let { value, checked } = e.target;
    console.log( value, checked);
    if (checked) {
      dispatch(setSelectedCategories([...selectedCategories, value]));
    } else {
      const updateCategories = selectedCategories.filter((c) => c !== value);
      dispatch(setSelectedCategories(updateCategories));
    }
  };

  const paginatedResult =
    products && paginate(filteredProducts, currentPage - 1, pageSize);

  return (
    <div>
      <Breadcrumb text={"Products"} />
      <Box
        sx={{
          paddingInline: {
            xs: "30px",
            md: "70px",
            lg: "110px",
          },
          marginTop: "30px",
        }}
      >
        <Grid container minHeight={"90vh"}>
          <Grid
            item
            // bgcolor={"red"}
            xs={0}
            md={3}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Box width={"100%"} borderBottom={"1px solid #e2e2e2"} pb={3}>
              <Typography
                variant="h3"
                sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
              >
                Search Products :{" "}
              </Typography>
              <TextField
                sx={{
                  "& div": {
                    borderRadius: 0,
                  },
                  "& input": {
                    padding: "12px 14px",
                  },
                }}
                placeholder="Enter Product Name..."
                fullWidth
                autoComplete="off"
                onChange={handleSearch}
                value={searchKeyword}
              />
            </Box>
            <Box width={"100%"} borderBottom={"1px solid #e2e2e2"} pb={3}>
              <Typography
                variant="h3"
                sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
              >
                Filter By Price :{" "}
              </Typography>
              <Slider
                size="small"
                value={range}
                onChange={handlePriceChange}
                max={10000}
                step={100}
                valueLabelDisplay="auto"
              />
            </Box>
            <Box width={"100%"}>
              <Typography
                variant="h3"
                sx={{ fontSize: "18px", fontWeight: "500", mb: "8px" }}
              >
                Filter By Category :{" "}
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                     value={"laptops"}
                      checked={selectedCategories.includes("laptops")}
                      onChange={handleCategoryChange}
                    />
                  }
                  label="Laptops"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="skincare"
                      checked={selectedCategories.includes("skincare")}
                      onChange={handleCategoryChange}
                    />
                  }
                  label="Skincare"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="groceries"
                      checked={selectedCategories.includes("groceries")}
                      onChange={handleCategoryChange}
                    />
                  }
                  label="Groceries"
                />
              </FormGroup>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            px={3}
            py={1}
            display={"flex"}
            flexWrap={"wrap"}
            gap={2}
            justifyContent={"center"}
          >
            {products &&
              paginatedResult.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

            {products && (
              <Box
                sx={{
                  paddingBlock: "30px",
                  height: "fit-content",
                }}
              >
                <Pagination
                  count={Math.ceil(filteredProducts.length / pageSize)}
                  color="primary"
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Products;
