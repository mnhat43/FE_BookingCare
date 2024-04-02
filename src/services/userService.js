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

const getExtraInforDoctorByIdService = (doctorId) => {
    return axios.get(`${config.api.API_BASE_URL}api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorByIdIdService = (doctorId) => {
    return axios.get(`${config.api.API_BASE_URL}api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBookAppointmentService = (data) => {
    return axios.post(`${config.api.API_BASE_URL}api/patient-book-appointment`, data);
}

const postVerifyBookAppoimentService = (data) => {
    return axios.post(`${config.api.API_BASE_URL}api/verify-book-appointment`, data);
}

const createNewSpecialtyService = (data) => {
    return axios.post(`${config.api.API_BASE_URL}api/create-new-specialty`, data);
}

const getAllSpecialtyService = () => {
    return axios.get(`${config.api.API_BASE_URL}api/get-all-specialty`);
}

const getDetailSpecialtyByIdService = (data) => {
    return axios.get(`${config.api.API_BASE_URL}api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createNewClinicService = (data) => {
    return axios.post(`${config.api.API_BASE_URL}api/create-new-clinic`, data);
}


const getAllClinicService = () => {
    return axios.get(`${config.api.API_BASE_URL}api/get-all-clinic`);
}

const getDetailClinicByIdService = (data) => {
    return axios.get(`${config.api.API_BASE_URL}api/get-detail-clinic-by-id?id=${data.id}`);
}

const getListPatientForDoctorService = (data) => {
    return axios.get(`${config.api.API_BASE_URL}api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const sendRemedyService = (data) => {
    return axios.post(`${config.api.API_BASE_URL}api/send-remedy`, data);
}

export {
    handleLoginAPI, getAllUserService, createNewUserService, deleteUserService, editUserService,
    getAllCodeService, getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorService,
    getDetailInforDoctorService, saveBulkScheduleDoctorService, getScheduleByDateService, getExtraInforDoctorByIdService,
    getProfileDoctorByIdIdService, postPatientBookAppointmentService, postVerifyBookAppoimentService,
    createNewSpecialtyService, getAllSpecialtyService, getDetailSpecialtyByIdService,
    createNewClinicService, getAllClinicService, getDetailClinicByIdService, getListPatientForDoctorService,
    sendRemedyService,
};