import React from 'react'

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
    </div>
  )
}

export default CountryDetails