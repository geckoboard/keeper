import { connect } from 'react-redux';
import ProjectSelector from './project-selector';
import * as actions from '../../redux/actions';

const loadingState = {
  loading: true,
  projects: [],
  selected: [],
};

const mapStateToProps = state => {
  if (state.teams.loading) {
    return loadingState;
  }

  const team = state.teams.entities.find(t => t.id === state.teams.current);

  return {
    loading: false,
    selected: team.projects,
    projects: state.projects.entities,
  };
};

const mapDispatchToProps = dispatch => ({
  createHandlers: stateProps => ({
    onOpen: () => {
      if (stateProps.projects.length === 0) {
        dispatch(actions.fetchProjects());
      }
    },
    onChange: (project, checked) => {
      checked
        ? dispatch(actions.addProject(project))
        : dispatch(actions.removeProject(project));
    },
  }),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps.createHandlers(stateProps),
  ...ownProps,
});

const ProjectSelectorConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ProjectSelector);

export default ProjectSelectorConnector;
