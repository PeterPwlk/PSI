import api from './api.js'

const GET = (url, params) =>{
    return api.get(url, { params })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw error.response.data
        })
};

const POST = (url, body) =>{
    return api.post(url, body)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            throw error.response.data
        })
};

export const login = (code) => {
    return GET( '/auth/token', { code });
};

export const logout = () => {
    return GET('/logout');
};
