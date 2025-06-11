import React from 'react'
import axiosClient from '../configs/axios'

const loginAPI = async (email, password) => {
    const response = await axiosClient.post('/api/auth/login', { email, password });
    return response;
}

export default loginAPI