import { Component } from 'react';
import PropTypes from 'prop-types';

class SocketDispatcher extends Component {
  componentDidMount() {
    this.props.socket.on('socket-event', event => {
      this.props.handleEvent(event);
    });
  }

  render() {
    return null;
  }
}

SocketDispatcher.propTypes = {
  socket: PropTypes.object,
  handleEvent: PropTypes.func,
};

export default SocketDispatcher;
