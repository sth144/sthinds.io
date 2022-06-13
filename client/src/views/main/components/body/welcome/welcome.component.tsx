import React, { Component } from 'react';
import { connect } from 'react-redux';

// @connect(() => {}, () => {})
export default class WelcomeComponent extends Component {
  constructor(props: object) { super(props); }

  render() {
    return (
      <div>Welcome</div>
    );
  }
}