    import React, { useState, useEffect } from "react";
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
    import axios from "axios"; // Ensure correct import for axios

    const UserData = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("id");

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage
            if (!token) {
            console.error("Access token is missing.");
            return;
            }

            const response = await axios.get("http://127.0.0.1:8000/api/admin/user/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setUsers(response.data.users); // Assuming the response contains 'users' array
        } catch (error) {
            console.error("Error fetching users:", error.response ? error.response.data : error);
        }
        };
        fetchUsers();
    }, []);

    const handleRequestSort = (property) => (event) => {
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

    const TableHeader = ({ label, property }) => (
        <TableCell
        sx={{
            backgroundColor: "#1565C0",
            color: "white", // Make font color white
            fontWeight: "bold",
        }}
        >
        <TableSortLabel
            active={orderBy === property}
            direction={orderBy === property ? order : "asc"}
            onClick={handleRequestSort(property)}
            sx={{
            "& .MuiTableSortLabel-icon": {
                color: "white !important",
            },
            color: "white !important", // Ensure font color of header is white
            }}
        >
            {label}
        </TableSortLabel>
        </TableCell>
    );

    return (
        <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
            <Table sx={{ minWidth: 750 }}>
            <TableHead>
                <TableRow>
                <TableHeader label="ID" property="id" />
                <TableHeader label="Username" property="username" />
                <TableHeader label="Email" property="email" />
                <TableHeader label="Verified" property="verified" />
                <TableHeader label="Joined (Created)" property="created_at" />
                <TableHeader label="Problem Count" property="problem_count" />
                <TableHeader label="Blog Count" property="blog_count" />
                <TableHeader label="Admin" property="admin" />
                </TableRow>
            </TableHead>
            <TableBody>
                {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                    <TableRow hover key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.verified ? "Yes" : "No"}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                    <TableCell>{user.problem_count}</TableCell>
                    <TableCell>{user.blog_count}</TableCell>
                    <TableCell>{user.admin ? "Yes" : "No"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
            backgroundColor: "#1565C0",
            color: "white",
            "& .MuiTablePagination-actions": {
                color: "white",
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                color: "white",
            },
            "& .MuiTablePagination-select": {
                color: "white",
            },
            "& .MuiTablePagination-selectIcon": {
                color: "white",
            },
            }}
        />
        </Paper>
    );
    };

    export default UserData;
