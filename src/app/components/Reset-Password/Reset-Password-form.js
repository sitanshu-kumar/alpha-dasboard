import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {passwordResetted} from '../../redux/actions/authActions';
import {resetPasswordAPI} from './Reset-PasswordApi';
import {BaseApiUrl} from '../../redux/config';

const validPassword = RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordErr: '',
      confirmPass: '',
      confirmPassErr: '',
      token: '',
      tokenErr: '',
      resetted: false,
      errored: false,
      formError: '',
    };
  }

  iterator = 0;
  componentWillReceiveProps = (nextProps) => {
    this.iterator++;
    console.log(this.iterator, this.props.auth.resetPasswordEmail);
    if (nextProps.auth.resetPasswordEmail != this.state.email) {
      this.setState({email: nextProps.auth.resetPasswordEmail});
    }
    if (nextProps.auth.passwordReset === true)
      this.props.history.push('/login');
  };

  passworHandler = (e) => {
    let password = e.target.value;
    let passwordErr = '';
    if (!password) passwordErr = 'Password Required !';
    else if (password.length < 8)
      passwordErr = 'Password must be at least 8 characters !';
    else if (!validPassword.test(password))
      passwordErr =
        'at least 1 lowercase, 1 uppercase, 1 special & 1 number character required!';
    this.setState({password, passwordErr});
  };

  confirmPassHandler = (e) => {
    let confirmPass = e.target.value;
    let confirmPassErr = '';
    if (confirmPass != this.state.password)
      confirmPassErr = 'Passwords must Match !';
    this.setState({confirmPass, confirmPassErr});
  };

  codeHandle = (e) => {
    let token = e.target.value;
    this.setState({token});
  };

  allowSubmit = () => {
    let {
      email,
      password,
      passwordErr,
      confirmPass,
      confirmPassErr,
      token,
      tokenErr,
    } = this.state;
    if (!password) passwordErr = 'Password Required !';
    else if (password.length < 8)
      passwordErr = 'Password must be at least 8 characters !';
    else if (!validPassword.test(password))
      passwordErr =
        'at least 1 lowercase, 1 uppercase, 1 special & 1 number character required!';

    if (confirmPass != this.state.password)
      confirmPassErr = 'Passwords must Match !';
    return !(passwordErr || confirmPassErr || tokenErr);
  };

  resetPassword = () => {
    const {password, confirmPass, token} = this.state;
    const email = this.props.auth.userEmail;
    const password_confirmation = confirmPass;
    let url = BaseApiUrl + '/users/reset_password';
    if (this.allowSubmit()) {
      const UserPasswordDetails = {
        email: email,
        token: token,
        password: password,
        password_confirmation: confirmPass,
      };
      resetPasswordAPI.resetPassword(UserPasswordDetails);

      /* if (this.state.email) {
        axios
          .post(url, {email, password, password_confirmation, token})
          .then((res) => {
            if (res.data.email == email) {
              this.setState({resetted: true});
            }
          })
          .catch((er) => {
            if (er.response) {
              let {data} = er.response;
              this.setState({formError: 'Invalid Code!', errored: true});
            }
          });*/
    } else {
      this.setState({
        formError: 'Some error occured please retry!',
        errored: true,
      });
      setTimeout(() => {
        this.props.history.push('/reset-password');
      }, 3000);
    }
  };

  componentWillUnmount = () => {
    this.props.passwordResetted();
  };

  render() {
    const {resetted, errored} = this.state;

    return (
      <>
        <div className="dark-bg dark-body">
          <div className="form-head">
            <h3>Trade Smart</h3>
            <p>On the most simple crypto derivatives platform.</p>
          </div>
          <div className="form-body">
            {!resetted ? (
              !errored ? (
                <h3>Reset Password</h3>
              ) : (
                <h3 className="text-danger">{this.state.formError}</h3>
              )
            ) : (
              <h3 className="text-success">Password Changed Successfully !</h3>
            )}
            <div className="form-container">
              <div className="a5-login-field">
                <input
                  onInput={this.passworHandler}
                  type="password"
                  placeholder="Enter New Password"
                />
                <span className="a5-login-error">{this.state.passwordErr}</span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.confirmPassHandler}
                  type="password"
                  placeholder="Confirm New Password"
                />
                <span className="a5-login-error">
                  {this.state.confirmPassErr}
                </span>
              </div>
              <div className="a5-login-field">
                <input
                  onInput={this.codeHandle}
                  type="number"
                  placeholder="Enter Verification Code"
                />
                {/* <span className="a5-login-error">
                  {this.state.confirmPassErr}
                </span> */}
              </div>
              <div className="form-btn-holder align-items-center">
                <a
                  onClick={this.resetPassword}
                  className="form-register align-items-center"
                >
                  Reset Password
                </a>
              </div>
            </div>
          </div>
          <div className="reset-password">
            <div className="reset-password-description">
              <span>Go back to </span>
              <Link to={'/login'}>Login ?</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {passwordResetted})(
  withRouter(ResetPasswordForm),
);
