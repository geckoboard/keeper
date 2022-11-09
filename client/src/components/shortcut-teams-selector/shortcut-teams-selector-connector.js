import { connect } from 'react-redux';
import ShortcutTeams from './shortcut-teams-selector';
import * as actions from '../../redux/actions';

const mapStateToProps = state => {
  const team = state.teams.entities.find(t => t.id === state.teams.current);

  return {
    loading: state.shortcutTeams.loading,
    selected: team ? team.shortcutTeams : [],
    shortcutTeams: state.shortcutTeams.entities,
  };
};

const mapDispatchToProps = dispatch => ({
  createHandlers: stateProps => ({
    onOpen: () => {
      if (stateProps.shortcutTeams.length === 0) {
        dispatch(actions.fetchShortcutTeams());
      }
    },
    onChange: (team, checked) => {
      checked
        ? dispatch(actions.addShortcutTeam(team))
        : dispatch(actions.removeShortcutTeam(team));
    },
  }),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps.createHandlers(stateProps),
  ...ownProps,
});

const shortcutTeamSelectorConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ShortcutTeams);

export default shortcutTeamSelectorConnector;
