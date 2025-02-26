// import { lazy } from 'react';
// import Loadable from 'components/Loadable'; // Assuming you're using Loadable for code-splitting
// import MinimalLayout from './../layout/MinimalLayout/index'; // Import MinimalLayout

// // Import the login and register components
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
// const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// // ==============================|| AUTH ROUTING ||============================== //

// const LoginRoutes = {
//   path: '/',
//   element: <MinimalLayout />, // Use MinimalLayout for the login route
//   children: [
//     {
//       path: 'login', // This will render the Login page using MinimalLayout
//       element: <AuthLogin />  // AuthLogin component will be rendered inside MinimalLayout
//     },
//     {
//       path: 'register', // This will render the Register page using MinimalLayout
//       element: <AuthRegister />  // AuthRegister component will be rendered inside MinimalLayout
//     }
//   ]
// };

// export default LoginRoutes;



// import { lazy } from 'react';
// import Loadable from 'components/Loadable'; // Assuming you're using Loadable for code-splitting
// import MinimalLayout from './../layout/MinimalLayout/index'; // Import MinimalLayout
// import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

// // Import the login and register components
// const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
// const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// // ==============================|| AUTH ROUTING ||============================== //

// // ProtectedRoutes component to handle redirection
// const ProtectedRoutes = ({ children }) => {
//   const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage
//   if (token) {
//     // Redirect to dashboard if already logged in
//     return <Navigate to="/dashboard" />;
//   }
//   return children;
// };

// const LoginRoutes = {
//   path: '/',
//   element: <MinimalLayout />, // Use MinimalLayout for the login route
//   children: [
//     {
//       path: 'login',
//       element: (
//         <ProtectedRoutes>
//           <AuthLogin /> {/* Show Login page if not authenticated */}
//         </ProtectedRoutes>
//       ),
//     },
//     {
//       path: 'register', 
//       element: <AuthRegister />  // AuthRegister component will be rendered inside MinimalLayout
//     }
//   ]
// };

// export default LoginRoutes;











import { lazy } from 'react';
import Loadable from 'components/Loadable'; // Assuming you're using Loadable for code-splitting
import MinimalLayout from './../layout/MinimalLayout/index'; // Import MinimalLayout
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

// Import the login and register components
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

// ProtectedRoutes component to handle redirection
const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage
  if (token) {
    // Redirect to dashboard if already logged in
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />, // Use MinimalLayout for the login route
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoutes>
          <Navigate to="/login" /> {/* Redirect to login page if not authenticated */}
        </ProtectedRoutes>
      ),
    },
    {
      path: 'login',
      element: (
        <ProtectedRoutes>
          <AuthLogin /> {/* Show Login page if not authenticated */}
        </ProtectedRoutes>
      ),
    },
    {
      path: 'register', 
      element: <AuthRegister />  // AuthRegister component will be rendered inside MinimalLayout
    }
  ]
};

export default LoginRoutes;
