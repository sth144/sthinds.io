import { Component } from "react";
import "./footer.component.scss"
import logo from 'assets/logo.svg';

class FooterComponent extends Component {
	render() {
		return (
			<footer className="App-footer">
				<img src={logo} className="App-logo" alt="logo" />
				<h6>I wrote this site in TypeScript, using a React frontend and a NestJS backend,
						 with GraphQL, MongoDB and Redis.</h6> 
				<h6>I deployed it as a Docker container on a Kubernetes 
						 cluster I created from three Raspberry Pis. </h6>
			</footer>
		);
	}
}

export default FooterComponent;