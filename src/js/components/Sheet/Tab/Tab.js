
import { Component } from 'inferno'

import './Tab.css';
import TabBody from './TabBody/TabBody';
import TabFooter from './TabFooter/TabFooter';
import TabHeader from './TabHeader/TabHeader';
import TabMenu from './TabMenu/TabMenu';
import TabTitle from './TabTitle/TabTitle';
import TextField from '../../TextField/TextField';
import { SPACE_CHAR } from '../../../constants';

class Tab extends Component {
  state = { 
    selectedColumnId: -1,
    selectedLineId: -1,
    selectedNoteId: -1,
   };

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
    this.editSelectedNote(content);
    this.selectNote(this.state.selectedLineId, this.state.selectedNoteId + 1);
  }

  handleNoteClick = (lineId, noteId) => {
    this.selectNote(lineId, noteId);
    this.addClickListener();
    this.addKeyListeners();
  };

  getColumnNotes (lines, columnId) {
    return lines.map(line => line.notes[columnId])
  }

  editSelectedNote (content) {
    const { selectedLineId, selectedNoteId } = this.state;
    this.props.updateNote(this.props.id, selectedLineId, selectedNoteId, content);
  }

  selectNote (lineId, noteId) {
    if (this.doesNoteExist(this.props.lines, lineId, noteId)) {
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

  addColumn = (columnId, addAfter = true) => {
    const numberOfColumns = this.props.length;
    if ( numberOfColumns > 127) return;

    let targetColumnId = (columnId < 0)
      ? numberOfColumns - 1
      : columnId;
    targetColumnId = addAfter 
      ? targetColumnId 
      : targetColumnId -1;
    
    this.props.addColumn(this.props.id, targetColumnId);

    const newSelectedColumnId = (addAfter)
      ? columnId
      : columnId + 1;
    this.setState({ selectedColumnId: newSelectedColumnId });
  }

  removeColumn = (columnId) => {
    const numberOfColumns = this.props.length;
    if (numberOfColumns < 2) return;
    
    const targetColumnId = (columnId < 0)
      ? numberOfColumns - 1
      : columnId;

    this.props.removeColumn(this.props.id, targetColumnId);

    const newSelectedColumnId = (columnId + 1 >= numberOfColumns)
      ? columnId - 1
      : columnId;
    this.setState({ selectedColumnId: newSelectedColumnId });
  }

  copyToClipboard = (columnId) => {
    const notes = this.getColumnNotes(this.props.lines, columnId);
    this.props.copyToClipboard(notes);
  }

  pasteFromClipboard = (columnId) => {
    this.props.pasteFromClipboard(this.props.id, columnId);
  }

  handleHeaderCellClick = (cellId) => {
    this.setState({ selectedColumnId: cellId, selectedLineId: -1, selectedNoteId: -1 });
    this.addClickListener();
  }

  updateTabTitle = title => { 
    this.props.updateTabTitle(this.props.id, title); 
  }

	render () {
		return (
      <div className="tab" >
        <TabTitle 
          { ...this.props }
          isTitleBeingEdited={ this.state.isTitleBeingEdited }
          updateTabTitle={ this.updateTabTitle }
        />
        <TabMenu 
          { ...this.props }
          addColumn={ this.addColumn }
          copyToClipboard={ this.copyToClipboard } 
          deleteTab={ this.props.deleteTab }
          moveTab={ this.props.moveTab }
          pasteFromClipboard={ this.pasteFromClipboard }
          removeColumn={ this.removeColumn }
          selectedColumnId={ this.state.selectedColumnId }
        />
        <TabHeader 
          cellClickHandler={ this.handleHeaderCellClick }
          numberOfColumns={ this.props.length } 
          numberOfLines={ this.props.lines.length }
          selectedColumnId={ this.state.selectedColumnId }
        />
        <TabBody
          { ...this.props }
          noteClickHandler={ this.handleNoteClick }
          selectedColumnId={ this.state.selectedColumnId }
          selectedLineId={ this.state.selectedLineId }
          selectedNoteId={ this.state.selectedNoteId }
        />
        <TabFooter />
        <TextField />
      </div>
    );
	}

}

export default Tab;
