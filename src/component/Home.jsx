import { useEffect } from 'react';
import axios from 'axios';
import environment from '../constants/environment';

const { rootUrl } = environment; 

const HomeScreen = () => {
  useEffect(() => {
    const refreshToken = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await axios.post(rootUrl + '/authentication/refresh-token', { refresh_token: storedToken });
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        console.log('Token refreshed:', newToken);
      } catch (error) {
        console.error('Refresh token failed:', error);
        // window.location.href = '/login';
      }
    };

    refreshToken();
  }, []);

  return (
    <div>
      <h1>Home Screen</h1>
      {/* Nội dung của trang */}
    </div>
  );
};

export default HomeScreen;
