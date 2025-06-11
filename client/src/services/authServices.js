import loginAPI from '../api/authAPI'

export const loginService = async (formData) => {
    const { email, password } = formData
    const response = await loginAPI(email, password);
    localStorage.setItem('token', response.data.access_token)

    return response;
}
