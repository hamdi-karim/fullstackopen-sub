import React, {useEffect, useState} from 'react'
import axios from 'axios'

const apikey = process.env.REACT_APP_OPEN_MAP_API_KEY

const CountryWeather = ({ capital, latlng }) => {

   const [currentCountryWeather, setCurrentCountryWeather] = useState({})

  useEffect(() => {
    axios.get
      (`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apikey}&units=metric`)
      .then( response =>
        setCurrentCountryWeather(response.data)
      )
  }, [])
  

  if (Object.keys(currentCountryWeather).length === 0 ) {
    return <div>Content Loading ...</div>
  }
  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>Temperature {currentCountryWeather.main.temp} Celcius </p>
      {currentCountryWeather.weather.map(weatherData => 
        <img 
          key={weatherData.id} 
          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} 
          alt={`${capital} weather`}
        />
      )}
      <p>Wind {currentCountryWeather.wind.speed} m/s</p>
    </div>
  )
}

export default CountryWeather