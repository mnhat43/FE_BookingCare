import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { createNewClinicService } from '../../../services/userService'
import { toast } from "react-toastify"

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        });
    }

    handleOnchangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // let objectUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64,
            })
        }
    }

    handleSaveNewClinic = async () => {
        let res = (await createNewClinicService(this.state)).data;
        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
            toast.success('Add new clinic succeed!');
        } else {
            toast.error('Add new clinic error!');
            console.log(res);
        }
    }

    render() {
        return (
            <div className='manage-clinic-container'>
                <div className='ms-title'>
                    Quản lý phòng khám
                </div>

                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnchangeImage(event)}

                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}

                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-clinic'
                            onClick={() => this.handleSaveNewClinic()}
                        >Save</button>
                    </div>

                </div>


            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
