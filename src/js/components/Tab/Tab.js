import Inferno from 'inferno';
import Component from 'inferno-component';

import './Tab.css';
import Line from '../Line/Line';
import TabHeader from './TabHeader/TabHeader';
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

  getNumberOfColumns (){
    return (this.state.lines.length === 0) ? 0 : this.state.lines[0].notes.length;
  }

  handleAddButtonClick = () => {
    const lines = this.state.lines.map(line => {
      const notes = [...line.notes, this.getEmptyNote()];
      return {...line, notes};
    });
    this.setState({ lines });
  }

  handleRemoveButtonClick = () => {
    const lines = this.state.lines.map(line => {
      const notes = line.notes.slice(0, -1);
      return {...line, notes};
    });
    this.setState({ lines });
  }

  handleHeaderCellClick = (cellId) => {
    this.setState({ selectedColumnId: cellId });
    this.addClickListener();
  }

  getLineComponent = (line, i) => (
    <Line 
      id={ i } 
      isSelected={ i === this.state.selectedLineId }
      name={ line.name }
      notes={ line.notes }
      key={ i } 
      noteClickHandler={ this.handleNoteClick }
      selectedNoteId={ this.state.selectedNoteId }
    />
  );

	render () {
		return (
      <div className="tab" >
        {/* <TabHeader 
          cellClickHandler={ this.handleHeaderCellClick }
          numberOfColumns={ this.getNumberOfColumns() } 
          numberOfLines={ this.state.lines.length }
          selectedColumnId={ this.state.selectedColumnId }
        /> */}
        {/* <div className="tab__menu">
          <button onClick={ this.handleAddButtonClick } >
            +
          </button>
          <button onClick={ this.handleRemoveButtonClick } >
            -
          </button>
        </div> */}
        <div className="tab__body">
          { this.state.lines.map(this.getLineComponent) }
        </div>
        <div className="tab__footer">
          { ` ` }
        </div>
      </div>
    );
	}

}

export default Tab;
