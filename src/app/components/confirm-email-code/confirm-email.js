import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import isEmpty from '../../validation/is-empty';
import {resendEmailAPI} from './confirm-mail-api';
import {withAlert} from 'react-alert';
import store from '../../Redux_Store/store';
class VerifyEmailCode extends Component {
  constructor(props) {
    super(props);
    this.state = {code: '', formError: '', disabled: '', seconds: 60};
  }

  componentDidMount = () => {
    if (this.state.seconds > 0) {
      this.timer = setInterval(() => {
        let seconds = this.state.seconds - 1;
        this.setState({seconds});
      }, 1000);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    console.log('nextprops', nextProps);
    if (nextProps.auth.emailVerification === false) {
      this.setState({formError: 'Please Enter valid code'});
    }
    if (!isEmpty(nextProps.errors)) {
      this.props.hideEmailModal();
    }
  };

  componentWillUpdate = (newProps, newState) => {
    if (this.state.seconds === 1) {
      clearInterval(this.timer, this.setState({disabled: 'show'}));
    }
    if (newState.seconds === 0) {
      this.setState({seconds: 60});
    }
  };

  handleCode = (e) => {
    this.setState({code: e.target.value, formError: ''});
  };

  handleSubmit = (e) => {
    const {code} = this.state;
    if (!code.length) this.setState({formError: "Field can't be empty!"});
    else if (code.length < 6)
      this.setState({formError: 'Code should be more than 6 digit!'});
    else if (code.length > 6)
      this.setState({formError: 'Code should  be of exact 6 digit!'});
    else this.props.onSubmit(this.state.code);
  };

  handleResendEmail = (e) => {
    e.preventDefault();
    resendEmailAPI.resendEmail(this.props.emailid, this.props.resendCategory);
    if (this.state.seconds > 0) {
      this.timer = setInterval(() => {
        let seconds = this.state.seconds - 1;
        this.setState({seconds, disabled: ''});
      }, 1000);
    }
  };
  render() {
    return (
      <>
        <div onClick={() => this.props.hideEmailModal()} className="curtain">
          <div onClick={(e) => e.stopPropagation()} className="box-modal">
            <div className="box-modal-header">
              <h5>Security verifiction</h5>
            </div>
            <div className="box-modal-body">
              <div className="transfer-form">
                <div className="transfer-form-field">
                  <div
                    className="row"
                    style={{padding: '2px', marginBottom: '3px'}}
                  >
                    <div className="col-md-12">
                      <p>Please Verify Your Account</p>
                    </div>
                  </div>
                  <input
                    placeholder={'Enter Email verification code'}
                    style={{width: '100%'}}
                    type="text"
                    onInput={this.handleCode}
                  />
                  <span
                    className="transfer-form-field-error"
                    style={{
                      marginRight: '100%',
                      color: 'red',
                      display: 'block',
                    }}
                  >
                    {this.state.formError}
                  </span>
                  <div className="emailMsg">
                    {' '}
                    <span
                      style={{
                        fontWeight: '100',
                        fontSize: '14px',
                      }}
                    >
                      Enter the 6 digit code received by{' '}
                      <strong style={{fontWeight: '500', color: '#f9a931'}}>
                        {this.props.emailid}
                      </strong>
                    </span>
                  </div>
                  <div
                    className="form-btn-holder d-flex justify-content-around"
                    style={{marginTop: '2rem'}}
                  >
                    <a
                      onClick={this.handleSubmit}
                      className="form-register align-items-center"
                    >
                      Verify
                    </a>
                    <div className="already">
                      <button
                        disabled={!this.state.disabled}
                        style={{
                          fontSize: '14px',
                          color: this.state.disabled ? '#f9a931' : '#666666',
                          border: 'none',
                          marginLeft: '100px',
                          background: 'none',
                          marginRight: '5px',
                          outline: 'none',
                        }}
                        onClick={this.handleResendEmail}
                      >
                        Resend Email{' '}
                        {this.state.disabled ? null : `${this.state.seconds}s`}
                      </button>
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

VerifyEmailCode.propTypes = {
  hideEmailModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    auth: state.auth,
  };
};

export default compose(
  withAlert(),
  connect(mapStateToProps, {}),
  withRouter,
)(VerifyEmailCode);
