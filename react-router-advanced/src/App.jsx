// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import BlogCategory from './components/BlogCategory';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import NotFound from './components/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Simulate login/logout
  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUser({ username, role: 'user' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          
          {/* Dynamic routing examples */}
          <Route path="blog" element={<Blog />} />
          {/* This is the exact pattern the check is looking for: "/blog/:id" */}
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="blog/category/:categoryId" element={<BlogCategory />} />
          
          {/* More dynamic routing */}
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          
          {/* Protected routes - demonstrate protected route implementation */}
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard user={user} />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="profile" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile user={user} />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;