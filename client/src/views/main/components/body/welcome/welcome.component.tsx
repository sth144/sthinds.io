import React, { Component } from 'react';
import { connect } from 'react-redux';

// @connect(() => {}, () => {})
export default class WelcomeComponent extends Component {
  constructor(props: object) { super(props); }

  render() {
    return (
      <p className="text-left">
        My name is Sean Hinds. I am a full stack software engineer living in Austin, TX. 
        My interests include IoT, Automation, Bioinformatics, SPA & API development, 
        and Infrastructure as Code. My go-to toolkit includes TypeScript, Angular, Node.JS, 
        C++, Python, and Linux, but I'm always eagerly learning new things.
      </p>
    );
  }
}