import React, { useState } from "react";
import { Button, TextField, Box, Typography, Grid, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MainCard from "components/MainCard";
import axios from "axios"; // Make sure to import axios for API requests
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false); // State to handle user not found message
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/admin/user/single/${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        }
      );

      if (response.data.message === "User found") {
        setUser(response.data.user); // If found, update the user state
        setUserNotFound(false); // Reset user not found state
      } else {
        setUser(null); // Reset the user details
        setUserNotFound(true); // Set the user not found state to true
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Reset user on error
      setUserNotFound(true); // Set user not found if there's an error
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdmin = async () => {
    if (user && user.id) {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
          console.error("No token found");
          return;
        }

        // Determine the API endpoint based on current admin status
        const apiUrl = user.admin
          ? `http://127.0.0.1:8000/api/admin/remove/`
          : `http://127.0.0.1:8000/api/admin/make/`;

        // Send POST request to toggle the user's admin status
        const response = await axios.post(
          apiUrl,
          { user_id: user.id },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
            },
          }
        );

        Navigate("/users");

        
      } catch (error) {
        console.error("Error toggling admin status:", error);
      }
    }
  };

  return (
    <div>
      <MainCard sx={{ mb: 5 }} title="Search User">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            label="Search by User ID or Name"
            variant="outlined"
            sx={{ mb: 2, mr: 2 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ sx: { width: "50%" } }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} /> {/* Divider between search and user details */}

        {userNotFound && (
          <Typography sx={{ color: "red", textAlign: "center", mb: 2 }}>
            No such user exists
          </Typography>
        )}

        {user && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>
              User Details
            </Typography>

            <TableContainer sx={{ mt: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "white", borderBottom: "2px solid black" }}>
                  <TableRow>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>ID</strong></TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>Username</strong></TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>Email</strong></TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>Joined (Created)</strong></TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>Rating</strong></TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>Verified</strong></TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>Blog Count</strong></TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>Problem Count</strong></TableCell>
                    <TableCell sx={{ color: "primary.main", fontWeight: 600 }}><strong>Admin</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                    <TableCell>{user.rating}</TableCell>
                    <TableCell>{user.email_verified_at ? "Yes" : "No"}</TableCell>
                    <TableCell>{user.blog_count}</TableCell>
                    <TableCell>{user.problem_count}</TableCell>
                    <TableCell>{user.admin ? "Yes" : "No"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleToggleAdmin}
                disabled={loading}
              >
                {user.admin ? "Remove Admin" : "Make Admin"}
              </Button>
            </Box>
          </Box>
        )}
      </MainCard>
    </div>
  );
}
