import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails'
import CountriesList from './components/CountriesList'

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
          <CountryDetails country={filteredCountries[0]} />
         : filteredCountries.length > 10 ? 
          <p>Too many matches, specify another filter</p> : 
            <CountriesList filteredCountries={filteredCountries} />      
      }

    </div>
  )
}

export default App