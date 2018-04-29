import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import App from './app';

const mapDispatchToProps = {
  setProject: actions.setProject,
};

const AppConnector = connect(null, mapDispatchToProps)(App);

export default AppConnector;
