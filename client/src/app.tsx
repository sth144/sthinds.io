import React, { Component } from 'react';
import './app.scss';
import { Container, Col, Row } from "react-bootstrap";
import HeaderComponent from "views/main/header/header.component";
import BodyComponent from "views/main/body/body.component";
import FooterComponent from "views/main/footer/footer.component";
import MarginLeftComponent from "views/main/margin-left/margin-left.component";
import MarginRightComponent from "views/main/margin-right/margin-right.component";
import { connect } from 'react-redux';
import { initialize } from "./models/actions/initialize.action";

interface IAppComponentProps {
  dispatch: (action: unknown) => void
}

interface IAppComponentState {
  
}

/**
 * Map Redux state values to component props
 */
const mapStateToProps = (state: IAppComponentState) => {
  return { };
}

const mapDispatchToProps = (dispatch: unknown) => {
  return {
    dispatch
  };
}

/**
* connect() allows components to connect to the global redux datastore
*  - can map properties from store state to component props
*/
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component<IAppComponentProps, IAppComponentState> {
  componentDidMount(){
    document.title = "sthinds.io";
  }

  public state: IAppComponentState = { };

  constructor(public props: IAppComponentProps) {
    super(props);
    /**
     * on instantiation, load cached state (stored in browser localStorage)
     */
    this.loadStateFromLocalStorage();
  }

  /**
   * load cached state from browser localStorage
   *  - this allows persistent state across page reloads
   */
  private loadStateFromLocalStorage(): void {
    const cachedState = localStorage.getItem('appState');
    if (cachedState === null) {
        return undefined;
    }
    /**
     * dispatch an initialization action to the store
     *  - passed through reducers to generate initial state
     */
    this.props.dispatch(initialize(JSON.parse(cachedState)));
  }

  render() {
    return (
			<Container fluid className="App">
      	<Row className="whole-height">
        {/* TODO: make margins collapsible */}
				<Col md={2}>
					<MarginLeftComponent></MarginLeftComponent>
				</Col>
        <Col md={7}>
          <HeaderComponent></HeaderComponent> 
          <BodyComponent></BodyComponent>
          <FooterComponent></FooterComponent>
        </Col>
				<Col md={3}>
          <MarginRightComponent></MarginRightComponent>
				</Col>
				</Row>
			</Container>
    );
  }
}
