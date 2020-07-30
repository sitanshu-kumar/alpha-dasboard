import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './Login.css';
import isEmpty from '../../validation/is-empty';
import { connect } from 'react-redux';
import { clearErrors } from '../../redux/actions/errorActions';
import PropTypes from 'prop-types';
import ConfirmEmailModal from '../confirm-email-code/confirm-email';
import { loginAPI } from './Login_Api';
import { withAlert } from 'react-alert';
import store from '../../Redux_Store/store'
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      passwordError: '',
      formError: '',
      value: 'country',
      email: '',
      password: '',
      isDirty: false,
      twoFactorCode: '',
      twoFactorCodeError: '',
      showEmailVerificationModal: false,
    };
  }

  errorMap = {
    password_or_email_invalid: 'Invalid Credentials',
    invalid_data: 'Invalid Credentials',
    not_found: 'Invalid Credentials',
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }
    loginAPI.hideEmailVerification();
  };

  componentWillReceiveProps = (nextProps) => {
    if (!isEmpty(nextProps.errors)) {
      console.log(nextProps.errors);
    } else if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    } else if (
      nextProps.auth.showEmailVerificationModal !=
      this.state.showEmailVerificationModal
    ) {
      this.setState({
        showEmailVerificationModal: nextProps.auth.showEmailVerificationModal,
      });
    }
    if (nextProps.auth.loginFailed === true) {
      this.props.alert.error('Invalid Credentials !!');
    }
    if (nextProps.auth.emailVerification === true) {
      this.props.alert.success('Email verified Sucessfully');
      this.props.history.push('/dashboard/account');
    }
    if (nextProps.auth.emailVerification === false)
      this.props.alert.error('Email Verification Failed');
  };

  // componentDidUpdate = (prevProps) => {
  //   if (!isEmpty(this.props.loggedInSucessful)) {
  //     this.props.alert.error(this.props.loggedInSucessful);
  //   }
  // };

  allowSubmission = () => {
    const { emailError, passwordError, twoFactorCodeError, isDirty } = this.state;
    return !(emailError || passwordError || twoFactorCodeError) && isDirty;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password, twoFactorCode } = this.state;
    const token_2fa = twoFactorCode;
    if (this.allowSubmission()) {
      loginAPI.loginUser({ email, password, token_2fa });
    } else {
      let emailError = '';
      let passwordError = '';
      if (!email) {
        emailError = 'Email is Required !';
      } else if (!validEmailRegex.test(email)) {
        emailError = 'Please enter a valid email!';
      }
      if (!password) {
        passwordError = 'Password is required !';
      }
      this.setState({
        emailError,
        passwordError,
        email,
        formError: '',
        isDirty: true,
      });
    }
  };

  handleEmailInput = (e) => {
    e.preventDefault();
    let email = e.target.value;
    let emailError = '';
    if (!email) {
      emailError = 'Email is Required !';
    } else if (!validEmailRegex.test(email)) {
      emailError = 'Please enter a valid email!';
    }
    this.props.clearErrors();
    store.dispatch({ type: 'LOGIN_FAILED', payload: null })
    this.setState({ emailError, email, formError: '', isDirty: true });
  };

  handlePasswordInput = (e) => {
    e.preventDefault();
    let password = e.target.value;
    let passwordError = '';
    if (!password) {
      passwordError = 'Password is required !';
    }
    this.props.clearErrors();
    store.dispatch({ type: 'LOGIN_FAILED', payload: null })
    this.setState({ password, passwordError, formError: '', isDirty: true });
  };

  handle2FAInput = (e) => {
    e.preventDefault();
    store.dispatch({ type: 'LOGIN_FAILED', payload: null })
    let twoFactorCode = e.target.value;
    let twoFactorCodeError = '';
    if (twoFactorCode && twoFactorCode.length != 6)
      twoFactorCodeError = 'Need 6 Digits Exactly';
    else twoFactorCodeError = '';
    this.setState({ twoFactorCode, twoFactorCodeError, formError: '' });
  };

  hideEmailModal = () => {
    this.setState({ showEmailVerificationModal: false });
  };

  submitEmailVerificationCode = (token) => {
    loginAPI.verifyEmail(this.state.email, token);
  };

  render() {
    return (
      <>
        <div className="dark-bg dark-body">
          <div className="form-head">
            <h3>Trade Smart</h3>
            <p>On the most simple crypto derivatives platform.</p>
          </div>
          <div className="form-body">
            <h3>Sign in to your account</h3>
            {this.state.formError ? (
              <h3 className="error">{this.state.formError}</h3>
            ) : (
                <></>
              )}
            <div id="login-form" className="form-container">
              <div className="a5-login-field">
                <input
                  onInput={this.handleEmailInput}
                  type="text"
                  placeholder="Email"
                />
                <span className="a5-login-error">{this.state.emailError}</span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.handlePasswordInput}
                  type="password"
                  placeholder="Password"
                />
                <span className="a5-login-error">
                  {this.state.passwordError}
                </span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.handle2FAInput}
                  type="number"
                  placeholder="Enter 2FA Code (If Enabled)"
                  min="0"
                />
                <span className="a5-login-error">
                  {this.state.twoFactorCodeError}
                </span>
              </div>
              <div className="form-btn-holder align-items-center">
                <a
                  onClick={this.onSubmit}
                  className="form-register align-items-center"
                >
                  LOGIN
                </a>
                <div className="already">
                  <span>Don't have an account?</span> <br />
                  <Link to="/register">REGISTER</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="reset-password">
            <div className="reset-password-description">
              <span>Trouble signing in ? </span>
              <Link to={'reset-password'}> Forgot Password</Link>
            </div>
          </div>
        </div>
        {this.state.showEmailVerificationModal ? (
          <ConfirmEmailModal
            hideEmailModal={this.hideEmailModal}
            onSubmit={this.submitEmailVerificationCode}
          />
        ) : (
            <></>
          )}
      </>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  loginSucess: state.auth.loggedInSucessful,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, {
    clearErrors,
  }),
  withRouter,
)(Login);
