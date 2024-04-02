import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyByIdService, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';


class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = (await getDetailSpecialtyByIdService({
                id: id,
                location: 'ALL'
            })).data;

            let resProvince = (await getAllCodeService('PROVINCE')).data;

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    let arrDoctorId = [];
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }

                    let dataProvince = resProvince.data;
                    if (dataProvince && dataProvince.length > 0) {
                        dataProvince.unshift({
                            // createdAt: null,
                            keyMap: 'ALL',
                            type: 'PROVINCE',
                            valueEn: 'All',
                            valueVi: 'Toàn quốc',
                        });
                    }
                    console.log(dataProvince);
                    this.setState({
                        dataDetailSpecialty: res.data,
                        arrDoctorId: arrDoctorId,
                        listProvince: dataProvince ? dataProvince : []
                    })
                }

            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = (await getDetailSpecialtyByIdService({
                id: id,
                location: location
            })).data;

            if (res && res.errCode === 0) {
                let data = res.data;
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    let arrDoctorId = [];
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                    this.setState({
                        dataDetailSpecialty: res.data,
                        arrDoctorId: arrDoctorId,
                    })
                }

            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        console.log(listProvince, language);
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='description-specialty'>
                    <div className='title-specialty'>
                        {dataDetailSpecialty.name}
                    </div>
                    <div className='content-description'>

                        {
                            dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>

                            </div>
                        }
                    </div>
                </div>
                <div className='each-doctor'>
                    <div className='content-each-doctor'>
                        <div className='select-province'>
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                {
                                    listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {
                                                    language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                                }
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {
                            arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='specialty-content' key={index}>
                                        <div className='specialty-content-left'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                // dataTime={dataTime}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                        <div className='specialty-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorId={item}
                                                />
                                            </div>
                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfor
                                                    doctorId={item}
                                                />
                                            </div>



                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>

                </div>
            </div>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
