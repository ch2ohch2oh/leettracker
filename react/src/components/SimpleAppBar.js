import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  space: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function SimpleAppBar() {
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography component="h1" variant="h6">
            Leetcode Tracker
          </Typography>
        </Link>
        <Typography
          component="h1"
          variant="h6"
          className={classes.space}
        ></Typography>
        <Link to="/explore" className={classes.link}>
          <Button color="inherit">Explore</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
