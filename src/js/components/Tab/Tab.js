import Inferno from 'inferno';
import Component from 'inferno-component';

import './Tab.css';
import TabBody from '../TabBody/TabBody';
import TabHeader from '../TabHeader/TabHeader';
import TabMenu from '../TabMenu/TabMenu';
import { SPACE_CHAR } from '../Note/Note';

class Tab extends Component {
  state = { 
    lines: [],
    selectedColumnId: -1,
    selectedLineId: -1,
    selectedNoteId: -1,
   };

  componentWillMount () {
    const lines = this.props.lineNames.map(name => {
      const notes = [];
      for (var i = 0; i < 32; i++) {
        notes.push(this.getEmptyNote());
      }
      return { name, notes }
    });
    this.setState({ lines });
  }

  componentWillUnmount () {
    this.removeEventListeners();
  }

  addClickListener = () => {
    document.addEventListener('mousedown', this.handleWindowClick);
  }

  addKeyListeners = () => {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keypress', this.handleKeyPress);
  }

  removeEventListeners = () => {
    document.removeEventListener('mousedown', this.handleWindowClick);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleWindowClick = e => {
    this.unselectEverything();
    this.removeEventListeners();
  }  

  handleKeyDown = e => {
    const { selectedLineId, selectedNoteId } = this.state;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.selectNote(selectedLineId + 1, selectedNoteId);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.selectNote(selectedLineId, selectedNoteId - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.selectNote(selectedLineId, selectedNoteId + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.selectNote(selectedLineId - 1, selectedNoteId);
        break;
      case 'Escape':
        e.preventDefault();
        this.unselectEverything();
        break;
    }
  }

  handleKeyPress = e => {
    if (e.key.length < 1) return;
    e.preventDefault();
    const content = e.key === ' ' ? SPACE_CHAR : e.key;
    const lines = this.state.lines.map((line, lineId) => {
      if (lineId !== this.state.selectedLineId) return { ...line };
      const notes = line.notes.map((note, noteId) => {
        if (noteId !== this.state.selectedNoteId) return { ...note };
        return { ...note, content };
      });
      return { ...line, notes };
    });
    this.setState({ lines });
  }

  handleNoteClick = (lineId, noteId) => {
    this.selectNote(lineId, noteId);
    this.addClickListener();
    this.addKeyListeners();
  };

  selectNote (lineId, noteId) {
    const { lines } = this.state;
    if (this.doesNoteExist(lines, lineId, noteId)) {
      this.setState({ selectedLineId: lineId, selectedNoteId: noteId });
    }
  }

  doesNoteExist (lines, lineId, noteId) {
    if (!lines[lineId]) return false;
    return !!lines[lineId].notes[noteId];
  }

  unselectEverything () {
    this.setState({ selectedColumnId: -1, selectedLineId: -1, selectedNoteId: -1 });
  }

  getEmptyNote () {
    return { content: SPACE_CHAR, isBeingEdited: false };
  }

  getNumberOfColumns (lines) {
    return (lines.length === 0) ? 0 : lines[0].notes.length;
  }

  addColumn (lines, columnId, addAfter = true) {
    const numberOfColumns = this.getNumberOfColumns(lines);
    if ( numberOfColumns > 127) return;
    let targetColumnId = (columnId < 0)
      ? numberOfColumns - 1
      : columnId;
    targetColumnId = addAfter 
      ? targetColumnId 
      : targetColumnId -1;
    const newLines = lines.map(line => {
      const newNote = this.getEmptyNote();
      const firstNotes = line.notes.slice(0, targetColumnId + 1);
      const lastNotes = line.notes.slice(targetColumnId + 1);
      const notes = [...firstNotes, newNote, ...lastNotes];
      return {...line, notes};
    });
    const newSelectedColumnId = addAfter
      ? columnId
      : columnId + 1;
    this.setState({ lines: newLines, selectedColumnId: newSelectedColumnId });
  }

  removeColumn (lines, columnId) {
    const numberOfColumns = this.getNumberOfColumns(lines);
    if ( numberOfColumns < 2) return;
    const targetColumnId = (columnId < 0)
      ? numberOfColumns - 1
      : columnId;
    const newLines = lines.map(line => {
      const firstNotes = line.notes.slice(0, targetColumnId);
      const lastNotes = line.notes.slice(targetColumnId + 1);
      const notes = [...firstNotes, ...lastNotes];
      return {...line, notes};
    });
    const newSelectedColumnId = (columnId + 1 >= numberOfColumns)
      ? columnId - 1
      : columnId;
    this.setState({ lines: newLines, selectedColumnId: newSelectedColumnId });
  }

  handleAddButtonClick = (columnId, addAfter) => {
    this.addColumn(this.state.lines, columnId, addAfter);
  }

  handleRemoveButtonClick = columnId => {
    this.removeColumn(this.state.lines, columnId);
  }

  handleHeaderCellClick = (cellId) => {
    this.setState({ selectedColumnId: cellId });
    this.addClickListener();
  }

	render () {
		return (
      <div className="tab" >
        <TabMenu 
          addButtonClickHandler={ this.handleAddButtonClick }
          removeButtonClickHandler={ this.handleRemoveButtonClick }
          ref={ cpt => { this.tabMenuCpt = cpt; } }
          selectedColumnId={ this.state.selectedColumnId }
        />
        <TabHeader 
          cellClickHandler={ this.handleHeaderCellClick }
          numberOfColumns={ this.getNumberOfColumns(this.state.lines) } 
          numberOfLines={ this.state.lines.length }
          selectedColumnId={ this.state.selectedColumnId }
        />
        <TabBody
          lines={ this.state.lines }
          noteClickHandler={ this.handleNoteClick }
          selectedColumnId={ this.state.selectedColumnId }
          selectedLineId={ this.state.selectedLineId }
          selectedNoteId={ this.state.selectedNoteId }
        />
        <div className="tab__footer">
          { ` ` }
        </div>
      </div>
    );
	}

}

export default Tab;
