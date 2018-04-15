import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import App from './app';

const AppConnector = connect(undefined, dispatch => ({
  fetchGoals: () => dispatch(actions.fetchGoals()),
  fetchStories: () => dispatch(actions.fetchStories()),
}))(App);

export default AppConnector;
