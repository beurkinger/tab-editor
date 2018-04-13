
import Component from 'inferno-component';

import './App.css';
import Sheet from './Sheet/Sheet';
class App extends Component {
  state = {
    clipboard: [],
    linesInput: 'EADGBe',
    tabs : {
      byId : {},
      allIds : []
    },
  };

  // Add lines to the store and return the new lines id
  getLines = (lineNames = [], numberOfNotes = 0) => lineNames.map(name => {
    const notes = Array.from({length: numberOfNotes}, () => '-');
    return { name, notes };
  });

  // Add a tab to the store and return the new tab id
  addTab = (lineNames = ['e', 'B', 'G', 'D', 'A', 'E'], length = 32) => {
    const id = this.getBiggestId(this.state.tabs.allIds) + 1;
    const title = `tab ${id}`;
    const lines = this.getLines(lineNames, length);
    const tab = { id, title, lines, length };
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

  copyToClipboard = (notes = []) => {
    this.setState({ clipboard: notes });
  }

  pasteFromClipboard = (tabId, columnId) => {
    const tab = this.state.tabs.byId[tabId];
    const newNotes = this.state.clipboard;

    if (!newNotes.length) return;

    const updatedLines = tab.lines.map((line, i) => {
      const newNote = (newNotes[i] !== undefined) 
        ? newNotes[i]
        : '-'
      const firstNotes = line.notes.slice(0, columnId);
      const lastNotes = line.notes.slice(columnId + 1);
      const notes = [...firstNotes, newNote, ...lastNotes];
      return {...line, notes};
    });
    const updatedTab = { ...tab, lines: updatedLines };

    this.updateTab(updatedTab);
  }

  moveTab = (tabId, moveUp = true) => {
    const tabIds = this.state.tabs.allIds;
    const sourceIndex = tabIds.indexOf(tabId);
    const targetIndex = (moveUp)
      ? sourceIndex - 1
      : sourceIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= tabIds.length) return;

    const newTabIds = tabIds.map((id, i) => {
      if (i === sourceIndex) return tabIds[targetIndex];
      if (i === targetIndex) return tabIds[sourceIndex];
      return id;
    });

    const tabs = {... this.state.tabs, allIds: newTabIds };
    this.setState({ tabs });
  }

  updateLinesInput = linesInput => {
    this.setState({ linesInput });
  }

  updateTabTitle = (tabId, title) => {
    const tab = { ...this.state.tabs.byId[tabId], title };
    this.updateTab(tab);
  }

  // return the biggest id in an array of number ids, or 0 if the array is empty
  getBiggestId = (allIds = []) => allIds.length > 0 ? Math.max(...allIds) : 0;

	render () {
		return (
      <div id="app" >
        <Sheet 
          { ...this.state } 
          addTab={ this.addTab } 
          addColumn={ this.addColumn }
          copyToClipboard={ this.copyToClipboard } 
          moveTab={ this.moveTab }
          pasteFromClipboard={ this.pasteFromClipboard } 
          removeColumn={ this.removeColumn } 
          updateLinesInput={ this.updateLinesInput }
          updateNote={ this.updateNote }
          updateTabTitle={ this.updateTabTitle }
        />
      </div>
    );
	}

}

export default App;
