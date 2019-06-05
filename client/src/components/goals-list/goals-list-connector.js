import { connect } from 'react-redux';
import GoalsList from './goals-list';
import { getGoals } from '../../redux/helpers';

const mapStateToProps = state => ({
  goals: getGoals(state),
});

const GoalsListConnector = connect(mapStateToProps)(GoalsList);

export default GoalsListConnector;
