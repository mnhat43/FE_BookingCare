import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
import { values } from 'lodash';
import moment from 'moment';
import { getExtraInforDoctorByIdService } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {},
        }
    }

    async componentDidMount() {
        if (this.props.doctorId) {
            let res = (await getExtraInforDoctorByIdService(this.props.doctorId)).data;
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let res = (await getExtraInforDoctorByIdService(this.props.doctorId)).data;
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { language } = this.props;
        let { isShowDetailInfor, extraInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='title-address'>
                        <FormattedMessage id="patient.extra-infor-doctor.title-address" />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {
                        isShowDetailInfor ?
                            <>
                                <div className='title-price'>
                                    <span>
                                        <FormattedMessage id="patient.extra-infor-doctor.title-price" />
                                        :
                                    </span>
                                </div>
                                <div className='detail-price'>
                                    <div className='content-up'>
                                        <div className='detail-left'>
                                            <div className='up'><FormattedMessage id="patient.extra-infor-doctor.title-price" /></div>
                                            <div className='down'>
                                                {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                            </div>
                                        </div>
                                        <div className='detail-right'>
                                            {
                                                extraInfor && extraInfor.priceTypeData
                                                && language === LANGUAGES.VI
                                                &&
                                                < NumberFormat
                                                    value={extraInfor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix='VNĐ'
                                                />
                                            }

                                            {
                                                extraInfor && extraInfor.priceTypeData
                                                && language === LANGUAGES.EN
                                                &&
                                                < NumberFormat
                                                    value={extraInfor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix='$'
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className='content-down'>
                                        <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                        {
                                            extraInfor && extraInfor.paymentTypeData
                                                && language === LANGUAGES.VI
                                                ?
                                                extraInfor.paymentTypeData.valueVi : ''
                                        }
                                        {
                                            extraInfor && extraInfor.paymentTypeData
                                                && language === LANGUAGES.EN
                                                ?
                                                extraInfor.paymentTypeData.valueEn : ''
                                        }

                                    </div>
                                </div>

                                <span
                                    className='hidden-price'
                                    onClick={() => this.showHideDetailInfor(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.hide" />
                                </span>
                            </>
                            :
                            <div>

                                <span className='title-price'>
                                    <span>
                                        <FormattedMessage id="patient.extra-infor-doctor.title-price" />
                                        :
                                    </span>
                                    {
                                        extraInfor && extraInfor.priceTypeData
                                        && language === LANGUAGES.VI
                                        &&
                                        < NumberFormat
                                            value={extraInfor.priceTypeData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix='VNĐ'
                                        />
                                    }

                                    {
                                        extraInfor && extraInfor.priceTypeData
                                        && language === LANGUAGES.EN
                                        &&
                                        < NumberFormat
                                            value={extraInfor.priceTypeData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix='$'
                                        />
                                    }

                                </span>
                                <span
                                    className='show-price'
                                    onClick={() => this.showHideDetailInfor(true)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.detail" />

                                </span>
                            </div>
                    }


                </div>
            </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
