    // import React, { useState, useEffect } from "react";
    // import {
    // Table,
    // TableBody,
    // TableCell,
    // TableContainer,
    // TableHead,
    // TableRow,
    // Paper,
    // TablePagination,
    // TableSortLabel,
    // Box,
    // Typography,
    // } from "@mui/material";
    // import axios from "axios"; // Ensure correct import for axios

    // const UserData = () => {
    // const [users, setUsers] = useState([]);
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(25);
    // const [order, setOrder] = useState("desc");
    // const [orderBy, setOrderBy] = useState("id");

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //     try {
    //         const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage
    //         if (!token) {
    //         console.error("Access token is missing.");
    //         return;
    //         }

    //         const response = await axios.get("http://127.0.0.1:8000/api/admin/user/all", {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //         });
    //         setUsers(response.data.users); // Assuming the response contains 'users' array
    //     } catch (error) {
    //         console.error("Error fetching users:", error.response ? error.response.data : error);
    //     }
    //     };
    //     fetchUsers();
    // }, []);

    // const handleRequestSort = (property) => (event) => {
    //     const isAsc = orderBy === property && order === "asc";
    //     setOrder(isAsc ? "desc" : "asc");
    //     setOrderBy(property);
    // };

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

    // const TableHeader = ({ label, property }) => (
    //     <TableCell
    //     sx={{
    //         backgroundColor: "white",
    //         color: "#1565C0", // Make font color white
    //         fontWeight: "bold",
    //     }}
    //     >
    //     <TableSortLabel
    //         active={orderBy === property}
    //         direction={orderBy === property ? order : "asc"}
    //         onClick={handleRequestSort(property)}
    //         sx={{
    //         "& .MuiTableSortLabel-icon": {
    //             color: "#1565C0 !important",
    //         },
    //         color: "#1565C0 !important", // Ensure font color of header is white
    //         }}
    //     >
    //         {label}
    //     </TableSortLabel>
    //     </TableCell>
    // );

    // return (
    //     <Paper sx={{ width: "100%", mb: 2 }}>
    //     <Box sx={{ padding: 2, textAlign: "center" }}>
    //         <Typography variant="h5" sx={{ fontSize: "24px", fontWeight: 600 }}>
    //             All Users
    //         </Typography>
    //     </Box>
    //     <TableContainer>
    //         <Table sx={{ minWidth: 750 }}>
    //         <TableHead>
    //             <TableRow>
    //             <TableHeader label="ID" property="id" />
    //             <TableHeader label="Username" property="username" />
    //             <TableHeader label="Email" property="email" />
    //             <TableHeader label="Verified" property="verified" />
    //             <TableHeader label="Joined (Created)" property="created_at" />
    //             <TableHeader label="Problem Count" property="problem_count" />
    //             <TableHeader label="Blog Count" property="blog_count" />
    //             <TableHeader label="Admin" property="admin" />
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             {users
    //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //             .map((user) => (
    //                 <TableRow hover key={user.id}>
    //                 <TableCell>{user.id}</TableCell>
    //                 <TableCell>{user.username}</TableCell>
    //                 <TableCell>{user.email}</TableCell>
    //                 <TableCell>{user.verified ? "Yes" : "No"}</TableCell>
    //                 <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
    //                 <TableCell>{user.problem_count}</TableCell>
    //                 <TableCell>{user.blog_count}</TableCell>
    //                 <TableCell>{user.admin ? "Yes" : "No"}</TableCell>
    //                 </TableRow>
    //             ))}
    //         </TableBody>
    //         </Table>
    //     </TableContainer>
    //     <TablePagination
    //         rowsPerPageOptions={[25, 50, 100]}
    //         component="div"
    //         count={users.length}
    //         rowsPerPage={rowsPerPage}
    //         page={page}
    //         onPageChange={handleChangePage}
    //         onRowsPerPageChange={handleChangeRowsPerPage}
    //         sx={{
    //         backgroundColor: "white",
    //         color: "#1565C0",
    //         "& .MuiTablePagination-actions": {
    //             color: "#1565C0",
    //         },
    //         "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    //             color: "#1565C0",
    //         },
    //         "& .MuiTablePagination-select": {
    //             color: "#1565C0",
    //         },
    //         "& .MuiTablePagination-selectIcon": {
    //             color: "#1565C0",
    //         },
    //         }}
    //     />
    //     </Paper>
    // );
    // };

    // export default UserData;



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

  const TableHeader = ({ label, property }) => (
    <TableCell
      sx={{
        backgroundColor: "white",
        color: "#1565C0", // Make font color blue
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
          color: "#1565C0 !important", // Ensure font color of header is blue
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
          All Users
        </Typography>
      </Box>
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
            {[...users]
                .sort((a, b) => {
                const valA = a[orderBy] !== undefined ? a[orderBy] : null;
                const valB = b[orderBy] !== undefined ? b[orderBy] : null;

                if (orderBy === "created_at") {
                    return order === "asc"
                    ? new Date(valA) - new Date(valB)
                    : new Date(valB) - new Date(valA);
                } else if (typeof valA === "number") {
                    return order === "asc" ? valA - valB : valB - valA;
                } else if (typeof valA === "boolean") {
                    return order === "asc"
                    ? valA === valB
                        ? 0
                        : valA
                        ? 1
                        : -1
                    : valA === valB
                    ? 0
                    : valA
                    ? -1
                    : 1;
                } else if (valA !== null && valB !== null) {
                    return order === "asc"
                    ? valA.toString().localeCompare(valB.toString())
                    : valB.toString().localeCompare(valA.toString());
                } else {
                    return 0;
                }
                })
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
                    backgroundColor: "white",
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

export default UserData;
