import axios from 'axios'

export default() => {
  const DB = axios.create({
    baseURL: 'http://localhost:8081'
  })
}
