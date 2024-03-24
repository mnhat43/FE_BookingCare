import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HandBook.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HandBook extends Component {

    render() {
        let settings = this.props.settings;
        settings.slidesToShow = 4;
        settings.slidesToScroll = 4;
        return (
            <div className='section-handBook'>
                <div className='handBook-content'>
                    <span className='handBook-titlte'>
                        Cẩm nang
                    </span>
                    <div className='handBook-more'>
                        Xem thêm
                    </div>
                    <Slider {...settings}>
                        <div className='handBook-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2024/02/27/135004-trong-rang-implant-all-on-6.png" />
                                </div>
                                <div className='item-text'>Trồng răng Implant All on 6 giá bao nhiêu? Bảng giá tại 5 địa chỉ nha khoa uy tín ở Hà Nội</div>

                            </div>
                        </div>
                        <div className='handBook-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2024/02/27/135004-trong-rang-implant-all-on-6.png" />
                                </div>
                                <div className='item-text'>Trồng răng Implant All on 6 giá bao nhiêu? Bảng giá tại 5 địa chỉ nha khoa uy tín ở Hà Nội</div>

                            </div>
                        </div>
                        <div className='handBook-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2024/02/27/135004-trong-rang-implant-all-on-6.png" />
                                </div>
                                <div className='item-text'>Trồng răng Implant All on 6 giá bao nhiêu? Bảng giá tại 5 địa chỉ nha khoa uy tín ở Hà Nội</div>

                            </div>
                        </div>
                        <div className='handBook-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2024/02/27/135004-trong-rang-implant-all-on-6.png" />
                                </div>
                                <div className='item-text'>Trồng răng Implant All on 6 giá bao nhiêu? Bảng giá tại 5 địa chỉ nha khoa uy tín ở Hà Nội</div>

                            </div>
                        </div>
                        <div className='handBook-item'>
                            <div className='item-container'>
                                <div className='item-img'>
                                    <img src="https://cdn.bookingcare.vn/fo/w640/2024/02/27/135004-trong-rang-implant-all-on-6.png" />
                                </div>
                                <div className='item-text'>Trồng răng Implant All on 6 giá bao nhiêu? Bảng giá tại 5 địa chỉ nha khoa uy tín ở Hà Nội</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
