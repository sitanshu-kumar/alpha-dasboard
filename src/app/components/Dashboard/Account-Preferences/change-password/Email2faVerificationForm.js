import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import {clearErrors} from '../../../../redux/actions/errorActions';
import {Slide} from 'react-awesome-reveal';
import store from '../../../../Redux_Store/store';
import {withAlert} from 'react-alert';
class Email2faVerfication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailCode: '',
      faCode: '',
      successmsg: '',
      emailCodeError: '',
      faCodeError: '',
      formError: '',
      isDirty: false,
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
    this.props.clearErrors();
    this.setState({emailCode, emailCodeError, formError: ''});
  };

  google2FACodeChange = (e) => {
    e.preventDefault();
    let faCode = e.target.value;
    let faCodeError = '';
    if (!faCode) {
      faCodeError = 'Please enter 2 fa Activation Code';
    }
    this.props.clearErrors();
    this.setState({faCode, faCodeError, formError: ''});
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors === 'Token MisMatch') {
      this.props.alert.error('Wrong Token or Password Entered');
    }

    if (nextProps.auth.passwordChanged === true) {
      this.props.alert.success('Password Changed Sucessfully');
      setTimeout(() => {
        store.dispatch({type: 'USER_PASSWORD_CHANGE', payload: null});
        this.props.history.push('/dashboard/account');
      }, 500);
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.clearErrors();
    const {emailCode, faCode} = this.state;

    if (emailCode.length >= 6 && faCode.length >= 6) {
      this.props.getSecurtyValue({emailCode, faCode});
      this.props.onDataSubmit();
    } else {
      let emailCodeError = '';
      let faCodeError = '';
      if (emailCode.length < 6) {
        emailCodeError = 'Code Must be of 6 digit';
      }
      if (!emailCode) {
        emailCodeError = 'Please enter email Activation Code !!';
      }

      if (!faCode) {
        faCodeError = 'Please enter 2 fa Verification Code ';
      }
      if (faCode.length < 6) {
        faCodeError = 'Code Must be of 6 digit';
      }
      this.setState({
        emailCodeError,
        faCodeError,
        formError: '',
        isDirty: true,
      });
    }
  };
  render() {
    const {previous, next} = this.props.navigation;
    return (
      <>
        <div className="main">
          <div className="main-header">
            <h3>Account & Preferences</h3>
            <div className="main-sub-header">
              Change Password
              <hr />
            </div>
          </div>
          <Slide direction="right">
            <div className="main-body">
              <div className="form-body white-bg">
                <h3>Security Verification</h3>
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
                      onClick={previous}
                      className="form-register align-items-center"
                    >
                      Previous
                    </a>

                    <a
                      onClick={this.onSubmit}
                      className="form-register align-items-center ml-2"
                    >
                      Change Password
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile,
});

export default compose(
  withAlert(),
  connect(mapStateToProps, {
    clearErrors,
  }),
  withRouter,
)(Email2faVerfication);
