// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Chip,
//   TextField, Container
// } from "@mui/material";
// import axios from "axios";

// export default function ContestDetails() {
//   const { id } = useParams();
//   const [contest, setContest] = useState(null);
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContestDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("Authorization token missing.");
//           setLoading(false);
//           return;
//         }

//         // Fetch contest details
//         const contestResponse = await axios.get(`http://127.0.0.1:8000/api/contest/single/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (contestResponse.data.contest.length > 0) {
//           setContest(contestResponse.data.contest[0]);
//         } else {
//           setError("Contest not found.");
//         }

//         // Fetch contest problems
//         const problemsResponse = await axios.get(`http://127.0.0.1:8000/api/admin/contest/problem/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (problemsResponse.data.problems) {
//           setProblems(problemsResponse.data.problems);
//         }
//       } catch (err) {
//         setError("Failed to fetch contest details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContestDetails();
//   }, [id]);

//   const formatLocalTime = (utcTime) => {
//     if (!utcTime) return "N/A";
//     const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//     const utcDate = new Date(utcTime + " UTC");
//     return new Intl.DateTimeFormat(undefined, {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//       timeZone: userTimezone,
//     }).format(utcDate);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", mt: 4 }}>
//         <Typography variant="h5" sx={{ color: "red" }}>
//           {error}
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography align="center" sx={{ fontSize: "2rem", fontWeight: 600, mb: 3 }}>
//         Contest Details
//       </Typography>

//       <Paper sx={{ padding: 3, mb: 3 }}>
//         <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//           Contest Information
//         </Typography>

//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//           <TextField label="Title" value={contest?.title || ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
//           <TextField label="Start Time" value={formatLocalTime(contest?.start_time)} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
//           <TextField label="End Time" value={formatLocalTime(contest?.end_time)} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
//           <TextField
//             label="Description"
//             value={contest?.description || "No description available."}
//             fullWidth
//             variant="outlined"
//             multiline
//             rows={4}
//             InputProps={{ readOnly: true }}
//           />
//         </Box>
//       </Paper>

//       <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//         Problem Set
//       </Typography>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#1E90FF" }}>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>Problem Title</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>XP</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>Points</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tags</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {problems.length > 0 ? (
//               problems.map((problem, index) => (
//                 <TableRow key={problem.id} sx={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
//                   <TableCell>{problem.single_problem.id}</TableCell>
//                   <TableCell>{problem.single_problem.title}</TableCell>
//                   <TableCell>{problem.single_problem.xp}</TableCell>
//                   <TableCell>{problem.points}</TableCell>
//                   <TableCell>
//                     {problem.single_problem.tags?.topics?.map((tag, idx) => (
//                       <Chip key={idx} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
//                     )) || "No tags"}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   <Typography variant="h6" sx={{ color: "red", padding: "20px" }}>
//                     No problems selected.
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// }





import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  TextField, Container,
  Button, // Import Button
} from "@mui/material";
import axios from "axios";

export default function ContestDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authorization token missing.");
          setLoading(false);
          return;
        }

        // Fetch contest details
        const contestResponse = await axios.get(`http://127.0.0.1:8000/api/contest/single/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (contestResponse.data.contest.length > 0) {
          setContest(contestResponse.data.contest[0]);
        } else {
          setError("Contest not found.");
        }

        // Fetch contest problems
        const problemsResponse = await axios.get(`http://127.0.0.1:8000/api/admin/contest/problem/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (problemsResponse.data.problems) {
          setProblems(problemsResponse.data.problems);
        }
      } catch (err) {
        setError("Failed to fetch contest details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContestDetails();
  }, [id]);

  const formatLocalTime = (utcTime) => {
    if (!utcTime) return "N/A";
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = new Date(utcTime + " UTC");
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: userTimezone,
    }).format(utcDate);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" sx={{ color: "red" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography align="center" sx={{ fontSize: "2rem", fontWeight: 600, mb: 3 }}>
        Contest Details
      </Typography>

      <Paper sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Contest Information
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Title" value={contest?.title || ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
          <TextField label="Start Time" value={formatLocalTime(contest?.start_time)} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
          <TextField label="End Time" value={formatLocalTime(contest?.end_time)} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
          <TextField
            label="Description"
            value={contest?.description || "No description available."}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            InputProps={{ readOnly: true }}
          />
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Problem Set
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1E90FF" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Problem Title</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>XP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Points</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.length > 0 ? (
              problems.map((problem, index) => (
                <TableRow key={problem.id} sx={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
                  <TableCell>{problem.single_problem.id}</TableCell>
                  <TableCell>{problem.single_problem.title}</TableCell>
                  <TableCell>{problem.single_problem.xp}</TableCell>
                  <TableCell>{problem.points}</TableCell>
                  <TableCell>
                    {problem.single_problem.tags?.topics?.map((tag, idx) => (
                      <Chip key={idx} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    )) || "No tags"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6" sx={{ color: "red", padding: "20px" }}>
                    No problems selected.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/contests/edit/${id}`)}
          sx={{
            fontSize: "12px",
            fontWeight: "bold",
            padding: "10px 40px",
            backgroundColor: "#1E90FF",
            "&:hover": {
              backgroundColor: "#1565C0",
            },
          }}
        >
          Edit
        </Button>
      </Box>
    </Container>
  );
}
