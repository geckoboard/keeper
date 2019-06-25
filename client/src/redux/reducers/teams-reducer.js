import * as actions from '../actions';
import socketActions from '../socket-actions';

const initialState = {
  current: null,
  loading: true,
  entities: [],
};

const _byOrder = (a, b) => a.order - b.order;
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

const _updateByID = (id, entities, update) =>
  entities.map(item => {
    if (item.id.toString() !== id.toString()) {
      return item;
    }

    return update(item);
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

    case socketActions.teams.update.type:
      return {
        ...state,
        entities: _updateByID(payload.id, state.entities, () => ({
          ...payload,
          goals: payload.goals.sort(_byOrder),
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

    case socketActions.goals.create.type:
      return {
        ...state,
        entities: _updateByID(payload.teamId, state.entities, team => ({
          ...team,
          goals: [...team.goals, payload.goal],
        })),
      };

    case actions.deleteGoal.start.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => {
          const goals = team.goals.filter(goal => goal.id !== payload.id);

          return {
            ...team,
            goals: _updateOrders(goals),
          };
        }),
      };

    case socketActions.goals.delete.type:
      return {
        ...state,
        entities: _updateByID(payload.teamId, state.entities, team => {
          const goals = team.goals.filter(
            goal => goal.id.toString() !== payload.goalId.toString(),
          );

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
          goals: team.goals.map(goal =>
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

    case actions.removeStoriesFromGoal.start.type:
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
              cards: goal.cards.filter(c => !payload.storyIds.includes(c)),
            };
          }),
        })),
      };

    case socketActions.goals.update.type:
      return {
        ...state,
        entities: _updateByID(payload.teamId, state.entities, team => {
          return {
            ...team,
            goals: _updateByID(payload.goal.id, team.goals, () => payload.goal),
          };
        }),
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

    case actions.updateStoryOrder.type:
      const { id: cardIdToMove, goalId, to: toIndex } = payload;

      return {
        ...state,
        entities: _updateCurrent(state, team => ({
          ...team,
          goals: team.goals.map(goal => {
            if (goal.id !== goalId) {
              return goal;
            }

            // Remove ID to re-order
            let cards = goal.cards.filter(c => c !== cardIdToMove);

            // Add ID back in correct place
            cards.splice(toIndex - 1, 0, cardIdToMove);

            return {
              ...goal,
              cards: cards,
            };
          }),
        })),
      };

    case socketActions.goals.updateOrders.type:
      return {
        ...state,
        entities: _updateByID(payload.teamId, state.entities, team => ({
          ...team,
          goals: team.goals
            .map(goal => ({
              ...goal,
              order: payload.updates[goal.id],
            }))
            .sort(_byOrder),
        })),
      };

    case actions.createStoryFromGoal.start.type:
      return {
        ...state,
        entities: _updateCurrent(state, team => ({
          ...team,
          goals: team.goals.map(goal => {
            if (goal.id !== payload.goal.id) {
              return goal;
            }

            return {
              ...goal,
              isConvertingToStory: true,
              cards: [-1],
            };
          }),
        })),
      };

    case actions.createStoryFromGoal.end.type:
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
              isConvertingToStory: false,
              cards: [payload.story.id],
            };
          }),
        })),
      };

    default:
      return state;
  }
};

export default teamsReducer;
