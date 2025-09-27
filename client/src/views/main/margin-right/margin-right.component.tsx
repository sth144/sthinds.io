import React, { Component } from "react";
import GetArticles from "./get-articles.component";
import { Col } from "react-bootstrap";
import "./margin-right.component.scss";

class MarginRightComponent extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "black", overflowY: "auto" }}>
        <Col
          md={3}
          className="flex-column justify-center align-center position-fixed-desktop margin-right-container"
        >
          <GetArticles></GetArticles>
        </Col>
      </div>
    );
  }
}

export default MarginRightComponent;
