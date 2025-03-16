import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProblem() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xp, setXp] = useState("");
  const [answer, setAnswer] = useState("");
  const [note, setNote] = useState("");
  const [topics, setTopics] = useState("");
  const [target, setTarget] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProblem = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://127.0.0.1:8000/api/admin/problem/single/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const problem = response.data.problem;
          setTitle(problem.title);
          setDescription(problem.description);
          setXp(problem.xp.toString());
          setAnswer(problem.answer);
          setNote(problem.note);
          setTarget(problem.tags.target);
          setTopics(problem.tags.topics.join(", "));
        } catch (error) {
          console.error("Error fetching problem:", error);
          alert("Failed to load problem data");
        }
      };
      fetchProblem();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedTopics = topics.split(",").map((topic) => topic.trim()).join(", ");

    const requestBody = {
      ...(id && { id: parseInt(id, 10) }), // Include ID only in edit mode
      title: title,
      description: description,
      xp: parseInt(xp, 10),
      answer: answer,
      note: note,
      topics: formattedTopics,
      target: target,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Access token is missing");
        return;
      }

      const url = id 
        ? "http://127.0.0.1:8000/api/admin/problem/edit"
        : "http://127.0.0.1:8000/api/admin/problem/create";

      const method = "post";

      const response = await axios[method](url, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert(`Success: ${response.data.message}`);
        navigate(`/problems/single/${id}`);
      }
    } catch (error) {
      console.error("Error submitting the problem:", error);
      if (error.response) {
        console.error("Response from server:", error.response.data);
        alert(
          `Error: ${error.response.data.message || "Failed to submit the problem. Please try again."}`
        );
      } else {
        alert("Failed to submit the problem. Please try again.");
      }
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h3" component="h1" sx={{ mb: 4, color: "primary.main" }}>
        {id ? "Edit Problem" : "Add New Problem"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Problem Details
          </Typography>

          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            helperText="Use $ ... $ for inline equations or $$ ... $$ for centered equations"
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="XP"
            variant="outlined"
            value={xp}
            onChange={(e) => setXp(e.target.value)}
            type="number"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Answer"
            variant="outlined"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Note"
            variant="outlined"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Target</InputLabel>
            <Select
              label="Target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            >
              <MenuItem value="v0">v0</MenuItem>
              <MenuItem value="v1">v1</MenuItem>
              <MenuItem value="v2">v2</MenuItem>
              <MenuItem value="v3">v3</MenuItem>
              <MenuItem value="v4">v4</MenuItem>
              <MenuItem value="v5">v5</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Topics (comma-separated)"
            variant="outlined"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            sx={{ mb: 3 }}
          />
        </Paper>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 4, mb: 4 }}>
          {id ? "Update Problem" : "Submit Problem"}
        </Button>
      </form>

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Preview
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {title || "Your Problem Title Here"}
        </Typography>
        <ReactMarkdown
          children={description || "Your description will be displayed here in Markdown format..."}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Answer
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {answer || "Answer goes here..."}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Notes
        </Typography>
        <ReactMarkdown
          children={note || "Your notes will be displayed here in Markdown format..."}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </Paper>
    </Box>
  );
}