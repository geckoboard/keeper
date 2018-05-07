import { combineReducers } from 'redux';
import goals from './goals-reducer';
import stories from './stories-reducer';

export default combineReducers({ goals, stories });
