
import { Component } from 'inferno'

import Tab from './Tab/Tab';

class Sheet extends Component {
  handleInput = e => {
    const { value } = e.target;
    const filteredString = value.replace(/[^a-zA-Z]/g, '');
    this.props.updateLinesInput(filteredString);
  }

  handleClick = () => {
    const lineNames = this.props.linesInput.split('').reverse();
    this.props.addTab(lineNames);
  }

  getTabComponent = tabId => {
    const tab = this.props.tabs.byId[tabId];
    return (
      <Tab 
        { ...tab } 
        addColumn={ this.props.addColumn } 
        copyToClipboard={ this.props.copyToClipboard } 
        key={ tab.id }
        moveTab={ this.props.moveTab }
        pasteFromClipboard={ this.props.pasteFromClipboard }
        removeColumn={ this.props.removeColumn } 
        updateNote={ this.props.updateNote } 
        updateTabTitle={ this.props.updateTabTitle }
      />);
  };

	render () {
		return (
      <div className="sheet" >
        <input 
          onInput={ this.handleInput }
          type="text" 
          value={ this.props.linesInput } 
        />
        <button onClick={ this.handleClick } >
          ADD TAB
        </button>
        { this.props.tabs.allIds.map(this.getTabComponent) }
      </div>
    );
	}

}

export default Sheet;
