import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Register.css';
import A5DBSelect from '../Dashboard/a5-themed-select/a5-themed-select';
import isEmpty from '../../validation/is-empty';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
  verifyEmail,
  hideEmailVerification,
} from '../../redux/actions/authActions';
import ConfirmEmailModal from '../confirm-email-code/confirm-email';
import {withRouter} from 'react-router-dom';
import {clearErrors} from '../../redux/actions/errorActions';
import {registerAPI} from './Register_Api';
import store from '../../Redux_Store/store';
import {withAlert} from 'react-alert';
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
const validPassword = RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      firstNameErr: '',
      lastName: '',
      lastNameErr: '',
      email: '',
      emailErr: '',
      password: '',
      passwordErr: '',
      confirmPass: '',
      confirmPassErr: '',
      agreement: false,
      agreementErr: '',
      isDirty: false,
      showEmailVerificationModal: false,
      formError: '',
    };
  }

  componentDidMount = () => {
    this.props.hideEmailVerification();
  };

  componentWillReceiveProps = (newProps) => {
    console.log(newProps);
    if (
      newProps.auth.showEmailVerificationModal !=
      this.state.showEmailVerificationModal
    ) {
      console.log(newProps.auth.showEmailVerificationModal);
      this.setState({
        showEmailVerificationModal: newProps.auth.showEmailVerificationModal,
      });
    } else if (newProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard/account');
    }

    if (newProps.auth.emailExist === true)
      this.props.alert.error('Email ID already Exist! Try Login');

    if (newProps.auth.emailVerification === true) {
      this.props.alert.success('Email verified Sucessfully');
      this.props.history.push('/dashboard/account');
    }
  };

  onSubmit = () => {
    this.checkAgreementAndCountry();
    store.dispatch({type: 'EMAIL_EXIST', payload: null});
    store.dispatch({
      type: 'SHOW_EMAIL_VERIFICATION',
      payload: false,
    });
  };

  checkAgreementAndCountry = () => {
    const {agreement} = this.state;
    let agreementErr = '';
    if (!agreement) agreementErr = 'Please agree to terms first !';
    this.setErrors(agreementErr);
  };

  setErrors = (agreementErr) => {
    let {
      firstName,
      firstNameErr,
      lastName,
      lastNameErr,
      email,
      emailErr,
      password,
      passwordErr,
      confirmPass,
      confirmPassErr,
    } = this.state;

    if (!firstName) firstNameErr = 'First Name is required !';

    if (!lastName) lastNameErr = 'Last Name is required !';

    if (!email) emailErr = 'Email is required !';
    else if (!validEmailRegex.test(email)) emailErr = 'Invalid Email !';

    if (!password) passwordErr = 'Password Required !';
    if (!confirmPass) confirmPassErr = 'Confirm Password Required !';
    else if (password.length < 8)
      passwordErr = 'Password must be at least 8 characters !';
    else if (!validPassword.test(password))
      passwordErr =
        'at least 1 lowercase, 1 uppercase, 1 special & 1 number character required!';

    if (confirmPass != this.state.password)
      confirmPassErr = 'Passwords must Match !';

    if (
      !(
        firstNameErr ||
        lastNameErr ||
        emailErr ||
        passwordErr ||
        confirmPassErr ||
        agreementErr
      )
    ) {
      this.submit();
    } else {
      this.setState({
        firstNameErr,
        lastNameErr,
        passwordErr,
        confirmPassErr,
        emailErr,

        agreementErr,
      });
    }
  };

  submit = () => {
    console.log('submitted');
    let {email, firstName, lastName, password, confirmPass} = this.state;

    let userData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      password_confirmation: confirmPass,
    };
    registerAPI.registerUser(userData);
  };

  firstNameHandle = (e) => {
    let firstName = e.target.value;
    let firstNameErr = '';
    if (!firstName) firstNameErr = 'First Name is required !';
    this.setState({firstName, firstNameErr, formError: ''});
  };

  lastNameHandle = (e) => {
    let lastName = e.target.value;
    let lastNameErr = '';
    if (!lastName) lastNameErr = 'Last Name is required !';
    this.setState({lastName, lastNameErr, formError: ''});
  };

  emailHandle = (e) => {
    store.dispatch({type: 'EMAIL_EXIST', payload: null});
    let email = e.target.value;
    let emailErr = '';
    if (!email) emailErr = 'Email is required !';
    else if (!validEmailRegex.test(email)) emailErr = 'Invalid Email !';
    this.setState({email, emailErr, formError: ''});
  };

  passwordHandle = (e) => {
    let password = e.target.value;
    let passwordErr = '';
    if (!password) passwordErr = 'Password Required!';
    else if (password.length < 8)
      passwordErr = 'Password must be at least 8 characters !';
    else if (!validPassword.test(password))
      passwordErr =
        'at least 1 lowercase, 1 uppercase, 1 special & 1 number character required!';
    this.setState({password, passwordErr, formError: ''});
  };

  cnfrmPassHandle = (e) => {
    let confirmPass = e.target.value;
    let confirmPassErr = '';
    if (confirmPass != this.state.password)
      confirmPassErr = 'Passwords must Match !';
    this.setState({confirmPass, confirmPassErr, formError: ''});
  };

  agreementHandle = (e) => {
    if (e.target.checked)
      this.setState({
        agreement: e.target.checked,
        agreementErr: '',
        formError: '',
      });
    else
      this.setState({
        agreement: e.target.checked,
        agreementErr: 'Please agree to the terms first !',
        formError: '',
      });
  };

  hideEmailModal = () => {
    this.setState({showEmailVerificationModal: false});
  };

  submitEmailVerificationCode = (token) => {
    registerAPI.verifyEmail(this.state.email, token);
  };

  componentWillUnmount = () => {
    this.props.clearErrors();
  };

  render() {
    const {
      firstNameErr,
      lastNameErr,
      emailErr,
      passwordErr,
      confirmPassErr,
      agreementErr,
      formError,
    } = this.state;
    // console.log(this.state.showEmailVerificationModal);
    return (
      <>
        <div className="vh-100 dark-bg dark-body">
          <div className="form-head">
            <h3>Trade Smart</h3>
            <p>On the most simple crypto derivatives platform.</p>
          </div>
          <div className="form-body">
            <h3>Create an account</h3>
            {formError ? <h3 className="error">{formError}</h3> : <></>}
            <div id="registerForm" className="form-container">
              <div className="a5-login-field">
                <input
                  onInput={this.firstNameHandle}
                  type="text"
                  placeholder="First Name"
                />
                <span className="a5-login-error">{firstNameErr}</span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.lastNameHandle}
                  type="text"
                  placeholder="Last Name"
                />
                <span className="a5-login-error">{lastNameErr}</span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.emailHandle}
                  type="text"
                  placeholder="Email"
                />
                <span className="a5-login-error">{emailErr}</span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.passwordHandle}
                  type="password"
                  placeholder="Password"
                />
                <span className="a5-login-error">{passwordErr}</span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.cnfrmPassHandle}
                  type="password"
                  placeholder="Confirm Password"
                />
                <span className="a5-login-error">{confirmPassErr}</span>
              </div>

              <div className="agreement">
                <label className="a5-checkbox">
                  <span className="i-agree-text">
                    I Agree To The{' '}
                    <a href="terms/terms-of-use.html">Terms of Service</a>
                  </span>
                  <input
                    onChange={this.agreementHandle}
                    type="checkbox"
                    defaultChecked={this.state.agreement}
                  />
                  <span className="checkmark"></span>
                  <span className="a5-login-error">{agreementErr}</span>
                </label>
              </div>
              <div className="form-btn-holder align-items-center">
                <a
                  onClick={this.onSubmit}
                  className="form-register align-items-center"
                >
                  REGISTER
                </a>
                <div className="already">
                  <span>Already have an account?</span> <br />
                  <Link to="/login">LOGIN</Link>
                </div>
              </div>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, {
    verifyEmail,
    hideEmailVerification,
    clearErrors,
  }),
  withRouter,
)(Register);
