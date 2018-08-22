import * as actions from '../actions';

const initialState = {
  current: null,
  loading: true,
  entities: [],
};

const teamsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.setTeam.start.type:
      return {
        ...state,
        current: payload,
      };

    case actions.fetchTeams.start.type:
      return {
        ...state,
        loading: true,
        entities: [],
      };

    case actions.fetchTeams.end.type:
      return {
        ...state,
        loading: false,
        entities: payload,
      };

    case actions.addProject.start.type:
      return {
        ...state,
        entities: state.entities.map(team => {
          if (team.id !== state.current) {
            return team;
          }

          return {
            ...team,
            projects: [...team.projects, payload],
          };
        }),
      };

    case actions.removeProject.start.type:
      return {
        ...state,
        entities: state.entities.map(team => {
          if (team.id !== state.current) {
            return team;
          }

          return {
            ...team,
            projects: team.projects.filter(t => t !== payload),
          };
        }),
      };

    default:
      return state;
  }
};

export default teamsReducer;
