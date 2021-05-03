import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SchoolIcon from "@material-ui/icons/School";
import LanguageIcon from "@material-ui/icons/Language";
import NoteIcon from "@material-ui/icons/Note";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

function generate_item(value, icon) {
  if (value) {
    return (
      <ListItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={value} />
      </ListItem>
    );
  }
}

export default function UserProfileCard({ username, profile }) {
  const classes = useStyles();
  console.log("user profile:", profile);
  if (profile) {
    return (
      <Paper>
        <Typography className={classes.root} variant="h4">
          {username}
        </Typography>
        <List>
          {generate_item(profile.aboutMe, <NoteIcon />)}
          {generate_item(profile.countryName, <LanguageIcon />)}
          {generate_item(profile.school, <SchoolIcon />)}
          {generate_item(profile.ranking, <ShowChartIcon />)}
        </List>
      </Paper>
    );
  } else {
    return (
      <Paper>
        <Typography className={classes.root} variant="h4">
          {username}
        </Typography>
      </Paper>
    );
  }
}
