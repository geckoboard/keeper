import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import App from './app';

const mapDispatchToProps = {
  init: actions.fetchTeams,
  setTeam: actions.setTeam,
};

const AppConnector = connect(null, mapDispatchToProps)(App);

export default AppConnector;
