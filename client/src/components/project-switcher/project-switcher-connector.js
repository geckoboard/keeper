import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const mapStateToProps = state => ({
  value: state.projects.active,
});

const mapDispatchToProps = dispatch => ({
  onChange: id => {
    localStorage.setItem('project', id);

    dispatch(actions.setProject(id));
  },
});

const ProjectSwitcherConnector = component =>
  connect(mapStateToProps, mapDispatchToProps)(component);

export default ProjectSwitcherConnector;
