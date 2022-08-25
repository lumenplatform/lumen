import { useState } from "react";
import ReactDOM from "react-dom/client";
import * as React from 'react';
import { Box, Grid, Paper } from "@mui/material";
export  function Customization() {
  const [inputs, setInputs] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleChange = (event:any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values: any) => ({...values, [name]: value}))
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(inputs);
  }

  return (
    <Paper sx={{ p: 3, mb: 2 ,width:"500px"}}>
      
        
    <form onSubmit={handleSubmit}>
    <Box
          sx={{
            my: 2,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
          }}
          >
      <label><b>Organization Name</b>
       <Box marginTop={2}>
      <input 
        style={{width: "370px",height:"40px"}}
        type="text" 
        name="Organization Name" 
        value={inputs.Organization_Name || ""}
        onChange={handleChange}
      />
      </Box> 
      
      </label>
      
      <br></br>
      <label><b>Description</b>
        <Box marginTop={2} >
        <input 
         style={{width: "370px",height:"40px"}}
          type="text" 
          name="Description" 
          value={inputs.Desription || ""} 
          onChange={handleChange}
        />
        </Box>
        </label>
        <br></br>
        <label><b>Logo</b>
          <br></br>
          <input
          type="file"
          value={selectedFile}
          onChange={handleChange}
          />
        </label>
        </Box>
        <Grid container justifyContent={"right"}>
        <input type="submit" />
        </Grid>

    </form>
    </Paper>
  )
}

import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';

export default function FixedContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Customization></Customization>
      </Container>
    </React.Fragment>
  );
}



