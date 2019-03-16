import * as React from 'react';
import * as ReactDOM from 'react-dom';

/** Displays the browser extension's options form. */
class OptionsForm extends React.Component {
	render() {
		return <p>Option content</p>;
	}
}

ReactDOM.render(<OptionsForm />, document.getElementById('optionsRoot'));