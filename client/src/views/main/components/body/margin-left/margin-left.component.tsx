import { Component } from "react";
import { Link } from "react-router-dom";
import pencilIcon from "assets/pencil-icon.svg";

class MarginLeftComponent extends Component {
  render() {
		return (
			<Link to="/article/create">
        <img src={pencilIcon} height={30}></img>
			</Link>
		);
	}
}

export default MarginLeftComponent;