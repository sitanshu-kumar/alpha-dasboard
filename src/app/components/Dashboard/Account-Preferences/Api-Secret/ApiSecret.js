import React, {Component} from 'react';
import KeyPairModal from './api-secret-name-modal';
import './ApiSecret.css';
import {Link} from 'react-router-dom';
import MFAModal from '../../enter-2fa-modal/2fa-modal';
import {connect} from 'react-redux';
import {resetMFAAuthentication} from '../../../../redux/actions/authActions';
import {
  getAllApiKeys,
  clearKeys,
  deleteApiKey,
} from '../../../../redux/actions/apiSecretand2faAction';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {apiSecretKeyAPI} from './Api_SecretApi';
import _ from 'lodash';

export class ApiSecret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show2faForGenerate: false,
      show2faForDelete: false,
      openKeyPairModal: false,
      apiSecretKeysArray: [],
      idToDelete: null,
      nameToDelete: null,
      uiError: null,
    };
  }

  componentDidMount = () => {
    // asynchronous so that root can set auth token
    setTimeout(() => {
      console.log(this.props);
      apiSecretKeyAPI.getAllApiKeys();
    });
  };

  componentWillReceiveProps = (newProps) => {
    if (newProps.auth.currentMFAaction == 'generateApiKeys') {
      this.props.resetMFAAuthentication();
      this.setState({openKeyPairModal: true});
    }

    let {idToDelete, nameToDelete} = this.state;
    if (
      idToDelete &&
      nameToDelete &&
      newProps.auth.currentMFAaction == 'deleteApiKeys'
    ) {
      this.props.deleteApiKey(idToDelete, nameToDelete);
      this.props.resetMFAAuthentication();
      this.setState({idToDelete: null, nameToDelete: null});
    }
    if (
      !_.isEqual(
        newProps.apikeys.apiSecretKeysArray,
        this.state.apiSecretKeysArray,
      )
    ) {
      this.setState({apiSecretKeysArray: newProps.apikeys.apiSecretKeysArray});
    }
  };

  componentWillUnmount = () => {
    apiSecretKeyAPI.clearKeys();
  };

  showMFAModal = (e) => {
    this.setState({show2faForGenerate: true});
    apiSecretKeyAPI.getEmailVerificationCode(this.props.profile.profile.email);
  };

  hideMFAModal = (e) => {
    this.setState({show2faForGenerate: false, show2faForDelete: false});
  };

  showKeyPairModal = (e) => {
    this.setState({openKeyPairModal: true});
  };

  hideKeyPairModal = (e) => {
    this.setState({openKeyPairModal: false});
  };
  handleAddAPIKey = (value) => {
    apiSecretKeyAPI.getNewKeyAndSecret(value);
  };

  deleteKey = (id, name) => {
    apiSecretKeyAPI.getEmailVerificationCodeForDeletion(
      this.props.profile.profile.email,
    );
    this.setState({show2faForDelete: true, idToDelete: id, nameToDelete: name});
    //apiSecretKeyAPI.deleteApiKey(id, name);
  };
  handleDeleteAPIKey = (value) => {
    apiSecretKeyAPI.deleteApiKey(value);
  };

  componentDidCatch = (error, errorInfo) => {};

  copyToClipboard = () => {
    window.alert('Copied !');
  };

  render() {
    // const link = `otpauth://totp/Bitfex(${this.props.profile.profile.full_name})?secret=${googletwofakey}`;
    const {enabled_2fa} = this.props.profile.profile;
    return (
      <>
        <div className="main">
          <div className="main-header">
            <h3>Account & Preferences</h3>
            <div className="main-sub-header">
              API Credentials
              <hr />
            </div>
          </div>
          <div className="main-body">
            <div className="notice mw-50">
              {!enabled_2fa ? (
                <>
                  <h2>Want to generate new API keys ?</h2>
                  <p>You have to activate your 2FA first.</p>
                  <div className="d-flex justify-content-center">
                    <Link
                      to="/dashboard/configure-2fa"
                      className="form-btn yellow"
                    >
                      Activate 2FA
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h2>2FA active</h2>
                  <p>Your account is protected by 2FA.</p>
                  <div className="d-flex justify-content-center">
                    <a
                      style={{cursor: 'pointer'}}
                      onClick={this.showMFAModal}
                      className="form-btn yellow"
                    >
                      Generate New API Key Pair
                    </a>
                  </div>
                </>
              )}
            </div>
            <p className="table-note">
              <span>Note: </span>
              The secret key will be unobtainable the moment you leave or
              refresh this page, kindly save this key securely before doing so.
            </p>
            <div className="table-container api-key-table contained mt-5 pb-3">
              <div className="table-header">
                <h3>Existing Keys</h3>
              </div>
              <div className="a5-table d-flex-justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th style={{textAlign: 'left'}}>Keys</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.apiSecretKeysArray ? (
                      this.state.apiSecretKeysArray.map((el, i) => {
                        let {id, key, name, secret} = el;
                        console.log(this.state.apiSecretKeysArray);
                        return (
                          <>
                            <tr key={i} className="border_bottom">
                              <td style={{width: '110px'}}>{name}</td>
                              <td>
                                <div className="d-flex flex-column align-items-start">
                                  <div className="key">
                                    <span className="heading">API Key :</span>
                                    <input
                                      type="text"
                                      value={key}
                                      readOnly="readOnly"
                                    />
                                    <CopyToClipboard
                                      onCopy={this.copyToClipboard}
                                      text={key}
                                    >
                                      <img src={'db-assets/copy-icon.svg'} />
                                    </CopyToClipboard>
                                  </div>
                                  <div className="key">
                                    <span className="heading">Secret :</span>
                                    <input
                                      type="text"
                                      value={secret}
                                      readOnly="readOnly"
                                    />
                                    <CopyToClipboard
                                      onCopy={this.copyToClipboard}
                                      text={secret}
                                    >
                                      <img src={'db-assets/copy-icon.svg'} />
                                    </CopyToClipboard>
                                  </div>
                                </div>
                              </td>
                              <td style={{width: '110px'}}>
                                <button
                                  onClick={() => {
                                    this.deleteKey(el.id, el.name);
                                  }}
                                  className="form-btn gray"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {this.state.show2faForGenerate ? (
          <MFAModal
            hideMFAModal={this.hideMFAModal}
            validateFor={'generateApiKeys'}
            valueFromComponent={(value) => this.handleAddAPIKey(value)}
          />
        ) : (
          <></>
        )}
        {this.state.openKeyPairModal ? (
          <KeyPairModal hideKeyPairModal={this.hideKeyPairModal} />
        ) : (
          <></>
        )}
        {this.state.show2faForDelete ? (
          <MFAModal
            hideMFAModal={this.hideMFAModal}
            validateFor={'deleteApiKeys'}
            tokenToDelete={this.state.nameToDelete}
            valueFromComponent={(value) => this.handleDeleteAPIKey(value)}
          />
        ) : (
          <></>
        )}

        {/* <div className="containment">
          <div className="balances pb-5">
            <h3>API Credentials</h3>
            <hr />
            {!enabled_2fa ? (
              <div className="balance-notice">
                <h3>Want to generate new API keys ?</h3>
                <hr />
                <p>You have to activate your 2FA first.</p>
                <button className="form-btn-yellow">
                  <Link to="/dashboard/security">Activate 2FA</Link>
                </button>
              </div>
            ) : (
              <div className="balance-notice">
                <h3>2FA Active</h3>
                <hr />
                <p>Your account is protected by 2FA.</p>
                <button onClick={this.showMFAModal} className="form-btn-yellow">
                  Generate New API Key Pair
                </button>
              </div>
            )}
          </div>
          <div className="balances pt-5">
            <p className="table-note">
              <span>Note: </span>
              The secret key will be unobtainable the moment you leave or
              refresh this page, kindly save this key securely before doing so.
            </p>
            <div className="table-container api-key-table contained pb-3">
              <div className="table-header">
                <h3>Existing Keys</h3>
              </div>
              <div className="a5-table d-flex-justify-content-center">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th style={{textAlign: 'left'}}>Keys</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.apiSecretKeysArray ? (
                      this.state.apiSecretKeysArray.map((el, i) => {
                        let {id, key, name, secret} = el;
                        console.log(this.state.apiSecretKeysArray);
                        return (
                          <tr key={i}>
                            <td>{name}</td>
                            <td>
                              <div className="d-flex flex-column align-items-start">
                                <div className="key">
                                  <span className="heading">API Key :</span>
                                  <span>{key}</span>
                                  <CopyToClipboard
                                    onCopy={this.copyToClipboard}
                                    text={key}
                                  >
                                    <span className="copy-text">Copy</span>
                                  </CopyToClipboard>
                                </div>
                                <div className="key">
                                  <span className="heading">Secret :</span>
                                  <span>{secret}</span>
                                  <CopyToClipboard
                                    onCopy={this.copyToClipboard}
                                    text={secret}
                                  >
                                    <span className="copy-text">Copy</span>
                                  </CopyToClipboard>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  this.deleteKey(el.id, el.name);
                                }}
                                className="form-btn-gray"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {this.state.show2faForGenerate ? (
          <MFAModal
            hideMFAModal={this.hideMFAModal}
            validateFor={'generateApiKeys'}
          />
        ) : (
          <></>
        )}
        {this.state.openKeyPairModal ? (
          <KeyPairModal hideKeyPairModal={this.hideKeyPairModal} />
        ) : (
          <></>
        )}
        {this.state.show2faForDelete ? (
          <MFAModal
            hideMFAModal={this.hideMFAModal}
            validateFor={'deleteApiKeys'}
          />
        ) : (
          <></>
        )} */}
      </>
    );
  }
}

const mapStatesToProps = (state) => ({
  auth: state.auth,
  apikeys: state.apikeys,
  profile: state.profile,
});

export default connect(mapStatesToProps, {
  resetMFAAuthentication,
  getAllApiKeys,
  clearKeys,
  deleteApiKey,
})(ApiSecret);
