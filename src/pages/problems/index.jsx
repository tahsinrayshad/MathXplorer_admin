// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import PubProb from './publishedprob';
import { Grid } from '@mui/material';
import ProblemTable from './problemTableData';
import { Box } from '@mui/system';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  return (
    <div>
      
      <Grid rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
        <MainCard title="Problem">
          <Typography variant="body2">
          </Typography>
        </MainCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProblemTable />          
        </Grid>
        
      </Grid>
      
    </div>
  );
}