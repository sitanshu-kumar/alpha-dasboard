import React, {Component} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HomePage from '../../components/HomePage/HomePage';

export class HomePageContent extends Component {
  render() {
    return (
      <main className="hero-section">
        <Header />
        <HomePage />
        <Footer />
      </main>
    );
  }
}

export default HomePageContent;
