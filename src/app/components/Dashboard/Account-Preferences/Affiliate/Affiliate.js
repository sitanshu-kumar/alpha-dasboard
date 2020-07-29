import React, {Component} from 'react';

export class Affiliate extends Component {
  render() {
    const Profile = this.props.heading;
    return (
      <>
        <div className="containment">
          <div className="balances">
            <h3>Referral</h3>
            <hr />
            <div className="centered">
              <div className="balance-notice mt-5">
                <h3>Copy Referral</h3>
                <p>
                  Copy your personal referral link and share it with your
                  friends
                </p>
                <div className="copy-referral">
                  <input
                    value="http://alpha5.demolinks.xyz/#/register?ref=91355e"
                    type="text"
                    readOnly="readonly"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Affiliate;
