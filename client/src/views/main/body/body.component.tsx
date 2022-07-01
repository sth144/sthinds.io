import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import WelcomeComponent from "./welcome/welcome.component";
import ArticlePanelComponent from "./article/article-panel.component";
import { connect } from "react-redux";
import "./body.component.scss";

@connect(
  () => { return { }; }, 
  () => { return { }; }
)
export default class BodyComponent extends Component {

	render() {
    // TODO: add permanent top margin
		return (
			<Container fluid className="App-body content-container">
				<Row className="whole-height whole-width align-center">
				  <Col md={12}>
            {/* TODO: make this column independently scrollable */}
            <Routes>
              <Route path="/" element={<WelcomeComponent/>}></Route>
              <Route path="/article/*" element={<ArticlePanelComponent/>}></Route>
            </Routes>
          </Col>
				</Row>
			</Container>
		)
	}
}
