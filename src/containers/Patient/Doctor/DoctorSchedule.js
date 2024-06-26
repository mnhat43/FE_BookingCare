import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import { values } from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleByDateService } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalabelTime: [],
            isOpenModalBooking: false,
            dataTime: {},
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                // object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }


            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        return allDays;
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);

        if (this.props.doctorId) {
            let res = (await getScheduleByDateService(this.props.doctorId, allDays[0].value)).data;

            this.setState({
                allAvalabelTime: res.data ? res.data : []
            })
        }

        this.setState({
            allDays: allDays,
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.getArrDays(this.props.language);
            let res = (await getScheduleByDateService(this.props.doctorId, allDays[0].value)).data;

            this.setState({
                allAvalabelTime: res.data ? res.data : []
            })
        }

    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId;
            let date = event.target.value;
            let res = (await getScheduleByDateService(doctorId, date)).data;

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalabelTime: res.data ? res.data : []
                })
            }

        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataTime: time
        })
    }

    closeBookingClose = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvalabelTime, isOpenModalBooking, dataTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {
                                allDays && allDays.length > 0
                                && allDays.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })
                            }

                        </select>

                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span>
                                <i className='fas fa-calendar-alt'></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className='time-content'>
                            {
                                allAvalabelTime && allAvalabelTime.length > 0
                                    ?
                                    <>
                                        <div className='time-content-btns'>
                                            {
                                                allAvalabelTime.map((item, index) => {
                                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                                    return (
                                                        <button
                                                            key={index}
                                                            className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                            onClick={() => this.handleClickScheduleTime(item)}
                                                        >
                                                            {timeDisplay}
                                                        </button>

                                                    )
                                                })
                                            }
                                        </div>


                                        <div className='book-free'>
                                            <span>
                                                <FormattedMessage id="patient.detail-doctor.choose" />

                                                <i className='far fa-hand-point-up'></i>
                                                <FormattedMessage id="patient.detail-doctor.book-free" />
                                            </span>
                                        </div>
                                    </>
                                    :
                                    <div className='no-schedule'>
                                        <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                    </div>

                            }
                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    dataTime={dataTime}
                    closeBookingClose={this.closeBookingClose}
                />
            </>



        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
