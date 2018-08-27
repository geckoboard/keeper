import teamSwitcherConnector from './team-switcher-connector';
import DropdownTeamSwitcherComponent from './dropdown-team-switcher';
import IconTeamSwitcherComponent from './icon-team-switcher';

const DropdownTeamSwitcher = teamSwitcherConnector(
  DropdownTeamSwitcherComponent,
);
const IconTeamSwitcher = teamSwitcherConnector(IconTeamSwitcherComponent);

export { DropdownTeamSwitcher, IconTeamSwitcher };
