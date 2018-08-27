import { combineReducers } from 'redux';
import projects from './projects-reducer';
import stories from './stories-reducer';
import teams from './teams-reducer';

export default combineReducers({ projects, stories, teams });
