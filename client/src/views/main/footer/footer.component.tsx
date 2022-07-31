import React, { Component } from "react";
import "./footer.component.scss"
import logo from 'assets/logo.svg';
import emailIcon from "assets/email-icon.svg";

class FooterComponent extends Component {
	render() {
    // TODO: contact info, links
		return (
			<footer className="App-footer">
				<img src={logo} className="App-logo" alt="logo" />
				<p className="footer-text">
          I wrote this site in TypeScript, using a React frontend and a NestJS backend, 
        <br></br>
          with GraphQL, MongoDB and Redis. I deployed it as a Docker container on a 
        <br></br>
          Kubernetes cluster I created from three Raspberry Pis. 					
        </p>
        <p>
          <img src={emailIcon} alt="email"/>  sthinds144@gmail.com
        </p>
        <div className="flex-row third-width justify-around">
          <div>
            <a href="https://github.com/sth144">
              GitHub
            </a> 
          </div>
          <div> 
            <a href="https://www.linkedin.com/in/sean-hinds-67259ab2/">
              Linkedin
            </a>
          </div>
        </div>
			</footer>
		);
	}
}

export default FooterComponent;
