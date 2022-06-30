import personIcon from "assets/person.svg";
import { connect } from "react-redux";

/**
 * Map Redux state values to component props
 */
 const mapStateToProps = (state) => {
  return { };
}

const mapDispatchToProps = (dispatch: unknown) => {
  return {
    dispatch
  };
}

@connect(mapStateToProps, mapPropsToDispatch)
export class LoginComponent {
  
  render() {
    return (
      <div>
        <a href="/api/google">
          <img src={personIcon} height={30}></img>
        </a>
      </div>
    ); 
  }
};