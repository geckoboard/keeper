import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DropDownProjectSwitcher from './dropdown-project-switcher';
import PROJECTS from '../../../../projects';

const mapDispatchToProps = (dispatch, props) => ({
  onChange: id => props.history.push(`/${PROJECTS[id].slug}`),
});

const ProjectSwitcherConnector = withRouter(
  connect(null, mapDispatchToProps)(DropDownProjectSwitcher),
);

export default ProjectSwitcherConnector;
