import { Component } from 'react';
import PropTypes from 'prop-types';

class KeyListener extends Component {
  constructor(props) {
    super(props);

    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeypress);
  }

  handleKeypress(event) {
    if (
      event.key.toLowerCase() === this.props.character.toLowerCase() &&
      event.target.tagName.toLowerCase() !== 'input'
    ) {
      this.props.onKeyPress(event);
    }
  }

  render() {
    return null;
  }
}

KeyListener.propTypes = {
  character: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func,
};

export default KeyListener;
