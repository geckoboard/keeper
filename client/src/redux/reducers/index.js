import { combineReducers } from 'redux';
import members from './members-reducer';
import projects from './projects-reducer';
import stories from './stories-reducer';
import teams from './teams-reducer';

export default combineReducers({ members, projects, stories, teams });
