// material-ui
import Typography from '@mui/material/Typography';
import NewContest from './ContestCreate'

// project import
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
return (
    <div>
    
        <Grid rowSpacing={4.5} columnSpacing={2.75}>
            
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewContest/>                
            </Grid>
            
        </Grid>
        
    </div>
    );
}