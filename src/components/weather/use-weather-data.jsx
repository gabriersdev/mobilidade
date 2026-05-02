import {useEffect, useState} from 'react';
import apiClient from "@/assets/axios-config.js";

const useWeatherData = (cityName) => {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  
  useEffect(() => {
    // Se não houver nome de cidade, não faz a requisição.
    if (!cityName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('error');
      return;
    }
    
    const fetchWeatherData = async () => {
      setStatus('loading');
      try {
        const response = await apiClient.post(`/weather/`, {
          city_name: cityName,
        });
        setWeatherData(response.data);
        setStatus('success');
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setStatus('error');
      }
    };
    
    fetchWeatherData().then(() => {
    });
  }, [cityName]); // A requisição será refeita se o nome da cidade mudar
  
  return {weatherData, status};
};

export default useWeatherData;
