// import { lazy } from 'react';

// // project import
// import Loadable from 'components/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';

// // render - login
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
// const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// // ==============================|| AUTH ROUTING ||============================== //

// const LoginRoutes = {
//   path: '/',
//   element: <MinimalLayout />,
//   children: [
//     {
//       path: '/login',
//       element: <AuthLogin />
//     },
//     {
//       path: '/register',
//       element: <AuthRegister />
//     }
//   ]
// };

// export default LoginRoutes;




import { lazy } from 'react';
import Loadable from 'components/Loadable'; // Assuming you're using Loadable for code-splitting
import MinimalLayout from './../layout/MinimalLayout/index'; // Import MinimalLayout

// Import the login and register components
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />, // Use MinimalLayout for the login route
  children: [
    {
      path: 'login', // This will render the Login page using MinimalLayout
      element: <AuthLogin />  // AuthLogin component will be rendered inside MinimalLayout
    },
    {
      path: 'register', // This will render the Register page using MinimalLayout
      element: <AuthRegister />  // AuthRegister component will be rendered inside MinimalLayout
    }
  ]
};

export default LoginRoutes;
