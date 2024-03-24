import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctorService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = (await getDetailInforDoctorService(id)).data;
            this.setState({
                detailDoctor: res.data,
            })

            // imageBase64 = new Buffer(user.image, 'base64').toString('binary');


        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        console.log("state>>>: ", this.state);
        let { language } = this.props;
        let { detailDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi},  ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            < >
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='infor-doctor'>
                        <div className='content-left'>
                            <img src={`${detailDoctor.image}`} alt="Image" />
                        </div>
                        <div className='content-right'>
                            <div className='title-infor'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='more-infor'>
                                {
                                    detailDoctor.Markdown
                                    && detailDoctor.Markdown.description
                                    &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule doctorId={this.state.currentDoctorId} />
                        </div>
                        <div className='content-right'>

                        </div>

                    </div>
                    <div className='detail-infor-doctor'>
                        <div className='detail-content'>
                            {
                                detailDoctor
                                && detailDoctor.Markdown
                                && detailDoctor.Markdown.contentHTML
                                &&
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                                </div>
                            }
                        </div>

                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
