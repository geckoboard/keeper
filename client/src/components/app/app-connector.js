import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import App from './app';

const AppConnector = connect(undefined, dispatch => ({
  onMount: () => {
    const project = localStorage.getItem('project');

    if (project) {
      dispatch(actions.setProject(parseInt(project, 10)));
    }
  },
}))(App);

export default AppConnector;
