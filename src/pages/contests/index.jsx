// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return (
    <MainCard title="Sample Card">
      <Typography variant="body2">
        This is Contest page
      </Typography>
    </MainCard>
  );
}