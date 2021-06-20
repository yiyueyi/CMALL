import React, { Component } from 'react';
import Modal from 'components/Widgets/Modal/WithModal';


class ModifyUserInformationModul extends Component {

    constructor(props) {
        super(props);
        this.props.getInstance(this);
        this.state = {
        }
    }

    componentDidMount = () => {
        const { onPersonalInformation } = this.props;
        console.log(onPersonalInformation);
    }

    render() {

        return (
            <div>
                111
            </div>
        );
    }
}

export default Modal({ title: '查看详情', width: 800, maskClosable: false, footer: null, modalProps: { centered: true } })(ModifyUserInformationModul);