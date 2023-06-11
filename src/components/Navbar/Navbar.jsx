import React, { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { UserContext } from "../../App";
import { useSelector } from "react-redux";
import { ShoppingCart } from "@mui/icons-material";

const Navbar = () => {
  const { user } = useSelector((state) => state.userState);
  const { totalQty } = useSelector((state) => state.cartState);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#1B3F5E" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to={"/"}
            sx={{
              flexGrow: 1,
              fontSize: "30px",
              fontWeight: "800",
              letterSpacing: "1.5px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Shopsy
          </Typography>
          <Box display={"flex"} gap={1} alignItems={"center"}>
            {user && (
              <Box
                component={Link}
                to={"/cart"}
                width={"40px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Badge badgeContent={totalQty ? totalQty : 0} color="primary">
                  <ShoppingCart sx={{ color: "white" }} />
                </Badge>
              </Box>
            )}

            <Button color="inherit">
              {user ? (
                <>
                  <p
                    style={{ color: "inherit", textDecoration: "none" }}
                    onClick={() => {
                      setUser(null);
                      localStorage.removeItem("user");
                    }}
                  >
                    Logout
                  </p>
                </>
              ) : (
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={"/login"}
                >
                  Login
                </Link>
              )}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
