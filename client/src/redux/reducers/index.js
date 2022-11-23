import { combineReducers } from 'redux';
import members from './members-reducer';
import projects from './projects-reducer';
import shortcutTeams from './shortcut-teams-reducer';
import stories from './stories-reducer';
import teams from './teams-reducer';

export default combineReducers({
  members,
  projects,
  shortcutTeams,
  stories,
  teams,
});
