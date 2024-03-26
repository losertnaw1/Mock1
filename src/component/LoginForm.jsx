import { useState } from 'react';
import axios from 'axios';
import environment from '../constants/environment';
// import PropTypes from 'prop-types';

const { rootUrl } = environment;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // LoginForm.propTypes= {
  //     onLogin: PropTypes.any,
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post(rootUrl + "/authentication/login", formData);
      const token = response.data.data.tokens.access_token.access_token;
      const expireAfter = response.data.data.tokens.access_token.expireAfter;
      const refreshToken = response.data.data.tokens.refresh_token.refresh_token;

      localStorage.setItem('token', token);
      localStorage.setItem('expire_after', expireAfter);
      localStorage.setItem('refresh_token', refreshToken);
      window.location.href = '/home';
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  };

  return (
    <>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
        <button type="submit">Login</button>
        <div className="links">
          <a href="#">Forgot password?</a>
          <a href="/register">Don&apos;t have an account? Sign up</a>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
