import React, { Component } from "react";
import GetArticles from "./get-articles.component";
import { Col } from "react-bootstrap";
import "./margin-right.component.scss";

class MarginRightComponent extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "black" }}>
        <Col
          md={3}
          className="flex-column justify-center align-center whole-height-desktop position-fixed-desktop margin-right-container"
        >
          <GetArticles></GetArticles>
        </Col>
      </div>
    );
  }
}

export default MarginRightComponent;
