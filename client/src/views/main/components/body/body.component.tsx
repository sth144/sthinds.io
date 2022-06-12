import { Component } from "react";
import {
  BrowserRouter as Switch, Route, HashRouter
} from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import CreateArticleForm from "./article/create-article.component";
import MarginLeftComponent from "./margin-left/margin-left.component";
import MarginRightComponent from "./margin-right/margin-right.component";

class BodyComponent extends Component {
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
            {/** TODO: make this a special function. Put a generic landing here */}
            <CreateArticleForm></CreateArticleForm>
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

export default BodyComponent;