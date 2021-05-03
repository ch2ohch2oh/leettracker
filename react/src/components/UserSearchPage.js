import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";

import UserSearchForm from "./UserSearchForm";
import SimpleAppBar from "./SimpleAppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default function UserSearchPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SimpleAppBar />
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          direction="column"
          justify="center"
          style={{ minHeight: "100vh", margin: "auto" }}
        >
          <Grid item>
            <Typography component="h1" variant="h2" align="center">
              Leetcode Tracker
            </Typography>
          </Grid>
          <Grid item>
            <UserSearchForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
