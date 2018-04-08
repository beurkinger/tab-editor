import Inferno from 'inferno';
import Component from 'inferno-component';

import './TabHeader.css';
import HeaderCell from '../HeaderCell/HeaderCell';

class TabHeader extends Component {
  getCellComponents = (numberOfColumns, numberOfLines) => {
    const cells = [];
    for (var i = 0; i < numberOfColumns; i++) {
      cells.push(this.getCellComponent(i, numberOfLines));
    }
    return cells;
  }

  onMouseDown = e => {
    e.stopPropagation();
  }

  getCellComponent = (id, numberOfLines) => (
    <HeaderCell 
      clickHandler={ this.props.cellClickHandler }
      id={ id } 
      isSelected={ this.props.selectedColumnId === id }
      key={ id } 
    />
  );

	render () {
		return (
      <div className="tabHeader" onMouseDown={ this.onMouseDown } >
        { this.getCellComponents(this.props.numberOfColumns, this.props.numberOfLines) }
      </div>
    );
	}

}

TabHeader.defaultProps = {
  cellClickHandler: () => {},
  numberOfColumns: 0,
  numberOfLines: 0,
  selectedColumnId: -1,
}

export default TabHeader;
