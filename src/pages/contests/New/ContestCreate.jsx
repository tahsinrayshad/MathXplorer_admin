import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Collapse,
  IconButton,
  Chip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // For rendering Markdown
import rehypeKatex from "rehype-katex"; // LaTeX support
import remarkMath from "remark-math"; // Markdown math support
import "katex/dist/katex.min.css"; // Required CSS for LaTeX rendering

export default function CreateContest() {
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const [problems, setProblems] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [problemDialogOpen, setProblemDialogOpen] = useState(false);
  const [addedProblems, setAddedProblems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  


  const handleCreateContest = () => {
    if (problems.length > 0 && formData.title && formData.startTime && formData.endTime && formData.description) {
      const contestPayload = {
        title: formData.title,
        description: formData.description,
        start_time: formData.startTime,
        end_time: formData.endTime,
      };

      setLoading(true);
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        console.error("No token found");
        return;
      }

      axios
        .post("http://127.0.0.1:8000/api/contest/create/", contestPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response.data);

          if (response.data.message === "Contest created successfully") {
            alert("Contest created successfully!");
          } else {
            alert("Failed to create contest.");
          }
        })
        .catch((error) => {
          console.error("Error creating contest:", error);
          alert("An error occurred while creating the contest.");
        })
        .finally(() => setLoading(false));
    } else {
      alert("Please make sure all required fields are filled and problems are selected.");
    }
  };


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        align="center"
        gutterBottom
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          fontSize: "2.25rem",
        }}
      >
        Create Contest
      </Typography>

      <Box component="form" sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Title</Typography>
          <TextField
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>Start Time</Typography>
          <TextField
            fullWidth
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography sx={{ width: "120px" }}>End Time</Typography>
          <TextField
            fullWidth
            name="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Typography sx={{ width: "120px" }}>Description</Typography>
          <TextField
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleCreateContest}
              sx={{
                color: "white",
                width: "200px",
                backgroundColor: "#1E90FF",
                "&:hover": {
                  backgroundColor: "#1565C0",
                  color: "white",
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
