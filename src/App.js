
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
function App() {

  const [currentWeather,setCurrentWeather] = useState(null);
  const [forecast,setForecast] = useState(null);

  const handleonSearchChange=(searchData)=>{

    // console.log(searchData);
    const [lat, lon] = searchData.value.split(" "); 
    console.log(lat);

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    
    const forecastFetch=fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([CurrentWeatherFetch,forecastFetch])
      .then(async(response)=>{

        const weatherResponce = await response[0].json();
        const forecastResponce = await response[1].json();
        
        setCurrentWeather({ city:searchData.label, ...weatherResponce });
        setForecast({ city:searchData.label, ...forecastResponce });

      })
      .catch(console.log);
  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChnage={handleonSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}



   
    </div>
  );
}

export default App;
