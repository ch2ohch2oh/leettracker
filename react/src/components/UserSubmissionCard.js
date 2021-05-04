import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

import { DataGrid } from "@material-ui/data-grid";
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

export default function UserSubmissionCard({ subs, showUsername }) {
  const classes = useStyles();

  if (!subs) {
    return <Paper>Loading</Paper>;
  } else {
    // console.log("add ids:", subs);
    const len = subs.length || 0;
    for (let i = 0; i < len; i++) {
      subs[i].id = subs[i].timestamp;
      // Covert epoch to local datetime. Use setUTCSeconds to avoid overflow.
      let date = new Date(0);
      date.setUTCSeconds(parseInt(subs[i].timestamp));
      // Do not modify timestamp inplace. No idea why it does not work.
      subs[i]["time"] = date.toLocaleString();
    }

    const columns = [
      { field: "title", headerName: "Title", width: 500 },
      { field: "lang", headerName: "Language", width: 150 },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        renderCell: (param) => {
          if (param.value.toLowerCase() === "accepted") {
            return <Box color="success.main">{param.value}</Box>;
          } else {
            return <Box color="error.main">{param.value}</Box>;
          }
        },
      },
      { field: "time", headerName: "Time", width: 200 },
    ];
    if (showUsername) {
      columns.unshift({
        field: "username",
        headerName: "Username",
        width: 150,
        renderCell: (params) => (
          <Link className={classes.link} to={"/user/" + params.value}>
            {params.value}
          </Link>
        ),
      });
    }
    return (
      <Paper>
        <DataGrid rows={subs} columns={columns} pageSize={10} autoHeight />
      </Paper>
    );
  }
}
