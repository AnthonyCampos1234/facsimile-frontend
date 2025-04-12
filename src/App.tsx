import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import './index.css';
import Login from './pages/Auth/Login';
import DataSources from './pages/DataSources/DataSources';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';

// Add interface for user type
interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthResponse {
  data: {
    _id: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    googleId: string;
    authTokens: {
      google: any; // You can type this more specifically if needed
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  success: boolean;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3001/api/v1/auth/me', {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.log('User not authenticated');
          } else {
            console.error('Server error:', response.status);
          }
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        const userData: AuthResponse = await response.json();

        // Validate the required user fields
        if (
          !userData.data._id ||
          !userData.data.email ||
          !userData.data.displayName
        ) {
          console.error('Invalid user data received:', userData);
          setUser(null);
          setIsAuthenticated(false);
          return;
        }

        setUser({
          id: userData.data._id,
          name: userData.data.displayName,
          email: userData.data.email,
          picture: userData.data.profilePicture || '' // Provide fallback for missing picture
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3001/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;
    return <>{children}</>;
  };

  return (
    <div className="App">
      {isAuthenticated && <NavBar user={user} onLogout={handleLogout} />}
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/auth/success" element={<Navigate to="/" />} />
        <Route
          path="/auth/error"
          element={<div>Authentication failed. Please try again.</div>}
        />
        <Route path="/connect/success" element={<Navigate to="/sources" />} />
        <Route
          path="/connect/error"
          element={
            <div>Failed to connect Google services. Please try again.</div>
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sources"
          element={
            <ProtectedRoute>
              <DataSources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
