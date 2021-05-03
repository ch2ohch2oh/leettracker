import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function SimpleAppBar() {
  return (
    <AppBar position="fixed" color="">
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography component="h1" variant="h6">
            Leetcode Tracker
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
