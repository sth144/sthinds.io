import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import WelcomeComponent from "./welcome/welcome.component";
import MarginLeftComponent from "./margin-left/margin-left.component";
import MarginRightComponent from "./margin-right/margin-right.component";
import ArticlePanelComponent from "./article/article-panel.component";
import { connect } from "react-redux";

@connect(
  () => { return { }; }, 
  () => { return { }; }
)
export default class BodyComponent extends Component {
	render() {
		return (
			<div className="App-body">
			<Container fluid>
				<Row>
          {/* TODO: make margins collapsible */}
					<Col sm>
						<MarginLeftComponent></MarginLeftComponent>
					</Col>
				  <Col>
            <Routes>
              <Route path="/" element={<WelcomeComponent/>}></Route>
              <Route path="/article/*" element={<ArticlePanelComponent/>}></Route>
            </Routes>
          </Col>
					<Col sm>
            <MarginRightComponent></MarginRightComponent>
					</Col>
				</Row>
			</Container>
			</div>
		)
	}
}