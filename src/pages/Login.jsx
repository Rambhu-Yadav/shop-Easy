import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { LockOutlinedIcon } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/userSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user , loading, error : userError} = useSelector(state => state.userState)
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
      if(!loading && userError){
        setError("error")
      }else if(!loading && !userError && user ){
        navigate("/")
      }
  }, [loading, user, userError])

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };




  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passRegEx = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}/;

    if (!emailRegEx.test(formData.email)) {
      setError("Please Enter a valid Email");
      return;
    } else if (!passRegEx.test(formData.password)) {
      setError("Please Enter a valid Password");
      return;
    } else {
      dispatch(loginUser(formData));
      setFormData(initialState);
      setError(null);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: {
          xs: "100%",
          md: "500px",
        },
        bgcolor: "white",
        marginInline: {
          xs: "0",
          md: "auto",
        },
        mt: 5,
        padding: "30px",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"22px"}
        component={"form"}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Box textAlign={"center"}>
          <Avatar sx={{ m: 1, mx: "auto", bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <TextField
          type="email"
          label="Email"
          fullWidth
          name={"email"}
          value={formData.email}
        />
        <Box position={"relative"}>
          <TextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={formData.password}
          />
          {showPassword ? (
            <VisibilityOffIcon
              onClick={() => setShowPassword(!showPassword)}
              sx={{
                position: "absolute",
                right: "10px",
                top: "15px",
                cursor: "pointer",
              }}
            />
          ) : (
            <VisibilityIcon
              onClick={() => setShowPassword(!showPassword)}
              sx={{
                position: "absolute",
                right: "10px",
                top: "15px",
                cursor: "pointer",
              }}
            />
          )}
        </Box>
        <Box textAlign={"center"}>
          <Button
            sx={{ bgcolor: "#1B3F5E" }}
            size="large"
            fullWidth
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </Box>
        <Typography
          variant="body2"
          textAlign={"right"}
          fontSize={"17px"}
          color="#1B3F5E"
        >
          Don't Have an Account?{" "}
          <Link style={{ color: "inherit" }} to="/register">
            Sign Up Here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
