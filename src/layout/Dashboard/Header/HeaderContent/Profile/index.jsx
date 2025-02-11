// import PropTypes from 'prop-types';
// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';  // Import axios

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import ButtonBase from '@mui/material/ButtonBase';
// import CardContent from '@mui/material/CardContent';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import Popper from '@mui/material/Popper';
// import Stack from '@mui/material/Stack';
// import Tooltip from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project import
// import MainCard from 'components/MainCard';
// import Transitions from 'components/@extended/Transitions';

// // assets
// import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

// // ==============================|| HEADER CONTENT - PROFILE ||============================== //

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
//       {value === index && children}
//     </div>
//   );
// }

// TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };

// export default function Profile() {
//   const theme = useTheme();

//   const anchorRef = useRef(null);
//   const [open, setOpen] = useState(false);
//   const [username, setUsername] = useState('');

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }
//     setOpen(false);
//   };

//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const iconBackColorOpen = 'grey.100';

//   // Fetch user data after component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.post('http://127.0.0.1:8000/api/auth/me/', {}, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Use the token for authorization
//           }
//         });

//         const userData = response.data;
//         setUsername(userData.username);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <Box sx={{ flexShrink: 0, ml: 0.75 }}>
//       <ButtonBase
//         sx={{
//           p: 0.25,
//           bgcolor: open ? iconBackColorOpen : 'transparent',
//           borderRadius: 1,
//           '&:hover': { bgcolor: 'secondary.lighter' },
//           '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
//         }}
//         aria-label="open profile"
//         ref={anchorRef}
//         aria-controls={open ? 'profile-grow' : undefined}
//         aria-haspopup="true"
//         onClick={handleToggle}
//       >
//         <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
//           {/* Display first letter of the username in uppercase */}
//           <Box
//             sx={{
//               width: 32,
//               height: 32,
//               backgroundColor: 'grey',
//               borderRadius: '50%',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               fontSize: '16px',
//               color: 'white',
//             }}
//           >
//             {username && username.charAt(0).toUpperCase()} {/* Display first letter */}
//           </Box>
//           <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
//             {username || 'Loading...'}
//           </Typography>
//         </Stack>
//       </ButtonBase>
//       <Popper
//         placement="bottom-end"
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//         popperOptions={{
//           modifiers: [
//             {
//               name: 'offset',
//               options: {
//                 offset: [0, 9]
//               }
//             }
//           ]
//         }}
//       >
//         {({ TransitionProps }) => (
//           <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
//             <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290, minWidth: 240, maxWidth: { xs: 250, md: 290 } }}>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MainCard elevation={0} border={false} content={false}>
//                   <CardContent sx={{ px: 2.5, pt: 3 }}>
//                     <Grid container justifyContent="space-between" alignItems="center">
//                       <Grid item>
//                         <Stack direction="row" spacing={1.25} alignItems="center">
//                           <Box
//                             sx={{
//                               width: 32,
//                               height: 32,
//                               backgroundColor: 'grey',
//                               borderRadius: '50%',
//                               display: 'flex',
//                               justifyContent: 'center',
//                               alignItems: 'center',
//                               fontSize: '16px',
//                               color: 'white',
//                             }}
//                           >
//                             {username && username.charAt(0).toUpperCase()}
//                           </Box>
//                           <Stack>
//                             <Typography variant="h6">{username || 'Loading...'}</Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               UI/UX Designer
//                             </Typography>
//                           </Stack>
//                         </Stack>
//                       </Grid>
//                       <Grid item>
//                         <Tooltip title="Logout">
//                           <IconButton size="large" sx={{ color: 'text.primary' }} > 
//                             <LogoutOutlined />
//                           </IconButton>
//                         </Tooltip>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </MainCard>
//               </ClickAwayListener>
//             </Paper>
//           </Transitions>
//         )}
//       </Popper>
//     </Box>
//   );
// }





import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';  // Import axios

// material-ui
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };

export default function Profile() {
  const theme = useTheme();
  const navigate = useNavigate(); // Hook to handle navigation

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = 'grey.100';

  // Fetch user data after component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/me/', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use the token for authorization
          }
        });

        const userData = response.data;
        setUsername(userData.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Logout function
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' },
          '&:focus-visible': { outline: `2px solid ${theme.palette.secondary.dark}`, outlineOffset: 2 }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
          {/* Display first letter of the username in uppercase */}
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: 'grey',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              color: 'white',
            }}
          >
            {username && username.charAt(0).toUpperCase()} {/* Display first letter */}
          </Box>
          <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
            {username || 'Loading...'}
          </Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290, minWidth: 240, maxWidth: { xs: 250, md: 290 } }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              backgroundColor: 'grey',
                              borderRadius: '50%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: '16px',
                              color: 'white',
                            }}
                          >
                            {username && username.charAt(0).toUpperCase()}
                          </Box>
                          <Stack>
                            <Typography variant="h6">{username || 'Loading...'}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              UI/UX Designer
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={handleLogout}> {/* Logout functionality */}
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
