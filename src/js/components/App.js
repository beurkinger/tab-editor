import Inferno from 'inferno';
import Component from 'inferno-component';

import './App.css';
import Sheet from './Sheet/Sheet';
class App extends Component {
  state = {
    tabs : {
      byId : {},
      allIds : []
    }
  };

  // Add lines to the store and return the new lines id
  getLines = (lineNames = [], numberOfNotes = 0) => lineNames.map(name => {
    const notes = Array.from({length: numberOfNotes}, () => '-');
    return { name, notes };
  });

  // Add a tab to the store and return the new tab id
  addTab = (lineNames = ['e', 'A', 'D', 'G', 'B', 'E'], length = 32) => {
    const id = this.getBiggestId(this.state.tabs.allIds) + 1;
    const name = `tab ${id}`;
    const lines = this.getLines(lineNames, length);
    const tab = { id, name, lines, length };
    const tabs = {
      ...this.state.tabs,
      byId: { ...this.state.tabs.byId, [id]: tab },
      allIds: [...this.state.tabs.allIds, id]
    };
    this.setState({ tabs });
    return id;
  };

  updateNote = (tabId, lineId, noteId, content) => {
    const tab = this.state.tabs.byId[tabId];
    const lines = tab.lines;
    const line = lines[lineId];

    const updatedNotes = line.notes.map((note, i) => (i === noteId ? content : note));
    const updatedLine = { ...line, notes: updatedNotes };
    const updatedLines = lines.map((line, i) => (i === lineId ? updatedLine : line));
    const updatedTab = { ...tab, lines: updatedLines };

    this.updateTab(updatedTab);
  }

  updateTab = (tab) => {
    const tabs = {
      ...this.state.tabs,
      byId: { ...this.state.tabs.byId, [tab.id]: tab }
    };
    this.setState({ tabs });
  }

  addColumn = (tabId, columnId) => {
    const tab = this.state.tabs.byId[tabId];

    const updatedLines = tab.lines.map(line => {
      const firstNotes = line.notes.slice(0, columnId + 1);
      const lastNotes = line.notes.slice(columnId + 1);
      const notes = [...firstNotes, '-', ...lastNotes];
      return {...line, notes};
    });
    const updatedTab = { ...tab, lines: updatedLines, length: tab.length + 1 };
    
    this.updateTab(updatedTab);
  }

  removeColumn = (tabId, columnId) => {
    const tab = this.state.tabs.byId[tabId];

    const updatedLines = tab.lines.map(line => {
      const firstNotes = line.notes.slice(0, columnId);
      const lastNotes = line.notes.slice(columnId + 1);
      const notes = [...firstNotes, ...lastNotes];
      return {...line, notes};
    });
    const updatedTab = { ...tab, lines: updatedLines, length: tab.length - 1 };

    this.updateTab(updatedTab);
  }

  // return the biggest id in an array of number ids, or 0 if the array is empty
  getBiggestId = (allIds = []) => allIds.length > 0 ? Math.max(...allIds) : 0;

	render () {
		return (
      <div id="app" >
        <Sheet 
          addTab={ this.addTab } 
          addColumn={ this.addColumn } 
          removeColumn={ this.removeColumn } 
          updateNote={ this.updateNote }
          { ...this.state } 
        />
      </div>
    );
	}

}

export default App;
