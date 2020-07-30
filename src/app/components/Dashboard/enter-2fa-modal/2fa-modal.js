import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setMFAAuthentication} from '../../../redux/actions/authActions';
import {BaseApiUrl} from '../../../redux/config';
import {apiSecretKeyAPI} from '../Account-Preferences/Api-Secret/Api_SecretApi';
import axios from 'axios';

class MFAModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCode: '',
      faCode: '',
      successmsg: '',
      emailCodeError: '',
      faCodeError: '',
      apiKeyError: '',
      formError: '',
      isDirty: false,
      showNext: false,
      ShowPrev: true,
      apiKeyName: '',
    };
  }
  errorMap = {
    password_or_email_invalid: 'Invalid Email or Password!',
  };

  emailCodeChange = (e) => {
    e.preventDefault();
    let emailCode = e.target.value;
    let emailCodeError = '';
    if (!emailCode) {
      emailCodeError = 'Please enter email Verification Code!';
    }

    this.setState({emailCode, emailCodeError, formError: ''});
  };

  google2FACodeChange = (e) => {
    e.preventDefault();
    let faCode = e.target.value;
    let faCodeError = '';
    if (!faCode) {
      faCodeError = 'Please enter 2 fa Activation Code';
    }

    this.setState({faCode, faCodeError, formError: ''});
  };

  apiNameChange = (e) => {
    e.preventDefault();
    let apiKeyName = e.target.value;
    let apiKeyError = '';
    if (!apiKeyName) {
      apiKeyError = 'Please enter valid name';
    }
    this.setState({apiKeyName, apiKeyError, formError: ''});
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors === 'Token MisMatch') {
      this.props.alert.error('Wrong Token or Password Entered');
    }
  };

  onFinalSubmit = (e) => {
    e.preventDefault();
    const {emailCode, faCode, apiKeyName} = this.state;

    if (apiKeyName) {
      this.props.hideMFAModal();
      this.props.valueFromComponent({
        name: apiKeyName,
        token: emailCode,
        token_2fa: faCode,
      });
    } else {
      let apiKeyError = '';
      if (!apiKeyName) {
        apiKeyError = 'Please Enter Valid Name';
      }
      this.setState({
        apiKeyError,
      });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {emailCode, faCode} = this.state;

    if (this.props.profile.profile.enabled_2fa) {
      if (emailCode.length >= 6 && faCode.length >= 6) {
        this.setState({showNext: true, ShowPrev: false});
      } else {
        let emailCodeError = '';
        let faCodeError = '';
        if (emailCode.length < 6) {
          emailCodeError = 'Code Must be of 6 digit';
        }
        if (!emailCode) {
          emailCodeError = 'Please enter email Activation Code !!';
        }
        if (faCode.length < 6) {
          faCodeError = 'Code Must be of 6 digit';
        }
        if (!faCode) {
          faCodeError = 'Please enter 2 fa Verification Code ';
        }

        this.setState({
          emailCodeError,
          faCodeError,
          formError: '',
          isDirty: true,
        });
      }
    } else {
      if (emailCode.length >= 6) {
        console.log(emailCode);
      } else {
        let emailCodeError = '';
        if (emailCode.length < 6) {
          emailCodeError = 'Code Must be of 6 digit';
        }
        if (!emailCode) {
          emailCodeError = 'Please enter email Activation Code !!';
        }

        this.setState({
          emailCodeError,
          formError: '',
          isDirty: true,
        });
      }
    }
  };

  handleCode = (e) => {
    let val = e.target.value;
    this.setState({code: val, error: ''});
  };

  render() {
    return (
      <>
        <div onClick={() => this.props.hideMFAModal()} className="curtain">
          <div onClick={(e) => e.stopPropagation()} className="box-modal">
            {this.state.ShowPrev ? (
              <>
                <div className="box-modal-header">
                  <h3>Security Verification</h3>
                </div>
                <div className="box-modal-body">
                  <div className="main-body">
                    <div className="form-body white-bg">
                      <div className="form-container">
                        <div className="a5-login-field">
                          <input
                            onInput={this.emailCodeChange}
                            type="text"
                            placeholder="Email Verification Code"
                          />
                          <span className="a5-login-error">
                            {this.state.emailCodeError}
                          </span>
                        </div>
                        {this.props.profile.profile.enabled_2fa ? (
                          <div className="a5-login-field">
                            <input
                              onInput={this.google2FACodeChange}
                              type="text"
                              placeholder="Enter 2fa Verification Code"
                            />
                            <span className="a5-login-error">
                              {this.state.faCodeError}
                            </span>
                          </div>
                        ) : null}

                        <div className="form-btn-holder align-items-center mt-5">
                          <a
                            onClick={this.onSubmit}
                            className="form-register align-items-center"
                          >
                            Next
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<div className="transfer-form">
                <div className="transfer-form-field">
                  <h3>Enter Email Verification code</h3>
                  <input
                    placeholder={'Enter 2FA'}
                    style={{width: '100%'}}
                    type="text"
                    onInput={this.handleCode}
                  />
                  <span className="transfer-form-field-error">
                    {this.state.error}
                  </span>
                </div>
                <div className="transfer-form-field">
                  <input
                    placeholder={'Enter 2FA'}
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
              </div>*/}
                </div>
              </>
            ) : null}

            {this.state.showNext ? (
              <>
                <div className="box-modal-header">
                  <h3>Enter API KEY Name</h3>
                </div>
                <div className="box-modal-body">
                  <div className="main-body">
                    <div className="form-body white-bg">
                      <div className="form-container">
                        <div className="a5-login-field">
                          <input
                            onInput={this.apiNameChange}
                            type="text"
                            placeholder="Enter API KEY Name"
                          />
                          <span className="a5-login-error">
                            {this.state.apiKeyError}
                          </span>
                        </div>

                        <div className="form-btn-holder align-items-center mt-5">
                          <a
                            onClick={this.onFinalSubmit}
                            className="form-register align-items-center"
                          >
                            Next
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
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

export default connect(mapStateToProps, {setMFAAuthentication})(MFAModal);
