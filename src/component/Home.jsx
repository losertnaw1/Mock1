import { useState, useEffect } from 'react';
import axios from 'axios';
import environment from '../constants/environment';
import QuestionManage from './QuestionManage';

const { rootUrl } = environment; 

const HomeScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      const storedToken = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refresh_token');
      if (!storedToken) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await axios.post(rootUrl + '/authentication/refresh-token', { refresh_token: refreshToken });
        const newToken = response.data.data.newTokens.access_token;
        localStorage.setItem('token', newToken);
      } catch (error) {
        console.error('Refresh token failed:', error);
        window.location.href = '/login';
      }
    };

    const fetchData = async () => {
      const storedToken = localStorage.getItem('token');
      try {
        const response = await fetch(rootUrl + '/questions', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        console.log(response);
        const {statusCode, message, data} = await response.json();
        console.log(data);
        setQuestions(data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    refreshToken();
    fetchData();
  }, []);

  return (
    <div>
      <h1>Home Screen</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <QuestionManage questions={questions} />
      )}
    </div>
  );
};

export default HomeScreen;
