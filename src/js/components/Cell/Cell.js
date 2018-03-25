import Inferno from 'inferno';
import Component from 'inferno-component';

import './Cell.css';

const Cell = ({ className, onClick, content }) => { 
	return (
    <div 
      className={`cell ${className? className : ''}`}
      onClick={ onClick }
    >
      { content }
    </div>
  );
}

Cell.defaultProps = {
  onClick: () => {}
}

export default Cell;
