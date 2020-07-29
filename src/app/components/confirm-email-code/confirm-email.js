import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isEmpty from '../../validation/is-empty';

class VerifyEmailCode extends Component {
  constructor(props) {
    super(props);
    this.state = {code: '', formError: ''};
  }

  componentWillReceiveProps = (nextProps) => {
    if (!isEmpty(nextProps.errors)) {
      this.props.hideEmailModal();
    }
  };

  handleCode = (e) => {
    this.setState({code: e.target.value});
  };

  handleSubmit = (e) => {
    this.props.onSubmit(this.state.code);
  };

  render() {
    return (
      <>
        <div onClick={() => this.props.hideEmailModal()} className="curtain">
          <div onClick={(e) => e.stopPropagation()} className="box-modal">
            <div className="box-modal-header">
              <h3>Enter Email verification code</h3>
            </div>
            <div className="box-modal-body">
              <div className="transfer-form">
                <div className="transfer-form-field">
                  <input
                    placeholder={'Enter Email verification code'}
                    style={{width: '100%'}}
                    type="text"
                    onInput={this.handleCode}
                  />
                  <span className="transfer-form-field-error">
                    {this.state.error}
                  </span>
                </div>

                <div className="transfer-center-button">
                  <button
                    onClick={this.handleSubmit}
                    className="form-btn yellow send-button-modal"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

VerifyEmailCode.propTypes = {
  hideEmailModal: PropTypes.func.isRequired,
};

const mapStatesToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStatesToProps, {})(VerifyEmailCode);
