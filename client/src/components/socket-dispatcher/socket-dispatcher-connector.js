import { connect } from 'react-redux';
import SocketDispatcher from './socket-dispatcher';
import { getSessionID } from '../../api/utils';
import socketActions from '../../redux/socket-actions';

const mapStateToProps = state => {
  const team = state.teams.entities.find(t => t.id === state.teams.current);

  return {
    projects: team ? team.projects : [],
  };
};

const mapDispatchToProps = dispatch => ({
  createHandlers: stateProps => ({
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
          if (stateProps.projects.includes(payload.project_id)) {
            dispatch(socketActions.stories.create(payload));
          }
          return;

        case 'socket:stories:update':
          if (stateProps.projects.includes(payload.project_id)) {
            dispatch(socketActions.stories.update(payload));
          }
          return;

        case 'socket:stories:delete':
          dispatch(socketActions.stories.delete(payload));
          return;

        default:
          return;
      }
    },
  }),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...dispatchProps.createHandlers(stateProps),
    ...ownProps,
  };
};

const SocketDispatcherConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SocketDispatcher);

export default SocketDispatcherConnector;
