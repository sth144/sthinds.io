import React, { Component } from "react";
import "./header.component.scss";
import personIcon from "assets/person.svg";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {
	constructor(props: object) { super(props); }
	
	render() {
		return (
			<header className="App-header flex-row whole-width">
        <div className="third-width"></div>
        <div className="third-width">  
          <Link to="/" className="home-link">
            <h1>Sean Hinds</h1>
            <h4>Blog and Portfolio</h4>
          </Link>
        </div>
        <div className="third-width">
          <a href="/api/google">
            <img src={personIcon} height={30}></img>
          </a>
        </div>
      </header>);
	}
}

export default HeaderComponent;