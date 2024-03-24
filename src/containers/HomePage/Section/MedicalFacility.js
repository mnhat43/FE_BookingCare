import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class MedicalFacility extends Component {

    render() {
        let settings = this.props.settings;
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
                        <div className='medicalFacility-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2018/06/18/113555logo-benh-vien-bao-son.jpg" />
                                </div>
                                <div className='item-text'>Bệnh viện Đa khoa Bảo Sơn 2</div>

                            </div>
                        </div>
                        <div className='medicalFacility-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2018/06/18/143606logo-phong-kham-viet-life.png" />
                                </div>
                                <div className='item-text'>Phòng khám Vietlife MRI Trần Bình Trọng</div>

                            </div>
                        </div>
                        <div className='medicalFacility-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2022/05/12/101707-logo-sg.png" />
                                </div>
                                <div className='item-text'>Phòng khám Đa khoa Saigon Healthcare</div>

                            </div>
                        </div>
                        <div className='medicalFacility-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2018/07/02/175558benh-vien-lao-khoa-lo-go-1.jpeg" />
                                </div>
                                <div className='item-text'>Bệnh viện Lão khoa Trung ương</div>

                            </div>
                        </div>
                        <div className='medicalFacility-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2018/05/11/181208mediteclogo.jpeg" />
                                </div>
                                <div className='item-text'>Phòng khám Đa khoa Meditec</div>

                            </div>
                        </div>
                        <div className='medicalFacility-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2022/05/09/162239-logo-sto.jpg" />
                                </div>
                                <div className='item-text'>Bệnh viện STO Phương Đông</div>

                            </div>
                        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
