import React, {Component} from 'react';
import PropTypes from 'prop-types';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);

class VerifyMFA extends Component {
  constructor(props) {
    super(props);
    this.state = {emailCode: '', twoFA: '', emailError: '', twoFAerror: ''};
  }

  handleEmail = (e) => {
    let email = e.target.value;
    let emailError = '';
    if (!email) emailError = 'Email required';
    else if (!validEmailRegex.test(email))
      emailError = 'Please enter a valid Email !!';
    this.setState({email, emailError});
  };

  handle2FA = (e) => {
    let twoFA = e.target.value;
    let twoFAError = '';
    this.setState({twoFA, twoFAError});
  };

  handleSubmit = () => {
    const {twoFA, emailCode} = this.state;
    this.props.onSubmit(twoFA, emailCode);
  };

  render() {
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
                  <input
                    placeholder={'Enter Email'}
                    style={{width: '100%'}}
                    type="text"
                    onInput={this.handleEmail}
                  />
                  <span className="transfer-form-field-error">
                    {this.state.emailError}
                  </span>
                </div>

                <div className="transfer-form-field">
                  <input
                    placeholder={'Enter 2FA'}
                    style={{width: '100%'}}
                    type="number"
                    onInput={this.handle2FA}
                  />
                  <span className="transfer-form-field-error">
                    {this.state.twoFAerror}
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

VerifyMFA.propTypes = {
  hideMFAModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default VerifyMFA;
