import { Component } from "react";
import { Link } from "react-router-dom";
import pencilIcon from "assets/pencil-icon.svg";
import { connect } from "react-redux";

@connect(mapStateToProps, mapPropsToDispatch)
class MarginLeftComponent extends Component {
  render() {
    // TODO: display project links here (at bottom)
    //        - include old Heroku apps!
		return (
      <Link to="/article/create">
        {/* TODO: link to login if not logged in */}
        <img src={pencilIcon} height={30}></img>
      </Link>
		);
	}
}

const mapStateToProps = () => { };
const mapPropsToDispatch = () => { };

export default MarginLeftComponent;