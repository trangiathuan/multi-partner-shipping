import React from 'react'
import axiosClient from '../configs/axios'

export const loginAPI = async (email, password) => {
    const response = await axiosClient.post('/api/auth/login', { email, password });

    return response;
}

