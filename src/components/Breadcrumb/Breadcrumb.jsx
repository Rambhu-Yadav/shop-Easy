import { Box } from '@mui/material'
import React from 'react'
import bgImage from '../../assets/breadcrumb.jpg'

const Breadcrumb = ({text}) => {
  return (
    <Box  height={"350px"} sx={{
        backgroundImage : `url(${bgImage})`,
        backgroundSize : "cover",
        backgroundPosition : "center"
    }} >
        <Box height={"100%"} width={"100%"} bgcolor={"rgba(0,00,0,0.6)"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <h1 style={{
            fontSize : "80px",
            color : "white"
        }}>{text}</h1>
        </Box>
    </Box>
  )
}

export default Breadcrumb