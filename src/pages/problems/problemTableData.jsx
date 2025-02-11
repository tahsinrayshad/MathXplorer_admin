import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress, Typography, Button } from "@mui/material";
import ProblemTable from "./ProblemTable";
import axios from 'axios';  // Ensure axios is correctly imported

export default function ProblemRankings() {
  const [problems, setProblems] = useState({
    published: [],
    unpublished: [],
    pending: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleProblems, setVisibleProblems] = useState({
    published: 5,
    unpublished: 5,
    pending: 5,
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // Fetch problems from the different endpoints for each status
        const [pendingResponse, approvedResponse, publishedResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/problem/pending"),    // Pending Problems
          axios.get("http://127.0.0.1:8000/api/problem/approved"),   // Approved Problems
          axios.get("http://127.0.0.1:8000/api/problem/all/"),       // Published Problems
        ]);

        // Set the problems in the respective states
        setProblems({
          pending: pendingResponse.data.problems || [],
          unpublished: approvedResponse.data.problems || [],
          published: publishedResponse.data.problems || [],
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

  // Handle 'See All' button click to show all problems for a given status
  const handleSeeAllClick = (category) => {
    setVisibleProblems((prev) => ({
      ...prev,
      [category]: problems[category].length, // Set to the total length of the category
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
            problems={problems.pending.slice(0, visibleProblems.pending)}
            headerColor="#f44336"
          />
          {problems.pending.length > visibleProblems.pending && (
            <Button onClick={() => handleSeeAllClick("pending")}>See All</Button>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <ProblemTable
            title="Approved Problems"
            problems={problems.unpublished.slice(0, visibleProblems.unpublished)}
            headerColor="#ff9800"
          />
          {problems.unpublished.length > visibleProblems.unpublished && (
            <Button onClick={() => handleSeeAllClick("unpublished")}>See All</Button>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <ProblemTable
            title="Published Problems"
            problems={problems.published.slice(0, visibleProblems.published)}
            headerColor="#4caf50"
          />
          {problems.published.length > visibleProblems.published && (
            <Button onClick={() => handleSeeAllClick("published")}>See All</Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
