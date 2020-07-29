import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {BaseApiUrl} from '../../redux/config';
import {goToResetPasswordForm} from '../../redux/actions/authActions';
import {connect} from 'react-redux';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
    };
  }

  emailHandle = (e) => {
    let email = e.target.value;
    let emailError = '';

    if (!email) emailError = 'Email Required!';
    else if (!validEmailRegex.test(email))
      emailError = 'Please Enter a Valid Email !';

    this.setState({email, emailError});
  };

  submit = () => {
    const {email, emailError} = this.state;
    if (!emailError) {
      axios
        .get(BaseApiUrl + '/users/forgot_password', {
          params: {email},
        })
        .then((res) => {
          let {data} = res;
          if (data.email == email) {
            // this.props.history.push('/password-change');
            this.props.goToResetPasswordForm(email, this.props.history);
          }
        })
        .catch((er) => {
          if (er.response)
            this.props.goToResetPasswordForm(email, this.props.history);
        });
    }
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
            <h3>Forgot Password</h3>
            <div className="form-instruction">
              <p>
                Don’t worry! Just fill in your email id below and if the Email,
                exists you will receive a verification code in your inbox.
              </p>
            </div>
            <div className="form-container">
              <div className="a5-login-field">
                <input
                  onInput={this.emailHandle}
                  type="text"
                  placeholder="Enter your email"
                />
                <span className="a5-login-error">{this.state.emailError}</span>
              </div>

              <div className="form-btn-holder align-items-center">
                <a
                  onClick={this.submit}
                  className="form-register align-items-center"
                >
                  Request Reset Code
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {goToResetPasswordForm})(
  withRouter(ResetPassword),
);
