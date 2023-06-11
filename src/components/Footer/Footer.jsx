import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box minHeight={"230px" } bgcolor={"#1B3F5E"} sx={{
        px : {
            xs : "20px",
            md : "35px",
            lg : "80px"
        },
        py : "30px",
    }}>
        <Grid container>
            <Grid item xs={12} md={4} px={3}>
                <Typography variant='h2' sx={{
                    fontSize : "35px",
                    fontWeight : "bold",
                    fontFamily : "'Jost', sans-serif",
                    color : "white",
                    marginBottom : "20px"
                }}>
                    Shopsy
                </Typography>
                <Typography variant='body2' sx={{
                    fontSize : "15px",
                    fontWeight : "400",
                    fontFamily : "'Jost', sans-serif",
                    color : "white"
                }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos commodi pariatur eaque quam praesentium atque amet illum aliquid, aspernatur recusandae vel non beatae nesciunt, voluptates odio qui sint corporis deserunt!
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
            <Typography variant='h2' sx={{
                    fontSize : "16px",
                    fontWeight : "bold",
                    fontFamily : "'Jost', sans-serif",
                    color : "white",
                    marginBottom : "20px",
                    textAlign : "center"
                }}>
                    Quick Links
                </Typography>
                <ul style={{listStyle : "none", textAlign :"center", color : "white", display : "flex", flexDirection : "column", gap : "20px"}}>
                    <li>Home</li>
                    <li>Products</li>
                    <li>Cart</li>
                    <li>Contact</li>
                </ul>
            </Grid>
            <Grid item xs={12} md={4}>
            <Typography variant='h2' sx={{
                    fontSize : "16px",
                    fontWeight : "bold",
                    fontFamily : "'Jost', sans-serif",
                    color : "white",
                    marginBottom : "20px",
                    textAlign : "right"
                }}>
                   Contact Info:
                </Typography>
            <Typography variant='body2' sx={{
                    fontSize : "14px",
                    fontWeight : "400",
                    fontFamily : "'Jost', sans-serif",
                    color : "white",
                    marginBottom : "20px",
                    textAlign : "right"
                }}>
                   Street No : 1, St. Columbus,<br/>
                   New York,<br/>
                   United States
                </Typography>
            <Typography variant='body2' sx={{
                    fontSize : "14px",
                    fontWeight : "400",
                    fontFamily : "'Jost', sans-serif",
                    color : "white",
                    marginBottom : "20px",
                    textAlign : "right"
                }}>
                  Phone : 9457-4545-45
                </Typography>
            </Grid>

        </Grid>
    </Box>
  )
}

export default Footer