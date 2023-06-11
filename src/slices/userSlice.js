import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading : false,
    error : false
}


export const loginUser = createAsyncThunk("user/loginUser", async (formData) => {
    try {
        let res = await axios.get(
            "https://64491754b88a78a8f0fd2032.mockapi.io/Name"
          );
          if (res.status === 200) {
            let myUser = res.data.find((item) => item.email === formData.email);
            if (!myUser) {
              throw new Error("User not found")
            }
            if (!(myUser.password === formData.password)) {
                throw new Error("Invalid password");
            }

            return myUser
          }
    } catch (error) {
       throw new Error(error.response.data.message)
    }
})

export const registerUser = createAsyncThunk("user/registerUser", async (formData) => {
    try {
        let { data } = await axios.get(
            "https://64491754b88a78a8f0fd2032.mockapi.io/Name"
          );
  
          let existingUser = data.find((user) => user.email === formData.email);
  
          if (!existingUser) {
            let res = await axios.post(
              "https://64491754b88a78a8f0fd2032.mockapi.io/Name",
              {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                isAdmin: true,
              }
            );
              if(res.status === 201){
                let response = await axios.post("https://62750d9f6d3bc09e1069a664.mockapi.io/products", {
                    userId : res.data.id,
                    username : formData.username,
                    items : []
                })
                if(response.status === 201){
                    console.log("Cart Created Successfully")
                    return res.data
                }else{
                    throw new Error("Error while creating cart")
                }

              }else{
                throw new Error("Error while registering user")
              }

          } else {
            throw new Error("User Already Exists!");
          }
        
    } catch (error) {
        throw new Error(error.response.data.message)
    }
})


const userSlice = createSlice({
    name : "user",
    initialState ,
    reducers : {

    },
    extraReducers : {
        [loginUser.pending] : (state, action) => {
            state.loading = true;
        },
        [loginUser.fulfilled] : (state, action) => {
            state.loading = false;
            state.user = action.payload 
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        [loginUser.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [registerUser.pending] : (state, action) => {
            state.loading = true;
        },
        [registerUser.fulfilled] : (state, action) => {
            state.loading = false;
            state.user = action.payload 
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        [registerUser.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
    }
})

export default userSlice.reducer
