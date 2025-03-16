import { lazy } from 'react';
import Loadable from 'components/Loadable'; // Assuming you're using Loadable for code-splitting
import Dashboard from 'layout/Dashboard'; // Import Dashboard layout
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

// Import other components and pages
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Users = Loadable(lazy(() => import('pages/users/index')));
const UserAdmin = Loadable(lazy(() => import('pages/users/mrAdmin/index')));
const Problems = Loadable(lazy(() => import('pages/problems/index')));
const IndividualProblem = Loadable(lazy(() => import('pages/problems/indivprob/index')));
const Announcements = Loadable(lazy(() => import('pages/announcements/index')));
const Contests = Loadable(lazy(() => import('pages/contests/index')));
const NewAnnouncement = Loadable(lazy(() => import('pages/announcements/New/index')));
const EditAnnouncement = Loadable(lazy(()=> import('pages/announcements/Edit/index')))
const CreateContest = Loadable(lazy(()=> import('pages/contests/New/index')))
const UsersAdmin = Loadable(lazy(() => import('pages/users/mrAdmin/index')));
const IndivContest = Loadable(lazy(() => import('pages/contests/IndivContest/index')));
const EditContest = Loadable(lazy(() => import('pages/contests/EditContest/index')));
const EditProblem = Loadable(lazy(() => import('pages/problems/edit/index')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />, // Use the Dashboard layout for authenticated routes
  children: [
    {
      path: '/',
      element: <Navigate to="/dashboard" />  // Redirect to /dashboard if logged in
    },
    {
      path: '/dashboard',
      element: <DashboardDefault /> // Default dashboard view
    },
    {
      path: 'color',
      element: <Color /> // Color page
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
      path: '/users/admin',
      element: <UsersAdmin /> // Users page
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
      path: '/announcements/edit/:id',
      element: <EditAnnouncement /> // Edit announcement page
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
      path: '/problems/edit/:id',
      element: <EditProblem /> // Individual problem page
    },
    {
      path: '/contests',
      element: <Contests /> // Contests page
    },
    {
      path: '/contests/new',
      element: <CreateContest /> // Create Contests page
    },
    {
      path: '/contests/single/:id',
      element: <IndivContest /> // View Contests page
    },
    {
      path: '/contests/edit/:id',
      element: <EditContest /> // Edit Contests page
    }
  ]
};

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage
  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" />;
  }
  return children;
};

export const ProtectedMainRoutes = {
  path: '/',
  element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>, // Wrap Dashboard with ProtectedRoutes
  children: MainRoutes.children
};

export default ProtectedMainRoutes;
