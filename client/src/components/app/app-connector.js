import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import App from './app';

const mapStateToProps = state => ({
  project: state.projects.active,
});

const mapDispatchToProps = dispatch => ({
  onMount: () => {
    const project = localStorage.getItem('project');

    if (project) {
      dispatch(actions.setProject(parseInt(project, 10)));
    }
  },
});

const AppConnector = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnector;
