import connect from './project-switcher-connector';
import DropdownProjectSwitcher from './dropdown-project-switcher';
import IconProjectSwitcher from './icon-project-switcher';

const DropdownProjectSwitcherConnector = connect(DropdownProjectSwitcher);
const IconProjectSwitcherConnector = connect(IconProjectSwitcher);

export {
  DropdownProjectSwitcherConnector as DropdownProjectSwitcher,
  IconProjectSwitcherConnector as IconProjectSwitcher,
};
