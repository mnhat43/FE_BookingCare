import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { getListPatientForDoctorService, sendRemedyService } from '../../../services/userService';
import { isTypeNode } from 'typescript';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay';


class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = (await getListPatientForDoctorService({
            doctorId: user.id,
            date: formatedDate
        })).data;

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataFormModal) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = (await sendRemedyService({
            email: dataFormModal.email,
            imgBase64: dataFormModal.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            patientName: dataFormModal.patientName,
            language: this.props.language
        })).data;

        if (res && res.errCode === 0) {
            toast.success(res.errMessage);
            await this.getDataPatient();
            this.closeRemedyModal();
            this.setState({
                isShowLoading: false
            })
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error(res.errMessage);
        }

    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }}>
                                    <tbody >
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Giới tính</th>
                                            <th>Action</th>
                                        </tr>
                                        {
                                            dataPatient && dataPatient.length > 0
                                                ?
                                                dataPatient.map((item, index) => {
                                                    let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                    let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{time}</td>
                                                            <td>{item.patientData.firstName}</td>
                                                            <td>{item.patientData.address}</td>
                                                            <td>{gender}</td>
                                                            <td>
                                                                <button
                                                                    className='mp-btn-confirm'
                                                                    onClick={() => this.handleBtnConfirm(item)}
                                                                >
                                                                    Xác nhận
                                                                </button>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :
                                                <tr>
                                                    <td colSpan={6}>No Data</td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div >
                    </div >

                    <RemedyModal
                        isOpenRemedyModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />


                </LoadingOverlay>
            </>

        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
