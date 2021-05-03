import React from "react";
import Paper from "@material-ui/core/Paper";

import { DataGrid } from "@material-ui/data-grid";

export default function UserSubmissionCard({ subs, showUsername }) {
  if (!subs) {
    return <Paper>Loading</Paper>;
  } else {
    console.log("add ids:", subs);
    const len = subs.length || 0;
    for (let i = 0; i < len; i++) {
      subs[i].id = subs[i].timestamp;
      // Covert epoch to local datetime
      console.log(subs[i].timestamp);
      subs[i].timestamp = new Date(parseInt(subs[i].timestamp) * 1000);
    }

    const columns = [
      { field: "title", headerName: "Title", width: 500 },
      { field: "lang", headerName: "Language", width: 150 },
      { field: "status", headerName: "Status", width: 200 },
      { field: "timestamp", headerName: "Time", width: 200, type: "dateTime" },
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
        {console.log(subs)}
        <DataGrid rows={subs} columns={columns} pageSize={10} autoHeight />
      </Paper>
    );
  }
}
