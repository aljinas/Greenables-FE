import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/'

export default() => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const HTTP = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export const FileUp = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
})
