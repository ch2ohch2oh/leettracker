import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import SimpleAppBar from "./SimpleAppBar";
import UserSubmissionCard from "./UserSubmissionCard";
import { getRecentSubmissions } from "../api";

export default function ExplorePage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getRecentSubmissions()
      .then((data) => setSubmissions(data))
      .catch(console.log);
  }, []);

  return (
    <Box my={15}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <UserSubmissionCard
            subs={submissions.submissions}
            showUsername={true}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
