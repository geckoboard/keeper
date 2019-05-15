import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DropdownTeamSwitcher from './dropdown-team-switcher';

const mapStateToProps = state => ({
  value: state.teams.current,
  teams: state.teams.entities,
});

const mapDispatchToProps = (dispatch, props) => ({
  createHandlers: stateProps => ({
    onChange: id => {
      const team = stateProps.teams.find(t => t.id === id);
      props.history.push(`/${team.slug}`);
    },
  }),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps.createHandlers(stateProps),
  ...ownProps,
});

const teamSwitcherConnector = Component =>
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
    )(Component),
  );

export default teamSwitcherConnector;
