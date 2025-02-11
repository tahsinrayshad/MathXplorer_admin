


// import { lazy } from 'react';
// import { Navigate } from 'react-router-dom'; // React Router v6 uses Navigate

// // project import
// import Loadable from 'components/Loadable';
// import Dashboard from 'layout/Dashboard';

// // Lazy load pages
// const Color = Loadable(lazy(() => import('pages/component-overview/color')));
// const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
// const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
// const Users = Loadable(lazy(() => import('pages/users/index')));
// const Announcements = Loadable(lazy(() => import('pages/announcements/index')));
// const Contests = Loadable(lazy(() => import('pages/contests/index')));
// const Problems = Loadable(lazy(() => import('pages/problems/index')));
// const IndividualProblem = Loadable(lazy(() => import('pages/problems/indivprob/index')));
// const NewAnnouncement = Loadable(lazy(() => import('pages/announcements/New/index')));
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));

// // ==============================|| MAIN ROUTING ||============================== //

// const MainRoutes = {
//   path: '/',
//   element: <Dashboard />,
//   children: [
//     {
//       path: '/',
//       element: localStorage.getItem('token') ? <DashboardDefault /> : <Navigate to="/login" replace />,
//     },
//     {
//       path: 'login',
//       element: !localStorage.getItem('token') ? <AuthLogin /> : <Navigate to="/dashboard" replace />,
//     },
//     {
//       path: 'color',
//       element: <Color />,
//     },
//     {
//       path: 'dashboard',
//       element: localStorage.getItem('token') ? <DashboardDefault /> : <Navigate to="/login" replace />,
//     },
//     // {
//     //   path: 'sample-page',
//     //   element: <SamplePage />,
//     // },
//     {
//       path: 'shadow',
//       element: <Shadow />,
//     },
//     {
//       path: 'typography',
//       element: <Typography />,
//     },
//     {
//       path: 'users',
//       element: <Users />,
//     },
//     {
//       path: 'announcements',
//       element: <Announcements />,
//     },
//     {
//       path: 'announcements/new',
//       element: <NewAnnouncement />,
//     },
//     {
//       path: 'problems',
//       element: <Problems />,
//     },
//     {
//       path: 'problems/single/:id',
//       element: <IndividualProblem />,
//     },
//     {
//       path: 'contests',
//       element: <Contests />,
//     },
//   ],
// };

// export default MainRoutes;






import { lazy } from 'react';
import Loadable from 'components/Loadable'; // Assuming you're using Loadable for code-splitting
import Dashboard from 'layout/Dashboard'; // Import Dashboard layout

// Import other components and pages
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Users = Loadable(lazy(() => import('pages/users/index')));
const Announcements = Loadable(lazy(() => import('pages/announcements/index')));
const Contests = Loadable(lazy(() => import('pages/contests/index')));
const Problems = Loadable(lazy(() => import('pages/problems/index')));
const IndividualProblem = Loadable(lazy(() => import('pages/problems/indivprob/index')));
const NewAnnouncement = Loadable(lazy(() => import('pages/announcements/New/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />, // Use the Dashboard layout for authenticated routes
  children: [
    {
      path: '/',
      element: <DashboardDefault /> // Default dashboard view
    },
    {
      path: 'color',
      element: <Color /> // Color page
    },
    {
      path: '/dashboard',
      element: <DashboardDefault /> // Default dashboard view
    },
    {
      path: '/shadow',
      element: <Shadow /> // Shadow page
    },
    {
      path: 'typography',
      element: <Typography /> // Typography page
    },
    {
      path: '/users',
      element: <Users /> // Users page
    },
    {
      path: '/announcements',
      element: <Announcements /> // Announcements page
    },
    {
      path: '/announcements/new',
      element: <NewAnnouncement /> // New announcement page
    },
    {
      path: '/problems',
      element: <Problems /> // Problems page
    },
    {
      path: '/problems/single/:id',
      element: <IndividualProblem /> // Individual problem page
    },
    {
      path: '/contests',
      element: <Contests /> // Contests page
    }
  ]
};

export default MainRoutes;
