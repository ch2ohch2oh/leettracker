import React from "react";

import { Typography, CircularProgress } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function LoadingMessage({ msg }) {
  const classes = useStyles();
  //   let loadingMsg = <Typography>{msg}</Typography>;

  return (
    <div className={classes.root}>
      <CircularProgress />
      {msg ? <Typography>{msg}</Typography> : null}
    </div>
  );
}
