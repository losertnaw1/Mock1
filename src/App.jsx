import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './component/Home';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm'

const App = () => {
  const isAuthen = false; // Thay đổi giá trị này để thử nghiệm

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
