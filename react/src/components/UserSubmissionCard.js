import React from "react";
import Paper from "@material-ui/core/Paper";

import { DataGrid } from "@material-ui/data-grid";

export default function UserSubmissionCard({ subs, showUsername }) {
  if (!subs) {
    return <Paper>Loading</Paper>;
  } else {
    // console.log("add ids:", subs);
    const len = subs.length || 0;
    for (let i = 0; i < len; i++) {
      subs[i].id = i;
      // Covert epoch to local datetime. Use setUTCSeconds to avoid overflow.
      let date = new Date(0);
      date.setUTCSeconds(parseInt(subs[i].timestamp));
      // Do not modify timestamp inplace. No idea why it does not work.
      subs[i]["time"] = date.toLocaleString();
    }

    const columns = [
      { field: "title", headerName: "Title", width: 500 },
      { field: "lang", headerName: "Language", width: 150 },
      { field: "status", headerName: "Status", width: 200 },
      { field: "time", headerName: "Time", width: 200 },
    ];
    if (showUsername) {
      columns.unshift({
        field: "username",
        headerName: "Username",
        width: 150,
      });
    }
    return (
      <Paper>
        <DataGrid rows={subs} columns={columns} pageSize={10} autoHeight />
      </Paper>
    );
  }
}
