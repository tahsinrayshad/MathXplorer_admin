import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for math rendering
import axios from "axios";
import { useParams } from "react-router-dom";

const ProblemView = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch the problem when the component mounts
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const token = localStorage.getItem('token');  // Get the access token from localStorage
        if (!token) {
          console.error('Access token is missing');
          return;
        }
  
        const response = await axios.get(`http://127.0.0.1:8000/api/admin/problem/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the headers
          },
        });
  
        setProblem(response.data.problem);
      } catch (error) {
        console.error("Error fetching the problem:", error);
        // Optionally show a user-friendly message here
        setProblem(null);
      }
    };
  
    fetchProblem();
  }, [id]);
  

  const handleApprove = async () => {
    try {
      const token = localStorage.getItem('token');  // Get the access token from localStorage
      if (!token) {
        console.error('Access token is missing');
        return;
      }
  
      // Send the POST request with the problem ID in the body as JSON
      const response = await axios.post(
        'http://127.0.0.1:8000/api/admin/problem/approve/',  // The correct endpoint to approve the problem
        { problem_id: problem.id }, // Send the problem ID in the request body as JSON
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
  
      console.log("Problem approved!");
      setProblem((prevState) => ({
        ...prevState,
        status: "Approved", // Update status to "Approved" after approval
      }));
    } catch (error) {
      console.error("Error approving the problem:", error);
    }
  };
  
  

  // Handle submitting the answer
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted answer:", answer);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sent message:", message);
      setMessage("");
    }
  };

  if (!problem) return <Typography>Loading...</Typography>;

  const statistics = [
    { label: "XP", value: problem.xp },
    { label: "Target", value: problem.tags.target },
    { label: "Status", value: problem.status }, // Add status to the statistics
  ];

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Main content */}
      <Box sx={{ display: "flex", gap: 3, marginTop: "100px", marginBottom: "60px" }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {problem.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <Box component="span" sx={{ display: "inline-flex", gap: 1, ml: 1 }}>
                {problem.tags.topics.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      cursor: "pointer",
                      borderRadius: "16px", // Fully rounded
                      fontSize: "14px",
                      color: "white", // White text
                      backgroundColor: "#007FFF", // Blue background
                    }}
                  />
                ))}
              </Box>
            </Typography>

            {/* Problem statement */}
            <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
              Problem Statement
            </Typography>
            <ReactMarkdown
              children={problem.description}
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            />
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Statistics
            </Typography>
            <Table>
              <TableBody>
                {statistics.map((stat) => (
                  <TableRow key={stat.label}>
                    <TableCell component="th" scope="row">
                      {stat.label}
                    </TableCell>
                    <TableCell align="right">{stat.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      {/* Notes Section */}
      {/* <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Notes
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {problem.note}
          </Typography>
        </CardContent>
      </Card> */}

      {/* Notes Section */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Notes
          </Typography>
          <ReactMarkdown
            children={problem.note}
            remarkPlugins={[remarkMath]}  // Use remarkMath for LaTeX syntax
            rehypePlugins={[rehypeKatex]}  // Use rehypeKatex for rendering with KaTeX
          />
        </CardContent>
      </Card>


      {/* Only show the "Approve" button if the status is "Pending" */}
          {problem.status === "pending" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleApprove}
              sx={{ mt: 2 }}
            >
              Approve
            </Button>
          )}
    </Box>
  );
};

export default ProblemView;








