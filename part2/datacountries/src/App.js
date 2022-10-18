import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect( () => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  } ,[])

  const filteredCountries = 
        countries.filter(country => country.name.common.toLowerCase().includes(filterText.toLowerCase()))

    // console.log("filteredCountries", filteredCountries)

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  // TODO: Refactor into child components

  return (
    <div>
      <div>
        find countries <input value={filterText} onChange={handleFilterChange} />
      </div>

      {
        filteredCountries.length === 1 ? 
          <div>
            <h1>{filteredCountries[0].name.common}</h1>
            <p>Capital: {filteredCountries[0].capital[0]}</p>
            <p>Area: {filteredCountries[0].area}</p>
            <h2>Languages</h2>
            <ul>
              {Object.entries(filteredCountries[0].languages).map(
                ([key, value]) => <li key={key}>{value}</li>
              )}
            </ul>
            <img src={filteredCountries[0].flags.png}  />
          </div>
         : filteredCountries.length > 10 ? 
          <p>Too many matches, specify another filter</p> : 
            filteredCountries.map(country => <div key={country.name.official}>{country.name.common}</div>)
      }
      {/* {!filterText && <p>Enter filter text to display coubtries</p>} */}


    </div>
  )
}

export default App