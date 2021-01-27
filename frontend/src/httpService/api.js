import axios from 'axios'
// import Cookies from 'js-cookie'

export default axios.create({
  // baseURL: process.env.VUE_APP_API_URL,
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  }
});
