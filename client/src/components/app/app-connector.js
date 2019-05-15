import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import App from './app';

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(actions.fetchTeams());
    dispatch(actions.fetchProjects());
  },
  setTeam: team => dispatch(actions.setTeam(team)),
});

const AppConnector = connect(
  null,
  mapDispatchToProps,
)(App);

export default AppConnector;
