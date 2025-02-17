import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart({ slot }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([
    {
      name: 'Contest Submissions',
      data: []
    },
    {
      name: 'Practise Submissions',
      data: []
    }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      // colors: ['#00246B', theme.palette.primary.main], // Set Practise Submissions color to red
      // colors: ['#89ABE3', '#EA738D'], // Set Practise Submissions color to red
      colors: ['#EA738D','#89ABE3'], // Set Practise Submissions color to red
      xaxis: {
        categories:
          slot === 'month'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      }
    }));
  }, [primary, secondary, line, theme, slot]);

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token is missing.");
          return;
        }

        // Fetch Contest Submissions
        const contestResponse = await axios.get("http://127.0.0.1:8000/api/common/submission/contest/in", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Fetch Practise Submissions
        const practiseResponse = await axios.get("http://127.0.0.1:8000/api/common/submission/contest/out", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Handle Missing Data
        const contestData = slot === 'month'
          ? handleMissingData(Object.keys(contestResponse.data.submission_count_by_month), ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'], contestResponse.data.submission_count_by_month)
          : handleMissingData(Object.keys(contestResponse.data.submission_counts_by_day), ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], contestResponse.data.submission_counts_by_day);

        const practiseData = slot === 'month'
          ? handleMissingData(Object.keys(practiseResponse.data.submission_count_by_month), ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'], practiseResponse.data.submission_count_by_month)
          : handleMissingData(Object.keys(practiseResponse.data.submission_counts_by_day), ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], practiseResponse.data.submission_counts_by_day);

        setSeries([
          {
            name: 'Contest Submissions',
            data: contestData
          },
          {
            name: 'Practise Submissions',
            data: practiseData
          }
        ]);

      } catch (error) {
        console.error("Error fetching submission data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionData();
  }, [slot]);

  // Helper function to handle missing data
  const handleMissingData = (currentDataKeys, allKeys, currentData) => {
    const filledData = allKeys.map(key => (currentDataKeys.includes(key) ? currentData[key] : 0));
    return filledData;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

IncomeAreaChart.propTypes = { 
  slot: PropTypes.string 
};