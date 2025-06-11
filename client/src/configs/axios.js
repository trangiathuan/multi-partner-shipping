import axios from 'axios'

// Khởi tạo instance
const axiosClient = axios.create({
    baseURL: 'http://localhost:8000', // tùy dự án
    timeout: 10000, // 10s
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptor: tự động gắn token vào mỗi request (nếu có)
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Interceptor: xử lý lỗi hoặc phản hồi chung
axiosClient.interceptors.response.use(
    (response) => response.data, // chỉ lấy phần `data` trong response
    (error) => {
        console.error('API error:', error?.response?.data || error.message)
        return Promise.reject(error)
    }
)

export default axiosClient
