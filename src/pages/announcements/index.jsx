// material-ui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import MainCard from 'components/MainCard';
import AnnouncementsTable from './announcementtable';
import { margin } from '@mui/system';

// ==============================|| Announcement PAGE ||============================== //

export default function SamplePage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleNewAnnouncement = () => {
    // Navigate to the 'new announcement' page
    console.log("New Announcement button clicked!");
    navigate('/announcements/new'); // This will navigate to the "/announcement/new" route
  };

  return (
    <div>
      <Grid rowSpacing={4.5} columnSpacing={2.75}>
        <Grid sx={{ mb: 3 }} item xs={12}>
          <MainCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Announcement
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewAnnouncement}
                sx={{ marginLeft: 2 }}
              >
                New Announcement
              </Button>
            </Box>
          </MainCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnnouncementsTable sx={{ margin: 3 }} />
        </Grid>
      </Grid>
    </div>
  );
}
