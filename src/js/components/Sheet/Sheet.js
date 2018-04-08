import Inferno from 'inferno';
import Component from 'inferno-component';

import Tab from '../Tab/Tab';

class Sheet extends Component {
  getTabComponent = tabId => {
    const tab = this.props.tabs.byId[tabId];
    return (
      <Tab 
        { ...tab } 
        addColumn={ this.props.addColumn } 
        copyToClipboard={ this.props.copyToClipboard } 
        pasteFromClipboard={ this.props.pasteFromClipboard }
        removeColumn={ this.props.removeColumn } 
        updateNote={ this.props.updateNote } 
      />);
  };

	render () {
		return (
      <div className="sheet" >
        <button onClick={ () => this.props.addTab() } >
          ADD TAB
        </button>
        { this.props.tabs.allIds.map(this.getTabComponent) }
      </div>
    );
	}

}

export default Sheet;
