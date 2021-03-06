
import { Component } from 'inferno'

import './TabMenu.css';

class TabMenu extends Component {
  onAddButtonClick = (addAfter = true) => {
    this.props.addColumn(this.props.selectedColumnId, addAfter);
  }

  onCopyButtonClick = () => {
    this.props.copyToClipboard(this.props.selectedColumnId);
  }

  onDeleteButtonClick = () => {
    this.props.deleteTab(this.props.id);
  }

  onMouseDown = e => {
    e.stopPropagation();
  }

  onMoveButtonClick = (moveUp = true) => { 
    this.props.moveTab(this.props.id, moveUp);
  }

  onPasteButtonClick = () => {
    this.props.pasteFromClipboard(this.props.selectedColumnId);
  }

  onRemoveButtonClick = () => {
    this.props.removeColumn(this.props.selectedColumnId);
  }

	render () {
		return (
      <div className="tabMenu" onMouseDown={ this.onMouseDown }>
        <div>
          <button onClick={ () => this.onMoveButtonClick(false) }>
            MOVE DOWN
          </button>
          <button onClick={ () => this.onMoveButtonClick(true) } >
            MOVE UP
          </button>
          <button onClick={ () => this.onDeleteButtonClick(true) } >
            DELETE TAB
          </button>
        </div>
        { this.props.selectedColumnId < 0 &&
          <div>
            <button onClick={ this.onAddButtonClick } >
              ADD A COLUMN
            </button>
            <button onClick={ this.onRemoveButtonClick } >
              REMOVE LAST COLUMN
            </button>
          </div>
        }
        { this.props.selectedColumnId >= 0 &&
          <div>
            <button onClick={ () => this.onAddButtonClick(false) } >
              ADD BEFORE
            </button>
            <button onClick={ () => this.onAddButtonClick(true) } >
              ADD AFTER
            </button>
            <button onClick={ this.onCopyButtonClick } >
              COPY
            </button>
            <button onClick={ this.onPasteButtonClick } >
              PASTE
            </button>
            <button onClick={ this.onRemoveButtonClick } >
              REMOVE
            </button>
          </div>
        }
      </div>
    );
	}

}

TabMenu.defaultProps = {
  addButtonClickHandler: () => {},
  removeButtonClickHandler: () => {},
  selectedColumnId: -1,
}

export default TabMenu;
