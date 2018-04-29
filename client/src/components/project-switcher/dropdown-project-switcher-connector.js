import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DropDownProjectSwitcher from './dropdown-project-switcher';

const mapDispatchToProps = (dispatch, props) => ({
  onChange: id => props.history.push(`/${id}`),
});

const ProjectSwitcherConnector = withRouter(
  connect(null, mapDispatchToProps)(DropDownProjectSwitcher),
);

export default ProjectSwitcherConnector;
