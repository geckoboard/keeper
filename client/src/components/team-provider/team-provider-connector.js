import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TeamProvider from './team-provider';

const mapStateToProps = (state, props) => {
  const slug = props.match.params.team;

  const team = state.teams.entities.find(t => t.slug === slug) || {};

  return {
    team: team.id,
  };
};

const TeamProviderConnector = withRouter(
  connect(mapStateToProps)(TeamProvider),
);

export default TeamProviderConnector;
