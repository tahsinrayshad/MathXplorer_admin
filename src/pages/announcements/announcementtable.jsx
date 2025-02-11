    import React, { useState, useEffect } from "react";
    import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    TablePagination,
    TableSortLabel,
    Menu,
    MenuItem,
    CircularProgress,
    Typography,
    } from "@mui/material";
    import { MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

    function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
    }

    function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
    }

    export default function AnnouncementsTable() {
    const [announcements, setAnnouncements] = useState([]); // Original data from API
    const [filteredAnnouncements, setFilteredAnnouncements] = useState([]); // Filtered results
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("created_at");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeRow, setActiveRow] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/api/notice/all/");
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAnnouncements(data.notices || []);
            setFilteredAnnouncements(data.notices || []); // Initialize filtered data
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    // Update filtered announcements based on search term
    useEffect(() => {
        const filtered = announcements.filter(
        (announcement) =>
            announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAnnouncements(filtered);
        setPage(0); // Reset to the first page on filter change
    }, [searchTerm, announcements]);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuClick = (event, row) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setActiveRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveRow(null);
    };

    const handleEdit = () => {
        console.log("Edit announcement:", activeRow);
        handleMenuClose();
    };

    const handleDelete = () => {
        console.log("Delete announcement:", activeRow);
        handleMenuClose();
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        });
    };

    if (loading) {
        return (
        <Paper
            sx={{
            width: "100%",
            mb: 2,
            borderRadius: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            }}
        >
            <CircularProgress />
        </Paper>
        );
    }

    if (error) {
        return (
        <Paper
            sx={{
            width: "100%",
            mb: 2,
            borderRadius: 2,
            p: 2,
            textAlign: "center",
            }}
        >
            <Typography variant="h6" color="error">
            {error}
            </Typography>
        </Paper>
        );
    }

    return (
        <Paper sx={{ width: "100%", mb: 2, borderRadius: 2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
        <TextField
            placeholder="Search announcements..."
            variant="outlined"
            sx={{
            m: 2,
            width: "300px",
            "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
            },
            }}
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
                <TableRow>
                {[
                    { id: "id", label: "ID" },
                    { id: "title", label: "Title" },
                    { id: "content", label: "Content" },
                    { id: "user_id", label: "User ID" },
                    { id: "created_at", label: "Created At" },
                    { id: "updated_at", label: "Updated At" },
                    { id: "actions", label: "Actions" },
                ].map((headCell) => (
                    <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{
                        fontWeight: 600,
                        color: "#374151",
                        textTransform: "uppercase",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em",
                    }}
                    >
                    {headCell.id !== "actions" ? (
                        <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={() => handleRequestSort(headCell.id)}
                        >
                        {headCell.label}
                        </TableSortLabel>
                    ) : (
                        headCell.label
                    )}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {stableSort(filteredAnnouncements, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                    <TableRow hover key={row.id} sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}>
                    <TableCell sx={{ color: "#111827", fontWeight: 500 }}>{row.id}</TableCell>
                    <TableCell sx={{ color: "#111827", fontWeight: 500 }}>{row.title}</TableCell>
                    <TableCell sx={{ color: "#6b7280" }}>
                        {row.content.length > 100 ? `${row.content.substring(0, 100)}...` : row.content}
                    </TableCell>
                    <TableCell sx={{ color: "#6b7280" }}>{row.user_id}</TableCell>
                    <TableCell sx={{ color: "#6b7280" }}>{formatDate(row.created_at)}</TableCell>
                    <TableCell sx={{ color: "#6b7280" }}>{formatDate(row.updated_at)}</TableCell>
                    <TableCell>
                        <IconButton size="small" onClick={(e) => handleMenuClick(e, row)} sx={{ color: "#6b7280" }}>
                        <MoreVertIcon />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={filteredAnnouncements.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
            borderTop: "1px solid #e5e7eb",
            "& .MuiTablePagination-select": {
                borderRadius: "6px",
            },
            }}
        />
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
            sx: {
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                borderRadius: "6px",
            },
            }}
        >
            <MenuItem onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
            </MenuItem>
        </Menu>
        </Paper>
    );
    }
