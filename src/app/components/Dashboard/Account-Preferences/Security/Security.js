import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {clearErrors} from '../../redux/actions/errorActions';
import {clearErrors} from '../../../../redux/actions/errorActions';
import {
  changePassword,
  resetChangePassword,
} from '../../../../redux/actions/authActions';
import ConfirmPasswordChangeModal from './passwordUpdateModal';

const validPassword = RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

export class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQR: false,
      old_password: '',
      password: '',
      password_confirmation: '',
      successmsg: '',
      oldPasswordError: '',
      newPasswordError: '',
      confirmNewPasswordError: '',
      formError: '',
      isDirty: false,
      passwordChanged: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.passwordChanged && !this.state.passwordChanged) {
      this.setState({passwordChanged: true});
      setTimeout(() => {
        this.props.resetChangePassword(false);
      }, 3000);
    } else if (!nextProps.auth.passwordChanged && this.state.passwordChanged) {
      this.setState({passwordChanged: false});
    }
  };

  allowSubmission = () => {
    const {
      oldPasswordError,
      newPasswordError,
      confirmNewPasswordError,
      isDirty,
    } = this.state;
    return (
      !(oldPasswordError || newPasswordError || confirmNewPasswordError) &&
      isDirty
    );
  };

  oldPassword = (e) => {
    e.preventDefault();
    // alert('call');
    let old_password = e.target.value;
    let oldPasswordError = '';
    if (!old_password) {
      oldPasswordError = 'Please enter your current password!';
    }
    // else if (oldPassword.length < 8) {
    //   oldPasswordError = 'Password should be minimum of min 8 characters!';
    // }
    this.props.clearErrors();
    this.setState({old_password, oldPasswordError, formError: ''});
  };

  newPassword = (e) => {
    e.preventDefault();
    let password = e.target.value;
    const {password_confirmation} = this.state;
    let newPasswordError = '';
    let confirmNewPasswordError = '';
    if (!password) {
      newPasswordError = 'Please enter your password!';
      // confirmNewPasswordError = 'Password must match!';
    } else if (password.length < 8) {
      newPasswordError = 'Password should be minimum of min 8 characters!';
    } else if (!validPassword.test(password)) {
      newPasswordError =
        'Your password must contain at least one lowercase letter, one capital letter, one special character and one number!';
    }
    // else if (newPassword !== confirmNewPassword) {
    //   confirmNewPasswordError = 'Password must match!';
    // }
    this.props.clearErrors();
    this.setState({
      password,
      newPasswordError,
      formError: '',
    });
  };

  confirmpassword = (e) => {
    e.preventDefault();
    let password_confirmation = e.target.value;
    const {password} = this.state;
    let confirmNewPasswordError = '';
    if (!password_confirmation) {
      confirmNewPasswordError = 'Please enter confirm password!';
    } else if (password_confirmation !== password) {
      confirmNewPasswordError = 'Password must match!';
    }
    this.props.clearErrors();
    this.setState({
      password_confirmation,
      confirmNewPasswordError,
      formError: '',
    });
  };

  updatePassword = (e) => {
    e.preventDefault();
    const {old_password, password, password_confirmation} = this.state;
    if (this.allowSubmission()) {
      this.props.changePassword({
        old_password,
        password,
        password_confirmation,
      });
    } else {
      let oldPasswordError = '';
      let newPasswordError = '';
      let confirmNewPasswordError = '';
      if (!old_password) {
        oldPasswordError = 'Please enter your current password!';
      }
      if (!password) {
        newPasswordError = 'Please enter your password!';
      }
      if (!password_confirmation) {
        confirmNewPasswordError = 'Please enter confirm password!';
      }
      this.setState({
        oldPasswordError,
        newPasswordError,
        confirmNewPasswordError,
        formError: '',
        isDirty: true,
      });
    }
  };

  render() {
    const Profile = this.props.heading;
    return (
      <>
        <div className="containment">
          <div className="balances">
            <h3>Change Login Password</h3>
            <h3></h3>
            <hr />
            <div className="left-sided">
              <div className="balances-form with-inline-info mt-2">
                <div className="a5-form-field">
                  <label>Current Password</label>
                  <input onInput={this.oldPassword} type="password" />
                  <span className="form-field-error">
                    {this.state.oldPasswordError}
                  </span>
                </div>
                <div className="a5-form-field">
                  <label>New Password</label>
                  <input onInput={this.newPassword} type="password" />
                  <span className="form-field-error">
                    {this.state.newPasswordError}
                  </span>
                </div>
                <div className="a5-form-field">
                  <label>Confirm Password</label>
                  <input onInput={this.confirmpassword} type="password" />
                  <span className="form-field-error">
                    {this.state.confirmNewPasswordError}
                  </span>
                </div>
                <div className="a5-form-field">
                  <div className="a5-form-btn-grp">
                    <button
                      onClick={this.updatePassword}
                      className="form-btn-yellow"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------- */}
          <div className="balances pt-5 mt-5">
            <h3>2FA</h3>
            <hr />
            <div className="balance-notice">
              <h3>Two Factor Authentication</h3>
              <p>
                Two Factor Authentication adds extra security to your account.
                Once activated it will require you to enter a unique
                verification code generated by the app on your device or sent
                via SMS text message, in addition to your username and password.
              </p>
            </div>
            <div className="balance-ga-notice mt-5 mb-5 d-flex">
              <img src="db-assets/google-authenticator-2 1.svg" alt="" />
              <p>
                <span style={{color: ' var(--yellow-text)'}}>
                  Google Authenticator
                </span>
                to verify your account every time you sign in
              </p>
              <button
                onClick={() => this.setState(() => ({showQR: true}))}
                className="a5-button-primary"
              >
                ENABLE
              </button>
            </div>
            {this.state.showQR ? (
              <>
                <div className="centered d-flex justify-content-center">
                  <div className="qr-container d-flex">
                    <img src="db-assets/qr_code.svg" />
                    <div className="two-factor-code">
                      <input
                        value="237gj h64d1 5907 c694 02"
                        type="text"
                        readOnly
                      />
                      <img src="db-assets/copy-icon.svg" alt="" />
                      <p>
                        If you are unable to scan this QR Code, please insert
                        this key into the app manually.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="centered">
                  <div className="balances-form mt-2">
                    <div className="a5-form-field">
                      <label>Enter Code</label>
                      <input type="text" />
                    </div>
                    <div className="a5-form-field">
                      <div className="a5-form-btn-grp">
                        <button className="form-btn-yellow">Update MFA</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------- */}
        {this.state.passwordChanged ? <ConfirmPasswordChangeModal /> : <></>}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  clearErrors,
  changePassword,
  resetChangePassword,
})(Security);
