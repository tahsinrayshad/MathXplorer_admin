// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   Button,
// } from "@mui/material";

// const ProblemTable = ({ title, problems, headerColor, onToggleExpand, isExpanded }) => {
//   const showToggleButton = problems.length > 5; // Show button only if problems are more than 5
//   const displayedProblems = isExpanded ? problems : problems.slice(0, 5);

//   return (
//     <TableContainer
//       component={Paper}
//       sx={{
//         borderRadius: 2,
//         "& .MuiTableCell-root": {
//           borderBottom: "none",
//           py: 2,
//         },
//       }}
//     >
//       <Box
//         sx={{
//           p: 2,
//           borderBottom: "2px solid",
//           borderColor: headerColor,
//         }}
//       >
//         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//           {title}
//         </Typography>
//       </Box>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ fontWeight: "bold", color: "#1a237e" }}>ID</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "#1a237e" }}>Title</TableCell>
//             <TableCell sx={{ fontWeight: "bold", color: "#1a237e" }}>Target</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {displayedProblems.map((problem) => (
//             <TableRow
//               key={problem.id}
//               sx={{
//                 "&:nth-of-type(odd)": {
//                   backgroundColor: "rgba(0, 0, 0, 0.02)",
//                 },
//               }}
//             >
//               <TableCell>
//                 <Typography variant="body1" sx={{ fontWeight: "bold", color: "#1a237e" }}>
//                   {problem.id}
//                 </Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body1">{problem.title}</Typography>
//               </TableCell>
//               <TableCell>
//                 <Typography variant="body1" sx={{ color: "#1a237e" }}>
//                   {problem.tags.target}
//                 </Typography>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Ensure the "Show All" / "Show Less" button is always visible when needed */}
//       {showToggleButton && (
//         <Box sx={{ p: 2, textAlign: "center" }}>
//           <Button onClick={onToggleExpand} sx={{ fontWeight: "bold", color: "#1a237e" }}>
//             {isExpanded ? "Show Less" : "Show All"}
//           </Button>
//         </Box>
//       )}
//     </TableContainer>
//   );
// };

// export default ProblemTable;




import React from "react";
import { useNavigate } from "react-router-dom"; // Navigation hook
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
  Button,
} from "@mui/material";

const ProblemTable = ({ title, problems, headerColor, onToggleExpand, isExpanded }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const showToggleButton = problems.length > 5; // Only show toggle if there are more than 5 problems
  const displayedProblems = isExpanded ? problems : problems.slice(0, 5);

  return (
    <TableContainer
      component={Paper}
      sx={{
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
          {displayedProblems.map((problem) => (
            <TableRow
              key={problem.id}
              onClick={() => navigate(`/problems/single/${problem.id}`)} // Match your route structure
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 255, 0.1)", // Light blue hover effect
                },
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

      {/* Show All / Show Less Button */}
      {showToggleButton && (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button onClick={onToggleExpand} sx={{ fontWeight: "bold", color: "#1a237e" }}>
            {isExpanded ? "Show Less" : "Show All"}
          </Button>
        </Box>
      )}
    </TableContainer>
  );
};

export default ProblemTable;
