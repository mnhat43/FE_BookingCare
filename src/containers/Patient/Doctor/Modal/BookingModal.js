import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { lang } from 'moment';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointmentService } from "../../../../services/userService";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import moment from 'moment';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',

            genders: '',
            timeType: '',

        }
    }

    componentDidMount() {
        this.props.getGenderStart();
    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let { doctorId, timeType } = this.props.dataTime;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }
    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        //Validate input

        console.log("props>>>: ", this.props);
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = (await postPatientBookAppointmentService({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })).data

        console.log(res);
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!')
            this.props.closeBookingClose();
        } else {
            toast.error('Booking a new appointment error!')

        }
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        console.log(dataTime);
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI
                ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM / DD / YYYY');

            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;

        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
            return name;
        }
        return '';


    }

    render() {
        let { isOpenModal, closeBookingClose, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <Modal
                // isOpen={this.props.isOpen}
                isOpen={isOpenModal}
                // toggle={this.toggle()}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>
                        <span
                            className='right'
                            onClick={closeBookingClose}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                dataTime={dataTime}
                                isShowDescriptionDoctor={false}
                                isShowLinkDetail={false}
                                isShowPrice={true}

                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.fullName" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.fullName}
                                    onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                />


                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.phone" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.email" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.address" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                />                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.reason" />
                                </label>
                                <input
                                    className='form-control'
                                    value={this.state.reason}
                                    onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.birthday" />
                                </label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birthday}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id="patient.booking-modal.gender" />
                                </label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}

                                />
                            </div>
                        </div>

                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.confirm" />
                        </button>
                        <button className='btn-booking-cancel'
                            onClick={closeBookingClose}
                        >
                            <FormattedMessage id="patient.booking-modal.cancel" />
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
