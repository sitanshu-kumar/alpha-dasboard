import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setMFAAuthentication} from '../../../redux/actions/authActions';
import {BaseApiUrl} from '../../../redux/config';
import axios from 'axios';

class MFAModal extends Component {
  constructor(props) {
    super(props);
    this.state = {code: '', error: ''};
  }

  handleCode = (e) => {
    let val = e.target.value;
    this.setState({code: val, error: ''});
  };

  handleSubmit = (e) => {
    this.check2FA();
  };

  check2FA = () => {
    let url = BaseApiUrl + '/users/verify_2fa_token';
    axios
      .get(url, {params: {token_2fa: this.state.code}})
      .then((res) => {
        console.log(res.data);
        let action = this.props.validateFor;
        let {token_2fa} = res.data;
        if (token_2fa == 'token verified') {
          this.props.setMFAAuthentication(action);
          this.props.hideMFAModal();
        }
      })
      .catch((e) => {
        let data = e.response.data;
        if (data.type == 'invalid_data')
          this.setState({error: 'invalid Token !!'});
      });
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
});

export default connect(mapStateToProps, {setMFAAuthentication})(MFAModal);
