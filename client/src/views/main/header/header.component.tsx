import "reflect-metadata";
import React, { Component } from "react";
import "./header.component.scss";
import { Link } from "react-router-dom";
import { LoginComponent } from "components/login/login.component";

class HeaderComponent extends Component {

	constructor(props: object) { 
    super(props); 
  }

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
          {/** TODO: move this to login component */}
          <LoginComponent></LoginComponent>
        </div>
      </header>);
	}
}

export default HeaderComponent;