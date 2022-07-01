import "reflect-metadata";
import React, { Component } from "react";
import "./header.component.scss";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {

	constructor(props: object) { 
    super(props); 
  }

	render() {
    return (
			<header className="App-header flex-row align-center whole-width">
        <div>  
          <Link to="/" className="home-link">
            <h1>Sean Hinds</h1>
            <h4>Blog and Portfolio</h4>
          </Link>
        </div>
      </header>);
	}
}

export default HeaderComponent;