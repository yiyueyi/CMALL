import React, { Component } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import AppConstants from 'constants/AppConstants';
import Token from 'stores/Token';
import './style.scss'

const getToken = () => {
    const toekenState = JSON.parse(Token.getToken())
    return toekenState;
};

const tokenState = `Bearer ${getToken()}`

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class UploadImg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    handleChange = info => {
        // const {name, url} = result.data
        // console.log(url);
        // console.log(info)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            const result = info.file.response.info
            this.props.onUserImgUrl(result)
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => 
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleUrl = () => {
        return `${AppConstants.API_GATEWAY_URL}api/v1/common/file_upload`
    }

    getExtraData = file => {
        return {
            headers: {
                authorization: tokenState,
            }
        };
    };

    render() {

        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        return (
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={this.handleUrl}
                data={this.getExtraData}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}

export default UploadImg;