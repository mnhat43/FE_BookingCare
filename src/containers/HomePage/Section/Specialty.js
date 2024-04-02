import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialtyService } from '../../../services/userService';
import { withRouter } from 'react-router-dom';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = (await getAllSpecialtyService()).data;
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }

    handleViewDetailSpecially = (item) => {
        this.props.history.push(`detail-specialty/${item.id}`);
    }

    render() {
        let settings = { ...this.props.settings };
        let { dataSpecialty } = this.state;
        return (
            <div className='section-specialty'>
                <div className='specialty-content'>
                    <span className='specialty-titlte'>
                        <FormattedMessage id="homepage.specialty-popular" />
                    </span>
                    <div className='specialty-more'>
                        <FormattedMessage id="homepage.more-infor" />

                    </div>
                    <Slider {...settings}>
                        {
                            dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                return (
                                    <div className='specialty-item' key={index} onClick={() => this.handleViewDetailSpecially(item)}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
