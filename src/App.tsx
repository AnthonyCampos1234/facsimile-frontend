import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import DataSources from './pages/DataSources/DataSources';
import Settings from './pages/Settings/Settings';
import Login from './pages/Auth/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/auth/me', {
          credentials: 'include' // Send cookies with the request
        });

        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;
    return <>{children}</>;
  };

  return (
    <div className="App">
      {isAuthenticated && <NavBar />}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/auth/success" element={<Navigate to="/" />} />
        <Route path="/auth/error" element={<div>Authentication failed. Please try again.</div>} />
        <Route path="/connect/success" element={<Navigate to="/sources" />} />
        <Route path="/connect/error" element={<div>Failed to connect Google services. Please try again.</div>} />
        
        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/sources" element={<ProtectedRoute><DataSources /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
