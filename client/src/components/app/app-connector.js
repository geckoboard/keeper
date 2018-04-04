import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import App from './app';

const AppConnector = connect(
  state => state,
  dispatch => ({
    fetchGoals: () => dispatch(actions.fetchGoals()),
    fetchStories: () => dispatch(actions.fetchStories()),
    addGoal: title => dispatch(actions.addGoal(title)),
    deleteGoal: id => dispatch(actions.deleteGoal(id)),
  }),
)(App);

export default AppConnector;
