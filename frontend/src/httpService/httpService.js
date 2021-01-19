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


let PATCH = (url, body) =>{
    return api.patch(url, body)
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

export const getSchedule = (id) => GET(`/lecture-schedule${id>=0 ? `/${id}` : ''}`);

export const getClassroom = (params) => GET(`/class-room${params ? '/filter' : ''}`, params);

export const getFaculty = (id) => GET(`/faculty${ id>=0 ? `/${id}` : '' }`);

export const getLecture = (id) => GET(`/lecture${ id>=0 ? `/${id}`: '' }`);

export const getTutor = (params) => GET(`/tutor${params ? '/filter': ''}`, params);

export const addLectureTime = (id, body) => PATCH(`lecture/edit/lectureTime/${id || ''}`, body);

export const addLectureTutor = (lectureId, body) => PATCH(`lecture/edit/tutor/${lectureId || ''}`, body);
