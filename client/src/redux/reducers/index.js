import { combineReducers } from 'redux';
import goals from './goals-reducer';
import stories from './stories-reducer';
import teams from './teams-reducer';

export default combineReducers({ goals, stories, teams });
