import { connect } from 'react-redux';
import ProjectSwitcher from './project-switcher';
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

const ProjectSwitcherConnector = connect(mapStateToProps, mapDispatchToProps)(
  ProjectSwitcher,
);

export default ProjectSwitcherConnector;
