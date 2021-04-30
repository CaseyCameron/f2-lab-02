import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

  render() { 
    return (
      <header className="Header">
        
        {/* <img 
          className="logo" 
          alt="cherry blossom tree logo" 
          src="cherry-blossom-tree.png"
        /> */}

        <h1>Pokemon Database Search</h1>
        
      </header>
    );
  }

}
 
export default Header;