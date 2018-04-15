import { Component } from 'inferno'
import { createElement } from 'inferno-create-element';

import './OutsideClickListener.css';

class OutsideClickListener extends Component {
  elt = null;

  componentDidMount = () => {
    if (this.props.isListening) this.addListener();
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.isListening && this.props.isListening) {
      this.addListener();
    } else if (prevProps.isListening && !this.props.isListening) {
      this.removeListener();
    }
  }
  
  componentWillUnmount () {
    this.removeListener()
  }

  addListener () {
    document.addEventListener('mousedown', this.handleClick);
  }

  removeListener () {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    if (!this.props.onClick) return false;
    if (this.elt && !this.elt.contains(e.target)) this.props.onClick(e);
  }

  render () {
    return createElement(this.props.elementType, {
      children: this.props.children,
      className: `${this.props.className} outsideClickListener`,
      ref: elt => { this.elt = elt; }
    })
  }
}

OutsideClickListener.defaultProps = {
  className: '',
  elementType: 'div',
  isListening: true,
  onClick: null
}

export default OutsideClickListener;
