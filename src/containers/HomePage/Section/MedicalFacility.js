import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinicService } from '../../../services/userService'
import { withRouter } from 'react-router-dom';
class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        }
    }

    async componentDidMount() {
        let res = (await getAllClinicService()).data;
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    }

    render() {
        let settings = this.props.settings;
        let { dataClinic } = this.state;
        return (
            <div className='section-medicalFacility'>
                <div className='medicalFacility-content'>
                    <span className='medicalFacility-titlte'>
                        Cơ sở y tế
                    </span>
                    <div className='medicalFacility-more'>
                        Xem thêm
                    </div>
                    <Slider {...settings}>
                        {
                            dataClinic && dataClinic.length > 0 &&
                            dataClinic.map((item, index) => {
                                return (
                                    <div className='medicalFacility-item' key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}

                                    >
                                        <div className='item-container'>
                                            <div className='item-img'>
                                                <img src={item.image} />
                                            </div>
                                            <div className='item-text'>{item.name}</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
