import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Card, CardContent, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import UserProfileCard from "./UserProfileCard";
import UserSubmissionCard from "./UserSubmissionCard";
import SimpleAppBar from "./SimpleAppBar";

import { getUserInfo } from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function UserProfilePage() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const classes = useStyles();

  console.log("User profile page for", username);

  useEffect(() => {
    getUserInfo(username)
      .then((data) => setUserInfo(data))
      .catch(console.log);
  }, []);

  return (
    <Box my={15}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <UserProfileCard username={username} profile={userInfo.profile} />
        </Grid>
        <Grid item>
          <UserSubmissionCard subs={userInfo.submissions} />
        </Grid>
      </Grid>
    </Box>
  );
}
