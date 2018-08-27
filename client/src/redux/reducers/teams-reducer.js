import * as actions from '../actions';

const initialState = {
  current: null,
  loading: true,
  entities: [],
};

const _byOrder = (a, b) => a.order > b.order;
const _updateOrders = goals =>
  goals.map((goal, index) => {
    const order = index + 1;
    return goal.order === order ? goal : { ...goal, order };
  });

const _updateCurrent = (state, update) =>
  state.entities.map(team => {
    if (team.id !== state.current) {
      return team;
    }

    return update(team);
  });

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
        entities: payload.map(team => ({
          ...team,
          goals: team.goals.sort(_byOrder),
        })),
      };

    case actions.addProject.start.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => ({
          ...team,
          projects: [...team.projects, payload],
        })),
      };

    case actions.removeProject.start.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => ({
          ...team,
          projects: team.projects.filter(t => t !== payload),
        })),
      };

    case actions.addGoal.end.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => ({
          ...team,
          goals: [...team.goals, payload],
        })),
      };

    case actions.deleteGoal.start.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => {
          const goals = team.goals.filter(goal => goal.id !== payload);

          return {
            ...team,
            goals: _updateOrders(goals),
          };
        }),
      };

    case actions.updateGoalTitle.start.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => ({
          ...team,
          goals: team.goals.map(
            goal =>
              goal.id === payload.id ? { ...goal, title: payload.title } : goal,
          ),
        })),
      };

    case actions.addStoryToGoal.start.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => ({
          ...team,
          goals: team.goals.map(goal => {
            if (goal.id !== payload.goalId) {
              return goal;
            }

            let { cards } = goal;

            if (!cards.includes(payload.storyId)) {
              cards = [...cards, payload.storyId];
            }

            return {
              ...goal,
              cards,
            };
          }),
        })),
      };

    case actions.removeStoryFromGoal.start.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => ({
          ...team,
          goals: team.goals.map(goal => {
            if (goal.id !== payload.goalId) {
              return goal;
            }

            return {
              ...goal,
              cards: goal.cards.filter(card => card !== payload.storyId),
            };
          }),
        })),
      };

    case actions.updateGoalOrder.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => {
          const goal = team.goals.find(goal => goal.id === payload.id);
          let goals = team.goals.filter(g => g !== goal);

          goals.splice(payload.to - 1, 0, goal);
          goals = _updateOrders(goals);

          return {
            ...team,
            goals,
          };
        }),
      };

    default:
      return state;
  }
};

export default teamsReducer;
