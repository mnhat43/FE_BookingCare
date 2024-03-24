import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './About.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class About extends Component {

    render() {
        return (
            <div className='section-about'>
                <div className='section-about-container'>
                    <div className='about-header'>
                        Truyền thông nói về BookingCare
                    </div>
                    <div className='about-content'>
                        <div className='about-left'>
                            <iframe
                                width={640}
                                height={360}
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title='YouTube video player'
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                        </div>
                        <div className='about-right'>
                            <a href=''><img src='https://bookingcare.vn/assets/truyenthong/vtv1.png' /></a>
                            <a href=''><img src='https://bookingcare.vn/assets/truyenthong/vtv1.png' /></a>
                            <a href=''><img src='https://bookingcare.vn/assets/truyenthong/vtv1.png' /></a>
                            <a href=''><img src='https://bookingcare.vn/assets/truyenthong/vtv1.png' /></a>
                            <a href=''><img src='https://bookingcare.vn/assets/truyenthong/vtv1.png' /></a>
                            <a href=''><img src='https://bookingcare.vn/assets/truyenthong/vtv1.png' /></a>
                            <a href=''><img src='https://bookingcare.vn/assets/truyenthong/vtv1.png' /></a>
                            <a href=''><img src='https://bookingcare.vn/assets/truyenthong/vtv1.png' /></a>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
