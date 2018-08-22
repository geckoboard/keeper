import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DropdownTeamSwitcher from './dropdown-team-switcher';
import TEAMS from '../../../../teams';

const mapDispatchToProps = (dispatch, props) => ({
  onChange: id => props.history.push(`/${TEAMS[id].slug}`),
});

const TeamSwitcherConnector = withRouter(
  connect(null, mapDispatchToProps)(DropdownTeamSwitcher),
);

export default TeamSwitcherConnector;
