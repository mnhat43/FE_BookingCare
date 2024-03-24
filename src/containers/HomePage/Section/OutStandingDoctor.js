import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './OutStandingDoctor.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router-dom';


class OutStandingDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`detail-doctor/${doctor.id}`);
    }

    render() {
        let settings = this.props.settings;
        settings.slidesToShow = 4;
        settings.slidesToScroll = 4;

        let language = this.props.language;

        let arrDoctors = this.state.arrDoctors;
        return (
            <div className='section-outStandingDoctor' >
                <div className='outStandingDoctor-content'>
                    <span className='outStandingDoctor-titlte'>
                        <FormattedMessage id="homepage.outstanding-doctor" />
                    </span>
                    <div className='outStandingDoctor-more'>
                        <FormattedMessage id="homepage.more-infor" />

                    </div>
                    <Slider {...settings}>
                        {arrDoctors && arrDoctors.length > 0 &&
                            arrDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }

                                let nameVi = `${item.positionData.valueVi},  ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                                return (
                                    <div className='outStandingDoctor-item' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='item-container'>
                                            <div className='item-img'>
                                                <img src={`${imageBase64}`} alt="Image" />
                                            </div>
                                            <div className='item-text'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div className='item-subtext'>Bệnh viêm gan</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
