import { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import CreateArticleForm from "./create-article.component";
import MarginLeftComponent from "./margin-left/margin-left.component";

class BodyComponent extends Component {
	render() {
		return (
			<div className="App-body">
			<Container fluid>
				<Row>
					<Col sm>
						<MarginLeftComponent></MarginLeftComponent>
					</Col>
					<Col>
						<CreateArticleForm></CreateArticleForm>
					</Col>
					<Col sm>
						TODO
					</Col>
				</Row>
			</Container>
			</div>
		)
	}
}

export default BodyComponent;