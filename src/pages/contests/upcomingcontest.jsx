import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios"; // Ensure correct import for axios

const ContestData = () => {
  const [contests, setContests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Access token is missing.");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/contest/all/upcoming", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setContests(response.data.contests);
      } catch (error) {
        console.error("Error fetching contests:", error.response ? error.response.data : error);
      }
    };
    fetchContests();
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to get user's local timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const formatLocalTime = (utcTime) => {
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

  // Function to sort data
  const sortedContests = [...contests].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
    return 0;
  });

  const TableHeader = ({ label, property }) => (
    <TableCell
      sx={{
        backgroundColor: "white",
        color: "#1565C0",
        fontWeight: "bold",
      }}
    >
      <TableSortLabel
        active={orderBy === property}
        direction={orderBy === property ? order : "asc"}
        onClick={() => handleRequestSort(property)}
        sx={{
          "& .MuiTableSortLabel-icon": {
            color: "#1565C0 !important",
          },
          color: "#1565C0 !important",
        }}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ fontSize: "24px", fontWeight: 600 }}>
          Upcoming Contests
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          Your Timezone: {userTimezone}
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              <TableHeader label="ID" property="id" />
              <TableHeader label="Title" property="title" />
              <TableHeader label="Start Time" property="start_time" />
              <TableHeader label="End Time" property="end_time" />
              <TableHeader label="Participants Count" property="participants_count" />
              <TableHeader label="Problems Count" property="problems_count" />
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedContests.length > 0 ? (
              sortedContests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contest, index) => (
                  <TableRow
                    hover
                    key={contest.id}
                    onClick={() => navigate(`/contests/single/${contest.id}`)} // Navigate on row click
                    sx={{
                      cursor: "pointer",
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff", // Alternate row colors
                      "&:hover": {
                        backgroundColor: "#f1f1f1",
                      },
                    }}
                  >
                    <TableCell>{contest.id}</TableCell>
                    <TableCell>{contest.title}</TableCell>
                    <TableCell>{formatLocalTime(contest.start_time)}</TableCell>
                    <TableCell>{formatLocalTime(contest.end_time)}</TableCell>
                    <TableCell>{contest.participants_count}</TableCell>
                    <TableCell>{contest.problems_count}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="h6" sx={{ padding: "20px", color: "#1565C0" }}>
                    No Upcoming Contest
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={contests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "#ffffff",
          color: "#1565C0",
          "& .MuiTablePagination-actions": {
            color: "#1565C0",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "#1565C0",
          },
          "& .MuiTablePagination-select": {
            color: "#1565C0",
          },
          "& .MuiTablePagination-selectIcon": {
            color: "#1565C0",
          },
        }}
      />
    </Paper>
  );
};

export default ContestData;
