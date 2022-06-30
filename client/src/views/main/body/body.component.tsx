import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Routes, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import WelcomeComponent from "./welcome/welcome.component";
import MarginLeftComponent from "./margin-left/margin-left.component";
import MarginRightComponent from "./margin-right/margin-right.component";
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
			<div className="App-body">
			<Container fluid className="content-container">
				<Row className="whole-height">
          {/* TODO: make margins collapsible */}
					<Col sm>
						<MarginLeftComponent></MarginLeftComponent>
					</Col>
				  <Col>
            {/* TODO: make this column independently scrollable */}
            <Routes>
              <Route path="/" element={<WelcomeComponent/>}></Route>
              <Route path="/article/*" element={<ArticlePanelComponent/>}></Route>
              <Route path="/login/success/:token" element={<RedirectComponent/>}></Route>
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

// TODO: move this to root router, dispatch actions for login initiated + login succeeded
function RedirectComponent() {
  const { token } = useParams()
  return (<div>REDIRECT {token}</div>)
}