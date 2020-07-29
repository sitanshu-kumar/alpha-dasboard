import React, {Component} from 'react';
import Header from '../../components/login-header/login-header';
import Footer from '../../components/Footer';
import Register from '../../components/Register/Register';

export class RegisterContent extends Component {
  render() {
    return (
      <div>
        <Header />
        <Register />
        <Footer />
      </div>
    );
  }
}

export default RegisterContent;
