import React, { useState } from 'react'
import CountryDetails from './CountryDetails'

const CountriesList = ({ filteredCountries }) => {

  const [showCountryData, setShowCountryData] = useState({})

  const handleShowCountry = (country) => {
    setShowCountryData(country)
  }

  if (!(Object.keys(showCountryData).length === 0)) {
    return <CountryDetails country={showCountryData} />
  } else {
    return (
      <>
        {
          filteredCountries.map(country => 
            <div key={country.name.official}>
              {country.name.common} 
              <button onClick={() => handleShowCountry(country)}>show</button> 
            </div>
          )
        }
      </>
    )
  }

}

export default CountriesList