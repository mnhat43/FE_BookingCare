import axios from "axios";
import config from "../config";

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post(`${config.api.API_BASE_URL}api/login`, { email: userEmail, password: userPassword });

}

const getAllUserService = (inputId) => {
    return axios.get(`${config.api.API_BASE_URL}api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => {
    return axios.post(`${config.api.API_BASE_URL}api/create-new-user`, data);
}

const deleteUserService = (inputId) => {
    return axios.delete(`${config.api.API_BASE_URL}api/delete-user?id=${inputId}`);
}

const editUserService = (data) => {
    return axios.put(`${config.api.API_BASE_URL}api/edit-user`, data);
}

const getAllCodeService = (inputType) => {
    return axios.get(`${config.api.API_BASE_URL}api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`${config.api.API_BASE_URL}api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get(`${config.api.API_BASE_URL}api/get-all-doctors`);
}

const saveDetailDoctorService = (data) => {
    return axios.post(`${config.api.API_BASE_URL}api/save-infor-doctors`, data);
}

const getDetailInforDoctorService = (id) => {
    return axios.get(`${config.api.API_BASE_URL}api/get-detail-doctor-by-id?id=${id}`);
}

const saveBulkScheduleDoctorService = (data) => {
    return axios.post(`${config.api.API_BASE_URL}api/bulk-create-schedule`, data);
}

const getScheduleByDateService = (doctorId, date) => {
    return axios.get(`${config.api.API_BASE_URL}api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

export {
    handleLoginAPI,
    getAllUserService,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
    getDetailInforDoctorService,
    saveBulkScheduleDoctorService,
    getScheduleByDateService
};