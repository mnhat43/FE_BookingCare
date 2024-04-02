import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicByIdService, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';


class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = (await getDetailClinicByIdService({
                id: id,
            })).data;

            if (res && res.errCode === 0) {
                let data = res.data;
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    let arrDoctorId = [];
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }

                    this.setState({
                        dataDetailClinic: res.data,
                        arrDoctorId: arrDoctorId,
                    })
                }
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;
        console.log(dataDetailClinic);
        return (
            <div className='detail-clinic-container'>
                <HomeHeader />
                <div className='description-clinic'>
                    <div className='title-clinic'>
                        <div className='logo-clinic'>
                            <img src={`${dataDetailClinic.image}`} />
                        </div>
                        <div className='infor-clinic'>
                            <div className='name-clinic'>
                                {dataDetailClinic.name}
                            </div>
                            <div className='address-clinic'>
                                {dataDetailClinic.address}
                            </div>
                        </div>
                    </div>

                    <div className='content-description'>
                        <div className='title-content'>Giới thiệu chung</div>
                        {
                            dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>

                            </div>
                        }
                    </div>
                </div>
                <div className='each-doctor'>
                    <div className='content-each-doctor'>
                        {
                            arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='clinic-content' key={index}>
                                        <div className='clinic-content-left'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                // dataTime={dataTime}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                        <div className='clinic-content-right'>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
