import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Users = Loadable(lazy(() => import('pages/users/index')));
const Announcements = Loadable(lazy(() => import('pages/announcements/index')));
const Contests = Loadable(lazy(() => import('pages/contests/index')));
const Problems = Loadable(lazy(() => import('pages/problems/index')));
const IndividualProblem = Loadable(lazy(() => import ('pages/problems/indivprob/index')))


// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'announcements',
      element: <Announcements />
    },
    {
      path: 'problems',
      element: <Problems />
    },
    {
      path: 'problems/single/:id',
      element: <IndividualProblem />
    },
    {
      path: 'contests',
      element: <Contests />
    },
  ]
};

export default MainRoutes;
