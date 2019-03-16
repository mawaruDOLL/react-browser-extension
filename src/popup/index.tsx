import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../components/App';

/** Represents the component's state. */
interface IState {
	/** The current view being displayed in the popup. */
	currentView: string
}

/** Displays the browser extension's popup content. */
class Popup extends React.Component {
	state: IState = {
		currentView: "default"
	};

  render() {
		let component;

		switch (this.state.currentView) {
			case "other":
				component = <p>Other content</p>;
				break;
			default:
				component = <App />;
		}

    return component;
  }
}

ReactDOM.render(<Popup />, document.getElementById('root'));