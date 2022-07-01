import { Component } from "react";
import { Link } from "react-router-dom";
import pencilIcon from "assets/pencil-icon.svg";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import LoginComponent from "components/login/login.component";
import "./margin-left.component.scss";

@connect(mapStateToProps, mapPropsToDispatch)
class MarginLeftComponent extends Component {
  render() {
    // TODO: display project links here (at bottom)
    //        - include old Heroku apps!
		return (
      <Col md={2} 
        className="flex-column justify-around align-center whole-height position-fixed margin-left-container">
        <Link to="/article/create">
          {/* TODO: link to login if not logged in */}
          <img src={pencilIcon} height={30}></img>
        </Link>
        <LoginComponent></LoginComponent>
      </Col>
		);
	}
}

const mapStateToProps = () => { };
const mapPropsToDispatch = () => { };

export default MarginLeftComponent;