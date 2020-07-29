import React, {Component} from 'react';
import {connect} from 'react-redux';
import {apiSecretKeyAPI} from './Api_SecretApi';
import {getNewKeyAndSecret} from '../../../../redux/actions/apiSecretand2faAction';

class ApiNameConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  hideModal = () => {
    this.props.hideKeyPairModal();
  };

  handleApiName = (e) => {
    let value = e.target.value;
    this.setState({name: value});
  };

  onSubmit = () => {
    apiSecretKeyAPI.getNewKeyAndSecret(this.state.name);
    this.hideModal();
  };

  render() {
    return (
      <>
        <div className="curtain" onClick={this.hideModal}>
          <div onClick={(e) => e.stopPropagation()} className="box-modal">
            <div className="box-modal-header">
              <h3>Enter Name For API Key Pair</h3>
            </div>
            <div className="box-modal-body">
              <div className="transfer-form">
                <div className="transfer-form-field">
                  <label>Name</label>
                  <input
                    onInput={this.handleApiName}
                    placeholder={'Enter Name'}
                    type="text"
                  />
                </div>
                <div className="transfer-center-button">
                  <button
                    onClick={this.onSubmit}
                    className="form-btn yellow send-button-modal"
                  >
                    Create API keys
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getNewKeyAndSecret})(
  ApiNameConfirmation,
);
