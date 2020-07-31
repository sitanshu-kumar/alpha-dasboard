import React from 'react';
import {Result, Button} from 'antd';
import {Link} from 'react-router-dom';
class NotAuthorized extends React.Component {
  render() {
    return (
      <>
        <Result
          status="403"
          subTitle="Sorry, you need to enable 2fa first!!."
          extra={
            <div className="form-btn-holder mt-3 d-flex justify-content-center">
              <Link to="/dashboard/configure-2fa">
                <a
                  onClick={this.onSubmit}
                  className="form-register align-items-center"
                >
                  Enable 2 fa
                </a>
              </Link>{' '}
            </div>
          }
        />
        ,
      </>
    );
  }
}

export default NotAuthorized;
