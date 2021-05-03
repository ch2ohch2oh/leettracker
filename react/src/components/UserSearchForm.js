import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import CasinoIcon from "@material-ui/icons/Casino";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import { getRandomUser } from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // direction: "row",
    justify: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "100%",
    justify: "center",
    alignItems: "center",
    margin: "10px",
  },
}));

// When the user clicks on the search icon, check if
// the username exists. If so, go to user submission detail page.
// If not, show some error.

export default function UserSearchForm() {
  const [_username, _setUsername] = useState("");
  const [isValid, setIsValid] = useState(true);
  const history = useHistory();
  const usernameRef = useRef(_username);

  const setUsername = (uname) => {
    usernameRef.current = uname;
    _setUsername(uname);
  };

  const getUsername = () => {
    return usernameRef.current;
  };

  useEffect(() => {
    console.log("useEffect: username is", _username);
  });

  const classes = useStyles();

  // When user clicked on search or typed in enter,
  // check if the username exist and redirect if so.
  // Otherwise give an error.
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const username = getUsername();
    return fetch("/api/v1/user/" + username + "/info")
      .then((res) => {
        if (res.ok) {
          const data = res.json();
          console.log("Redirect to", username);
          history.push("/user/" + username);
        } else {
          console.log("Did not found", username);
          setIsValid(false);
        }
      })
      .catch(console.log);
  };

  // When user clicks on "Feeling Lucky", get a random user
  // to fill the search box then redirect.
  const handleRandom = async () => {
    await getRandomUser()
      .then((name) => {
        setUsername(name);
        console.log(
          `username after calling setUsername(${name}) is`,
          getUsername()
        );

        setTimeout(() => {
          // console.log("random user is", username);
          handleSubmit();
        }, 1000);
        //   handleSubmit();
      })
      .catch((e) => {
        console.log("Failed to get random user:", e);
      });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={12}>
          <TextField
            error={!isValid}
            id="standard-basic"
            label="Leetcode username"
            value={_username}
            style={{ width: "100%" }}
            onChange={(e) => {
              setIsValid(true);
              setUsername(e.target.value);
              console.log("TextField onCHange: username", getUsername());
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            className={classes.button}
            startIcon={<SearchIcon />}
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            className={classes.button}
            startIcon={<CasinoIcon />}
            onClick={handleRandom}
          >
            Feeling lucky
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
