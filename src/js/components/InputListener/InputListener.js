import { Component } from 'inferno'
import { createElement } from 'inferno-create-element';

import './InputListener.css';

class InputListener extends Component {
  elt = null;

  componentDidMount = () => {
    if (this.props.isListening) this.addListeners();
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.isListening && this.props.isListening) {
      this.addListeners();
    } else if (prevProps.isListening && !this.props.isListening) {
      this.removeListeners();
    }
  }
  
  componentWillUnmount () {
    this.removeListeners()
  }

  addListeners () {
    document.addEventListener('keydown', this.handleKeyDown);
    // document.addEventListener('keypress', this.handleKeyPress);
  }

  removeListeners () {
    document.removeEventListener('keydown', this.handleKeyDown);
    // document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleKeyDown = e => {
    if (this.props.onKeyDown) this.props.onKeyDown(e);
  }

  // handleKeyPress = e => {
  //   if (this.props.onKeyPress) this.props.onKeyPress(e);
  // }

  render () {
    return createElement(this.props.elementType, {
      children: this.props.children,
      className: `${this.props.className} inputListener`,
      ref: elt => { this.elt = elt; }
    })
  }
}

InputListener.defaultProps = {
  className: '',
  elementType: 'div',
  isListening: true,
  onKeyDown: null,
  // onKeyPress: null,
}

export default InputListener;
