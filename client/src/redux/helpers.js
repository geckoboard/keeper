export const getCurrentTeam = state =>
  state.teams.entities.find(t => t.id === state.teams.current);

export const getGoals = state => {
  const team = getCurrentTeam(state);

  return team ? team.goals : undefined;
};

export const getTeamProjects = state => {
  const { projects } = getCurrentTeam(state);

  return projects.map(id => state.projects.entities.find(p => p.id === id));
};
