import api from './api.js'
import * as statusCodes from './statusCodes'

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
    return GET('/auth/token', { code });
};

export const logout = () => {
    return GET('/auth/logout');
};

export const ping = () => {
    return GET('/');
};

export const getSchedules = () => {
    return GET('/lecture-schedule')
};
