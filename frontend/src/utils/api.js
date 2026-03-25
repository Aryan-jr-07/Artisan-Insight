import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : '/api',
  timeout: 15000,
})

api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err.response?.data || err)
)

export const getDashboard = (params = {}) => api.get('/dashboard', { params })
export const getASI = () => api.get('/asi')
export const getASIState = (state) => api.get(`/asi/${encodeURIComponent(state)}`)
export const getInsights = () => api.get('/insights')
export const getStates = () => api.get('/data/states')
export const getYears = () => api.get('/data/years')
export const getAllData = (params = {}) => api.get('/data', { params })
export const loadSampleData = () => api.post('/data/load-sample')
export const deleteAllData = () => api.delete('/data')
export const uploadFile = (formData) =>
  api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const healthCheck = () => api.get('/health')

export default api
