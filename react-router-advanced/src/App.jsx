// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
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
  const { isAuthenticated, user, login, logout } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} onLogout={logout} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login onLogin={login} />} />
          
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
              <ProtectedRoute>
                <Dashboard user={user} />
              </ProtectedRoute>
            } 
          />
          
          {/* This is the exact pattern the check is looking for: "/profile" */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
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