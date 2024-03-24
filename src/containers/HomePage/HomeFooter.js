import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HomeFooter extends Component {

    render() {
        return (
            <div className='home-footer'>
                <p>
                    &copy; 2024 Dao Minh Nhat
                    <a target='_blank' href='https://www.facebook.com/profile.php?id=100010687030178'>
                        &#8594; Click here &#8592;
                    </a>
                </p>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
