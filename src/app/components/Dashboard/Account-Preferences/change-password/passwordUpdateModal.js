import React, {Component} from 'react';

class PasswordConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="curtain">
          <div className="box-modal">
            <div className="box-modal-header">
              <h3>Password Changed !</h3>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PasswordConfirmationModal;
