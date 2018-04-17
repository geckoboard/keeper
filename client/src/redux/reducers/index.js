import { combineReducers } from 'redux';
import goals from './goals-reducer';
import projects from './projects-reducer';
import stories from './stories-reducer';

export default combineReducers({
  goals,
  projects,
  stories,
});
