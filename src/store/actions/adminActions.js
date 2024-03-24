import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUserService,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctorsService, saveDetailDoctorService
} from '../../services/userService';
import { toast } from "react-toastify"

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = (await getAllCodeService("gender")).data;
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailded());
            }
        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('fetch Failed error', e);
        }
    }

}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailded = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })

            let res = (await getAllCodeService("position")).data;
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailded());
            }
        } catch (e) {
            dispatch(fetchPositionFailded());
            console.log('fetch Failed error', e);
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailded = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })

            let res = (await getAllCodeService("role")).data;
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailded());
            }
        } catch (e) {
            dispatch(fetchRoleFailded());
            console.log('fetch Failed error', e);
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailded = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
});


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = (await createNewUserService(data)).data;
            console.log("createNewUser", res);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed !");

                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createUserFailded());
            }
        } catch (e) {
            dispatch(createUserFailded());
            console.log('fetch Failed error', e);
        }
    }
};

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = (await getAllUserService("ALL")).data;
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailded());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailded());
            console.log('fetch Failed error', e);
        }
    }

}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailded = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED
});


export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = (await deleteUserService(userId)).data;
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed !");

                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFailded());
            }
        } catch (e) {
            toast.error("Delete the user error !");
            dispatch(deleteUserFailded());
            console.log('fetch Failed error', e);
        }
    }
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailded = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

export const editAUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = (await editUserService(user)).data;
            if (res && res.errCode === 0) {
                toast.success("Edit the user succeed !");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(editUserFailded());
            }
        } catch (e) {
            toast.error("Edit the user error !");
            dispatch(editUserFailded());
            console.log('fetch Failed error', e);
        }
    }
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailded = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = (await getTopDoctorHomeService("")).data;
            if (res && res.errCode === 0) {
                toast.success("Get Top Doctor succeed!");
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                toast.error("Get Top Doctor error!");
                dispatch(fetchTopDoctorFailded());
            }
        } catch (e) {
            toast.error("Get Top Doctor error!");
            dispatch(fetchTopDoctorFailded());
            console.log('fetch Failed error', e);
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: data
})

export const fetchTopDoctorFailded = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED
})

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = (await getAllDoctorsService()).data;
            if (res && res.errCode === 0) {
                toast.success("Get All Doctor succeed!");
                dispatch(fetchAllDoctorSuccess(res.data));
            } else {
                toast.error("Get All Doctor error!");
                dispatch(fetchAllDoctorFailded());
            }
        } catch (e) {
            toast.error("Get All Doctor error!");
            dispatch(fetchAllDoctorFailded());
            console.log('fetch Failed error', e);
        }
    }
}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: data
})

export const fetchAllDoctorFailded = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
})


export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = (await saveDetailDoctorService(data)).data;
            console.log("RESS>>>: ", res);
            if (res && res.errCode === 0) {
                toast.success("Save Infor Detail Doctor succeed!");
                dispatch(saveDetailDoctorSuccess());
            } else {
                toast.error("Save Infor Detail Doctor error!");
                dispatch(saveDetailDoctorFailded());
            }
        } catch (e) {
            toast.error("Save Infor Detail Doctor error!");
            dispatch(saveDetailDoctorFailded());
            console.log('fetch Failed error', e);
        }
    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
})

export const saveDetailDoctorFailded = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED
})


export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = (await getAllCodeService('TIME')).data;
            if (res && res.errCode === 0) {
                toast.success("Get All Schedule Time!");
                dispatch(fetchAllScheduleTimeSuccess(res.data));
            } else {
                toast.error("Get All Schedule error!");
                dispatch(fetchAllScheduleTimeFailded());
            }
        } catch (e) {
            toast.error("Get All Schedule error!");
            dispatch(fetchAllScheduleTimeFailded());
            console.log('fetch Failed error', e);
        }
    }
}

export const fetchAllScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataTime: data
})

export const fetchAllScheduleTimeFailded = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
})
