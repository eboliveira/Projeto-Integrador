import axios from 'axios'

const base = 'http://localhost:8081'

export const DB = axios.create({
  baseURL: base
})

export const equipments = axios.create({
  baseURL: base + '/equipments/'
})

export const events = axios.create({
  baseURL: base + '/events/'
})

export const rooms = axios.create({
  baseURL: base + '/room/'
})

export const actions = axios.create({
  baseURL: base + '/actions/'
})

export const lessons = axios.create({
  baseURL: base + '/lesson/'
})
