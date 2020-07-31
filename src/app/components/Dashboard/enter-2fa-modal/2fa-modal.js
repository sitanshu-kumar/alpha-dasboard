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
      apiKeyName: this.props.tokenToDelete || null,
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

  onSubmit = (e) => {
    e.preventDefault();
    const {emailCode, faCode, apiKeyName} = this.state;

    if (this.props.profile.profile.enabled_2fa) {
      if (emailCode.length >= 6 && faCode.length >= 6 && apiKeyName) {
        this.props.hideMFAModal();
        this.props.valueFromComponent({
          name: apiKeyName,
          token: emailCode,
          token_2fa: faCode,
        });
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
        let apiKeyError = '';
        if (!apiKeyName) {
          apiKeyError = 'Please Enter Valid Name';
        }

        this.setState({
          emailCodeError,
          faCodeError,
          formError: '',
          apiKeyError,
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
    console.log('nametodelete', this.props.tokenToDelete);
    return (
      <>
        <div onClick={() => this.props.hideMFAModal()} className="curtain">
          <div onClick={(e) => e.stopPropagation()} className="box-modal">
            <div className="box-modal-header">
              <h3>Enter Details</h3>
            </div>
            <div className="box-modal-body">
              <div className="main-body">
                <div className="form-body white-bg">
                  <div className="form-container">
                    <div className="a5-login-field">
                      {this.props.tokenToDelete && (
                        <>
                          <input
                            onInput={this.apiNameChange}
                            type="text"
                            placeholder={this.props.tokenToDelete}
                            value={this.props.tokenToDelete}
                            readOnly
                          />
                          <span className="a5-login-error">
                            {this.state.apiKeyError}
                          </span>
                        </>
                      )}
                      {!this.props.tokenToDelete && (
                        <>
                          {' '}
                          <input
                            onInput={this.apiNameChange}
                            type="text"
                            placeholder="Enter API KEY Name"
                          />
                          <span className="a5-login-error">
                            {this.state.apiKeyError}
                          </span>
                        </>
                      )}
                    </div>
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

                    <div className="form-btn-holder align-items-center mt-5">
                      <a
                        onClick={this.onSubmit}
                        className="form-register align-items-center"
                      >
                        Submit
                      </a>
                    </div>
                  </div>
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

export default connect(mapStateToProps, {setMFAAuthentication})(MFAModal);
