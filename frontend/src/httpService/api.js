import axios from 'axios'
// import Cookies from 'js-cookie'

export default axios.create({
  baseURL: '/api',
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json',
  }
});

