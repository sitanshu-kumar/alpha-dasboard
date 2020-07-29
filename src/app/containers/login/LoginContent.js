import React, {Component} from 'react';
import Header from '../../components/login-header/login-header';
import Footer from '../../components/Footer';
import Login from '../../components/Login/Login';

class LoginContent extends Component {
  render() {
    return (
      <div>
        <Header />
        <Login />
        <Footer />
      </div>
    );
  }
}

export default LoginContent;
