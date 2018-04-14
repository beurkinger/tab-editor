
import { Component } from 'inferno'

import './Column.css';

import Cell from '../../../../Cell/Cell';

class Column extends Component {

  getCellComponent = (note, i) => (
    <Cell 
      content={ note } 
      key={ i } 
    />
  );

	render () {
		return (
      <div 
        className="column" 
        style={ { left: 20 + this.props.id * 10 } }
      >
        { this.props.notes.map(this.getCellComponent) }
      </div>
    );
	}

}

Column.defaultProps = {
  columnId: -1,
  notes: [],
}

export default Column;
