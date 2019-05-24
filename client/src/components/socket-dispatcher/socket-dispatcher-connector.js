import { connect } from 'react-redux';
import SocketDispatcher from './socket-dispatcher';
import { getSessionID } from '../../api/utils';
import socketActions from '../../redux/socket-actions';

const mapDispatchToProps = dispatch => ({
  handleEvent: event => {
    const { sender, type, payload } = event;

    if (sender === getSessionID()) {
      return;
    }

    switch (type) {
      case 'socket:teams:update':
        dispatch(socketActions.teams.update(payload));
        return;

      case 'socket:goals:create':
        dispatch(socketActions.goals.create(payload));
        return;

      case 'socket:goals:update':
        dispatch(socketActions.goals.update(payload));
        return;

      case 'socket:goals:updateOrders':
        dispatch(socketActions.goals.updateOrders(payload));
        return;

      case 'socket:goals:delete':
        dispatch(socketActions.goals.delete(payload));
        return;

      case 'socket:stories:create':
        dispatch(socketActions.stories.create(payload));
        return;

      case 'socket:stories:update':
        dispatch(socketActions.stories.update(payload));
        return;

      default:
        return;
    }
  },
});

const SocketDispatcherConnector = connect(
  null,
  mapDispatchToProps,
)(SocketDispatcher);

export default SocketDispatcherConnector;
