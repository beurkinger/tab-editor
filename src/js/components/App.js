import Inferno from 'inferno';
import Component from 'inferno-component';

import './App.css';
import Sheet from './Sheet/Sheet';
class App extends Component {

  constructor(props) {
    super(props);
	}

	render () {
		return (
      <div id="app" >
        <Sheet />
      </div>
    );
	}

}

export default App;
