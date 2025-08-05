import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Admin imports
import Login from './admin/pages/Login';
import Layout from './admin/Layout';
import RequireAuth from './admin/RequireAuth';
import Dashboard from './admin/pages/Dashboard';
import AddProduct from './admin/pages/AddProduct';
// Stubs; create later
const ManageProducts = React.lazy(() => import('./admin/pages/ManageProducts'));
const ManageOffers = React.lazy(() => import('./admin/pages/ManageOffers'));
const Orders = React.lazy(() => import('./admin/pages/Orders'));

const App = () => (
  <Router>
    <Routes>
      {/* Public site */}
      {/* <Route path="/" element={<Home />} /> */}

      {/* Admin auth */}
      <Route path="/" element={<Login />} />

      {/* Admin protected routes */}
      <Route
        path="/admin/*"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="manage-products" element={<ManageProducts />} />
        <Route path="manage-offers" element={<ManageOffers />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
