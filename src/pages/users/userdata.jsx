    import React, { useState, useEffect } from "react"
    import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    IconButton,
    TextField,
    TablePagination,
    Chip,
    Menu,
    MenuItem,
    TableSortLabel,
    } from "@mui/material"
    import {
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    } from "@mui/icons-material"

    const users = [
    {
        id: 1,
        name: "Adam Trantow",
        company: "Mohr, Langworth and Hills",
        role: "UI Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 2,
        name: "Angel Rolfson-Kulas",
        company: "Koch and Sons",
        role: "UI Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 3,
        name: "Betty Hammes",
        company: "Waelchi - VonRueden",
        role: "UI Designer",
        verified: true,
        status: "Active",
    },
    {
        id: 4,
        name: "Billy Braun",
        company: "White, Cassin and Goldner",
        role: "UI Designer",
        verified: false,
        status: "Banned",
    },
    {
        id: 5,
        name: "Billy Stoltenberg",
        company: "Medhurst, Moore and Franey",
        role: "Leader",
        verified: true,
        status: "Banned",
    },
    {
        id: 6,
        name: "Carmen O'Conner",
        company: "Labadie, Cruickshank and Ernser",
        role: "Developer",
        verified: false,
        status: "Inactive",
    },
    { id: 7, name: "Carson Torp", company: "Rutherford LLC", role: "Project Manager", verified: true, status: "Active" },
    {
        id: 8,
        name: "Cathy Block",
        company: "Stiedemann, Hilll and Parisian",
        role: "Team Lead",
        verified: true,
        status: "Active",
    },
    {
        id: 9,
        name: "Derek Borer",
        company: "Jacobs, Fahey and Prosacco",
        role: "UI Designer",
        verified: false,
        status: "Inactive",
    },
    { id: 10, name: "Edward Ledner", company: "Barton - Towne", role: "Developer", verified: true, status: "Active" },
    { id: 11, name: "Elisa Wyman", company: "Conroy - Bailey", role: "HR Manager", verified: false, status: "Active" },
    { id: 12, name: "Emma Boehm", company: "Hyatt - Trantow", role: "UI Designer", verified: true, status: "Banned" },
    {
        id: 13,
        name: "Fannie McLaughlin",
        company: "O'Keefe, Will and Schneider",
        role: "Tester",
        verified: true,
        status: "Active",
    },
    {
        id: 14,
        name: "Fredrick Terry",
        company: "Homenick - Deckow",
        role: "UI Designer",
        verified: true,
        status: "Active",
    },
    { id: 15, name: "Grace Blick", company: "Crist - Barton", role: "Developer", verified: false, status: "Inactive" },
    {
        id: 16,
        name: "Helen Prohaska",
        company: "Baumbach - Parisian",
        role: "QA Analyst",
        verified: true,
        status: "Active",
    },
    { id: 17, name: "James Heller", company: "Rowe LLC", role: "UI Designer", verified: true, status: "Active" },
    { id: 18, name: "Jerome Adams", company: "Zulauf Inc", role: "Designer", verified: true, status: "Active" },
    {
        id: 19,
        name: "Jessica Klein",
        company: "Schmidt, Von and Dickinson",
        role: "UI Designer",
        verified: false,
        status: "Banned",
    },
    { id: 20, name: "Johanna Kihn", company: "Pagac - Bashirian", role: "Developer", verified: true, status: "Active" },
    { id: 21, name: "Kimberly Sipes", company: "Lowe LLC", role: "Team Lead", verified: false, status: "Inactive" },
    {
        id: 22,
        name: "Laura Reinger",
        company: "Swift - Goldner",
        role: "Product Manager",
        verified: true,
        status: "Active",
    },
    {
        id: 23,
        name: "Louis Russel",
        company: "Davis, Armstrong and Murphy",
        role: "Developer",
        verified: false,
        status: "Banned",
    },
    { id: 24, name: "Madison Davis", company: "Runolfsdottir LLC", role: "Designer", verified: true, status: "Active" },
    {
        id: 25,
        name: "Marcus Thiel",
        company: "Smith, Jacobs and Schuster",
        role: "UI Designer",
        verified: true,
        status: "Inactive",
    },
    {
        id: 26,
        name: "Marion Mertz",
        company: "Howell, Rau and Collins",
        role: "QA Manager",
        verified: false,
        status: "Banned",
    },
    { id: 27, name: "Nina Wisoky", company: "Hermann and Sons", role: "UI Designer", verified: true, status: "Active" },
    {
        id: 28,
        name: "Paul Walker",
        company: "Lang, Wintheiser and Rowe",
        role: "Tester",
        verified: false,
        status: "Inactive",
    },
    { id: 29, name: "Ruby Skiles", company: "Boyle - Schumm", role: "Project Manager", verified: true, status: "Active" },
    {
        id: 30,
        name: "Timothy Krajcik",
        company: "Balistreri LLC",
        role: "UI Designer",
        verified: false,
        status: "Inactive",
    },
    ]

    function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
    }

    function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
    }

    function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
    }

    export default function UserTable() {
    const [order, setOrder] = useState("asc")
    const [orderBy, setOrderBy] = useState("name")
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [anchorEl, setAnchorEl] = useState(null)
    const [activeRow, setActiveRow] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredUsers, setFilteredUsers] = useState(users)

    useEffect(() => {
        const filtered = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setFilteredUsers(filtered)
        setPage(0)
    }, [searchTerm])

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelected = filteredUsers.map((n) => n.id)
        setSelected(newSelected)
        return
        }
        setSelected([])
    }

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id)
        let newSelected = []

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id)
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleMenuClick = (event, row) => {
        setAnchorEl(event.currentTarget)
        setActiveRow(row)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setActiveRow(null)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const isSelected = (id) => selected.indexOf(id) !== -1

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0

    return (
        <Paper sx={{ width: "100%", mb: 2 }}>
        <TextField
            placeholder="Search user..."
            variant="outlined"
            sx={{ m: 2, width: "300px" }}
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
                <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < filteredUsers.length}
                    checked={filteredUsers.length > 0 && selected.length === filteredUsers.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                        "aria-label": "select all users",
                    }}
                    />
                </TableCell>
                {["name", "company", "role", "verified", "status"].map((headCell) => (
                    <TableCell key={headCell} sortDirection={orderBy === headCell ? order : false}>
                    <TableSortLabel
                        active={orderBy === headCell}
                        direction={orderBy === headCell ? order : "asc"}
                        onClick={() => handleRequestSort(headCell)}
                    >
                        {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                    </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {stableSort(filteredUsers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    const isItemSelected = isSelected(row.id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                    <TableRow
                        hover
                        onClick={() => handleClick(row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                            "aria-labelledby": labelId,
                            }}
                        />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                        </TableCell>
                        <TableCell>{row.company}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>
                        {row.verified ? <CheckCircleIcon color="success" sx={{ fontSize: 20 }} /> : "-"}
                        </TableCell>
                        <TableCell>
                        <Chip
                            label={row.status}
                            color={row.status === "Active" ? "success" : row.status === "Banned" ? "error" : "default"}
                            size="small"
                        />
                        </TableCell>
                        <TableCell>
                        <IconButton size="small" onClick={(e) => handleMenuClick(e, row)}>
                            <MoreVertIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    )
                })}
                {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={7} />
                </TableRow>
                )}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
            </MenuItem>
        </Menu>
        </Paper>
    )
    }

