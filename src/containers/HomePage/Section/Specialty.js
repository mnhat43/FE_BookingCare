import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {

    render() {
        let settings = this.props.settings;

        return (
            <div className='section-specialty'>
                <div className='specialty-content'>
                    <span className='specialty-titlte'>
                        Chuyên khoa
                    </span>
                    <div className='specialty-more'>
                        Xem thêm
                    </div>
                    <Slider {...settings}>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2023/12/26/101627-co-xuong-khop.png" />
                                </div>
                                <div className='item-text'>Cơ Xương Khớp</div>

                            </div>
                        </div>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2023/12/26/101739-than-kinh.png" />
                                </div>
                                <div className='item-text'>Thần kinh</div>

                            </div>
                        </div>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2023/12/26/101713-tieu-hoa.png" />
                                </div>
                                <div className='item-text'>Tiêu hóa</div>

                            </div>
                        </div>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2023/12/26/101713-tim-mach.png" />
                                </div>
                                <div className='item-text'>Tim mạch</div>

                            </div>
                        </div>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2023/12/26/101713-tai-mui-hong.png" />
                                </div>
                                <div className='item-text'>Tai mũi họng</div>

                            </div>
                        </div>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2023/12/26/101627-cot-song.png" />
                                </div>
                                <div className='item-text'>Cột sống</div>

                            </div>
                        </div>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2023/12/26/101739-y-hoc-co-truyen.png" />
                                </div>
                                <div className='item-text'>Y học cổ truyền</div>

                            </div>
                        </div>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2023/12/26/101627-cham-cuu.png" />
                                </div>
                                <div className='item-text'>Châm cứu</div>

                            </div>
                        </div>
                        <div className='specialty-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2023/12/26/101713-san-phu-khoa.png" />
                                </div>
                                <div className='item-text'>Sản phụ khoa</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
