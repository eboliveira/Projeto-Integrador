const axios = require('axios');

const DB = axios.create({
  baseURL: 'http://localhost:8081'
})
export {
  DB
}
