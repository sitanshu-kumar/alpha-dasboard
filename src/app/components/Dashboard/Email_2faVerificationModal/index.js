import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setMFAAuthentication} from '../../../redux/actions/authActions';
import {BaseApiUrl} from '../../../redux/config';
import axios from 'axios';

class Email2faVerificationModel extends Component {
  constructor(props) {
    super(props);
    this.state = {googleAuthCode, emailcode: '', error: ''};
  }

  handleCode = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    this.check2FA();
  };

  check2FA = () => {};

  render() {
    console.log('profile', this.props.profile);
    return (
      <>
        <div onClick={() => this.props.hideMFAModal()} className="curtain">
          <div onClick={(e) => e.stopPropagation()} className="box-modal">
            <div className="box-modal-header">
              <h3>Enter 2FA code</h3>
            </div>
            <div className="box-modal-body">
              <div className="transfer-form">
                <div className="transfer-form-field">
                  <h3>Enter Email Verification code</h3>
                  <input
                    name="emailcode"
                    value={this.state.emailcode}
                    placeholder={'Enter 2FA'}
                    style={{width: '100%'}}
                    type="text"
                    onChange={this.handleCode}
                  />
                  <span className="transfer-form-field-error">
                    {this.state.error}
                  </span>
                </div>
                <div className="transfer-form-field">
                  <input
                    name="googleAuthCode"
                    value={this.state.googleAuthCode}
                    placeholder={'Enter 2FA'}
                    style={{width: '100%'}}
                    type="text"
                    onChange={this.handleCode}
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

MFAModal.propTypes = {
  hideMFAModal: PropTypes.func.isRequired,
  validateFor: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {setMFAAuthentication})(
  Email2faVerificationModel,
);
