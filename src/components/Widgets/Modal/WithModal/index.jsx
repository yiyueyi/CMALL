import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Modal as AntModal } from 'antd';
import './style.scss';

const WithModal = ({
                       title = '',
                       className = '',
                       width = 300,
                       visible = false,
                       zIndex = 1000,
                       modalProps = {},
                       header = true,
                       footer = true,
                       closeButton = true,
                       maskClosable = true,
                       destroyOnClose = false
                   }) => {
    return (WrapperComponent) => {

        class WithModal extends React.Component {

            constructor(props) {
                super(props);
                this.state = {
                    title: title,
                    visible: visible,
                    loading: false,
                    modalProps: modalProps || {},
                    wrapperComponent: {}
                };
            }

            show = () => {
                this.wrapperComponent && this.wrapperComponent.onShow && this.wrapperComponent.onShow();
                this.setState({
                    visible: true
                });
            };

            closeModal = () => {
                this.setState({
                    visible: false
                });
            };

            handleClose = async () => {
                const { loading, modalProps: { closable } } = this.state;
                if (loading && _.isUndefined(closable)) {
                    return;
                }
                let ret = this.wrapperComponent.onClose && await this.wrapperComponent.onClose();
                if (false === ret) {
                    return;
                }
                this.closeModal();
            };

            handleOk = async () => {
                if (this.state.loading) {
                    return;
                }
                const ret = this.wrapperComponent.onOk && await this.wrapperComponent.onOk();
                if (false === ret) {
                    return;
                }
                this.closeModal();
            };

            getInstance = (wrapperComponent) => {
                this.wrapperComponent = wrapperComponent;
            };

            setTitle = (title) => {
                this.setState({
                    title: title
                });
            };

            setLoading = (loading) => {
                this.setState({ loading: loading });
            };

            setModalProps = (newModalProps) => {
                let { modalProps } = this.state;
                modalProps = _.assign({}, modalProps, newModalProps);
                this.setState({
                    modalProps: modalProps
                });
            };

            render() {
                const { modalProps, title, visible, loading } = this.state;
                const props = _.assign({}, {
                    className,
                    width,
                    zIndex,
                    maskClosable,
                    destroyOnClose
                }, modalProps);
                if (!footer) {
                    props.footer = null;
                }
                const styles = classNames({
                    'no-header': header === null,
                    'close-disabled': closeButton === null
                });
                return (
                    (visible
                        ?
                        <AntModal wrapClassName={styles}
                                  {...props}
                                  title={title}
                                  visible={visible}
								  closable={_.isUndefined(props.closable) ? !loading : props.closable && !loading}
                                  cancelText={loading ? null : '取消'}
                                  confirmLoading={loading}
                                  onCancel={this.handleClose}
                                  onOk={this.handleOk}>
                            <WrapperComponent {...this.props}
                                              getInstance={(instance) => this.getInstance(instance)}
                                              setTitle={(title) => this.setTitle(title)}
                                              setLoading={(loading) => this.setLoading(loading)}
                                              setModalProps={(modalProps) => this.setModalProps(modalProps)}
                                              closeModal={() => this.handleClose()}
                                              showModal={() => this.show()}/>
                        </AntModal>
                        :
                        null)
                );
            }
        }

        return WithModal;
    };
};

export default WithModal;
