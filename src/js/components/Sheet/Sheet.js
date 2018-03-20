import Inferno from 'inferno';
import Component from 'inferno-component';

import Tab from '../Tab/Tab';

class Sheet extends Component {

  state = {
    defaultTab: {
      lineNames: ['E', 'A', 'D', 'G', 'B', 'e'],      
      timeSignature: {
        numberOfBeats: 4,
        beatLength: 4,
      },
    },
    tabs: [],
    tempo: 120
  };

  addTab = () => {
    const tab = this.state.defaultTab;
    const tabs = [...this.state.tabs, tab];
    this.setState({ tabs });
  };

  getTabComponent = props => <Tab { ...props } />;

	render () {
		return (
      <div className="sheet" >
        <button onClick={ this.addTab } >ADD</button>
        { this.state.tabs.map(this.getTabComponent) }
      </div>
    );
	}

}

export default Sheet;
