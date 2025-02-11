import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const ProblemTable = ({ title, problems, headerColor }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        height: "100%",
        borderRadius: 2,
        "& .MuiTableCell-root": {
          borderBottom: "none",
          py: 2,
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: "2px solid",
          borderColor: headerColor,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#1a237e" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#1a237e" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#1a237e" }}>Target</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map((problem) => (
            <TableRow
              key={problem.id}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                },
              }}
            >
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#1a237e" }}>
                  {problem.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{problem.title}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" sx={{ color: "#1a237e" }}>
                  {problem.tags.target}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProblemTable;
