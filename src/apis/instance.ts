import axios from 'axios'

const BASE_URL = 'https://wanted-pre-onboarding-frontend-4-json-server.vercel.app/'

export const Instance = axios.create({ baseURL: BASE_URL })
