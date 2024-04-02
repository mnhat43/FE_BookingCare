import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { createNewSpecialtyService } from '../../../services/userService'
import { toast } from "react-toastify"

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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

    handleSaveNewSpecialty = async () => {
        let res = (await createNewSpecialtyService(this.state)).data;
        if (res && res.errCode === 0) {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
            toast.success('Add new specialty succeed!');
        } else {
            toast.error('Add new specialty error!');
            console.log(res);
        }
    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>
                    Quản lý chuyên khoa
                </div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnchangeImage(event)}

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
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
