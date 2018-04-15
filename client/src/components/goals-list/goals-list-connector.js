import { connect } from 'react-redux';
import GoalsList from './goals-list';
import Goal from '../goal/goal';

const mapStateToProps = state => ({
  goals: state.goals.entities,
  loading: state.goals.loading,
});

const GoalsListConnector = connect(mapStateToProps)(GoalsList);

export default GoalsListConnector;
