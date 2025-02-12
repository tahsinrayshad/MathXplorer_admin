// material-ui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import MainCard from 'components/MainCard';
import { margin } from '@mui/system';
import UserData from './userdata';

// ==============================|| Announcement PAGE ||============================== //

export default function SamplePage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleAdmin = () => {
    // Navigate to the 'new announcement' page
    console.log("New Contest button clicked!");
    navigate('/users/admin'); // This will navigate to the "/announcement/new" route
  };

  return (
    <div>
      <Grid rowSpacing={4.5} columnSpacing={2.75}>
        <Grid sx={{ mb: 3 }} item xs={12}>
          <MainCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Users
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdmin}
                sx={{ marginLeft: 2 }}
              >
                Manage User
              </Button>
            </Box>
          </MainCard>

        </Grid>
        <Grid sx={{ mb: 3 }} item xs={12}>
          <UserData/>
        </Grid>
      </Grid>
    </div>
  );
}
