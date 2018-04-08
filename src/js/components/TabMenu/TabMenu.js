import Inferno from 'inferno';
import Component from 'inferno-component';

import './TabMenu.css';

class TabMenu extends Component {
  handleAddButtonClick = (addAfter = true) => {
    this.props.addColumn(this.props.selectedColumnId, addAfter);
  }

  handleRemoveButtonClick = () => {
    this.props.removeColumn(this.props.selectedColumnId);
  }

  handleButtonMouseDown = e => {
    e.stopPropagation();
  }

	render () {
		return (
      <div className="tabMenu" >
        { this.props.selectedColumnId < 0 &&
          <div>
            <button 
              onClick={ this.handleAddButtonClick } 
              onMouseDown={ this.handleButtonMouseDown } 
            >
              ADD A COLUMN
            </button>
            <button 
              onClick={ this.handleRemoveButtonClick }
              onMouseDown={ this.handleButtonMouseDown } 
            >
              REMOVE LAST COLUMN
            </button>
          </div>
        }
        { this.props.selectedColumnId >= 0 &&
          <div>
            <button 
              onClick={ () => this.handleAddButtonClick(false) } 
              onMouseDown={ this.handleButtonMouseDown } 
            >
              ADD BEFORE SELECTION
            </button>
            <button 
              onClick={ this.handleRemoveButtonClick }
              onMouseDown={ this.handleButtonMouseDown } 
            >
              REMOVE SELECTED
            </button>
            <button 
              onClick={ this.handleAddButtonClick } 
              onMouseDown={ this.handleButtonMouseDown } 
            >
              ADD AFTER SELECTION
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
