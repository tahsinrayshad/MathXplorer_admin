// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AnnouncementsTable from './announcementtable';

// ==============================|| Announcement PAGE ||============================== //

export default function SamplePage() {
  return (
    <div>
      <MainCard title="Sample Card">
        <Typography variant="body2">
          This is Announcement page
        </Typography>
      </MainCard>
      <AnnouncementsTable />
    </div>
  );
}