import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress, Typography } from "@mui/material";
import ProblemTable from "./ProblemTable";
import axios from "axios"; // Ensure axios is correctly imported

export default function ProblemRankings() {
  const [problems, setProblems] = useState({
    pending: [],
    approved: [],
    published: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTables, setExpandedTables] = useState({
    pending: false,
    approved: false,
    published: false,
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // Fetch problems from the different endpoints
        const [pendingResponse, approvedResponse, publishedResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/problem/pending"),
          axios.get("http://127.0.0.1:8000/api/problem/approved"),
          axios.get("http://127.0.0.1:8000/api/problem/all/"),
        ]);

        setProblems({
          pending: pendingResponse.data.problems,
          approved: approvedResponse.data.problems,
          published: publishedResponse.data.problems,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching problems:", err);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleToggleExpand = (table) => {
    setExpandedTables((prev) => ({
      ...prev,
      [table]: !prev[table], // Toggle expansion for only the clicked table
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Problems...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProblemTable
            title="Pending Problems"
            problems={problems.pending}
            headerColor="#f44336"
            onToggleExpand={() => handleToggleExpand("pending")}
            isExpanded={expandedTables.pending}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProblemTable
            title="Approved Problems"
            problems={problems.approved}
            headerColor="#ff9800"
            onToggleExpand={() => handleToggleExpand("approved")}
            isExpanded={expandedTables.approved}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProblemTable
            title="Published Problems"
            problems={problems.published}
            headerColor="#4caf50"
            onToggleExpand={() => handleToggleExpand("published")}
            isExpanded={expandedTables.published}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
