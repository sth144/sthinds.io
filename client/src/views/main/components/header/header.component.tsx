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
          </Link>
        </div>
        <div className="third-width">
          <img src={personIcon} height={30}></img>
        </div>
      </header>);
	}
}

export default HeaderComponent;