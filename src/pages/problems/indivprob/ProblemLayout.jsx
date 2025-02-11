import { Box, Typography, Chip, Grid, Card, CardContent, Divider } from "@mui/material"

export default function ProblemLayout({ problem }) {
  // Parse tags JSON string
  const tagsData = JSON.parse(problem.tags)

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: "auto" }}>
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardContent>
              {/* Title */}
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
                {problem.title}
              </Typography>

              {/* Tags */}
              <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
                {tagsData.topics.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      textTransform: "lowercase",
                      "&:hover": {
                        backgroundColor: "#1565c0",
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Problem Statement */}
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Problem Statement
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                {problem.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Sidebar */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* XP */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  XP
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {problem.xp}
                </Typography>
              </Box>

              {/* Topics */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Topics
                </Typography>
                <Typography variant="body1" fontWeight={500} textAlign="right">
                  {tagsData.topics.join(", ")}
                </Typography>
              </Box>

              {/* Target */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" color="text.secondary">
                  Target
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {tagsData.target}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

