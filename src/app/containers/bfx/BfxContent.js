import React, {Component} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Bfx from '../../components/Bfx/Bfx';

class BfxContent extends Component {
  render() {
    return (
      <main className="hero-section">
        <Header />
        <Bfx />
        <Footer />
      </main>
    );
  }
}

export default BfxContent;
