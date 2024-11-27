import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

import PrivateRoutes from "./components/utils/PrivateRoutes";
import AdminRoutes from "./components/utils/AdminRoutes";
import UserRoutes from "./components/utils/UserRoutes";
import LoginScreen from "./screens/LoginScreen";
import AboutScreen from "./screens/AboutScreen";
import AdminDashboardScreen from "./screens/admin/AdminDashboardScreen";
import NotFoundScreen from "./screens/NotFoundScreen";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Page d'accueil */}
      <Route index element={<LoginScreen />} />

      {/* Page de connexion */}
      <Route path="a-propos" element={<AboutScreen />} />

      {/* Private Routes */}
      <Route path="private" element={<PrivateRoutes />}>
        {/* Exemple de route privée */}
        <Route path="dashboard" element={<h2>Private Dashboard</h2>} />
      </Route>

      {/* Admin Routes */}
      <Route path="admin" element={<AdminRoutes />}>
        {/* Exemple de route admin */}
        <Route path="dashboard" element={<AdminDashboardScreen />} />
        
      </Route>

      {/* User Routes */}
      <Route path="user" element={<UserRoutes />}>
        {/* Exemple de route utilisateur */}
        <Route path="profile" element={<h2>User Profile</h2>} />
      </Route>

      {/* Route générique pour gérer toutes les autres routes non définies */}
      <Route path="*" element={<NotFoundScreen/>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
