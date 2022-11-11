/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = '/api/login'

const login = async(credentitals) => {
  const res = await axios.post(baseUrl, credentitals)
  return res.data
}

export default { login }