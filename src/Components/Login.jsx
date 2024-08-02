import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Grid } from "@mui/material";
import { Nav } from "./Nav";
// import { Products } from "./Products";

import { Fetching } from "./Fetching";

export const Login = () => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Nav />
          </Grid>
          <Grid item xs={12}>
            <Fetching />
          </Grid>
          {/* <Grid item xs={6} style={{ border: "1px solid blue" }}>
            <Bill />
          </Grid> */}
        </Grid>
      </CardContent>
    </Card>
  );
};
