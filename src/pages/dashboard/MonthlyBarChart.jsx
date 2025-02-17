import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import axios from 'axios'; // Import axios

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['v0', 'v1', 'v2', 'v3', 'v4', 'v5'], // Corresponds to the keys in the API response
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([ 
    { 
      data: [0, 0, 0, 0, 0, 0] // Default data 
    } 
  ]);
  
  const [total, setTotal] = useState(null); // State to store total submission count
  const [options, setOptions] = useState(barChartOptions);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is missing');
          return;
        }

        // Fetch the data from the API
        const response = await axios.get('http://127.0.0.1:8000/api/common/submission/tags', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Destructure the API response
        const { v0, v1, v2, v3, v4, v5, total } = response.data;

        // Update the series with the fetched data
        setSeries([
          {
            data: [v0, v1, v2, v3, v4, v5]
          }
        ]);

        // Set the total value
        setTotal(total);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: ['#7A2048'],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      }
    }));
  }, [primary, info, secondary]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <Box sx={{ p: 3, pb: 0 }}>
        <Stack spacing={2}>
          <Typography variant="h6" color="text.secondary">
            Tag-Based Statistics
          </Typography>
          {/* Display the total value dynamically */}
          <Typography variant="h3">{total !== null ? total : 'Loading...'}</Typography>
        </Stack>
      </Box>
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </Box>
  );
}
