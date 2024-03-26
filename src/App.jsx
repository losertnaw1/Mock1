import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeScreen from './component/Home';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm'

const App = () => {
  const [isAuthen, setIsAuthen] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const expireAfter = parseInt(localStorage.getItem('expireAfter'));

      if (token && expireAfter) {
        const expireDate = new Date(new Date().getTime() + expireAfter * 1000);
        const currentDate = new Date();
        if (expireDate > currentDate) {
          setIsAuthen(true);
        } else {
          setIsAuthen(false);
          localStorage.removeItem('token');
          localStorage.removeItem('expireAfter');
        }
      } else {
        setIsAuthen(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthen ? '/home' : '/login'} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
