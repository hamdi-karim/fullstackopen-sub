import React from 'react'
import CountryWeather from './CountryWeather'

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(
          ([key, value]) => <li key={key}>{value}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <CountryWeather capital={country.capital[0]} latlng={country.capitalInfo.latlng} />
    </div>
  )
}

export default CountryDetails