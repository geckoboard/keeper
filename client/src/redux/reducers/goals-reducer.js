import * as actions from '../actions';

const initialState = {
  loading: true,
  entities: [],
};

const goalsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchGoals.end.type:
      return {
        ...state,
        loading: false,
        entities: payload,
      };

    case actions.addGoal.end.type:
      return {
        ...state,
        entities: [...state.entities, payload],
      };

    case actions.deleteGoal.start.type:
      return {
        ...state,
        entities: state.entities.filter(goal => goal.id !== payload),
      };

    case actions.updateGoalTitle.start.type:
      return {
        ...state,
        entities: state.entities.map(
          goal =>
            goal.id === payload.id ? { ...goal, title: payload.title } : goal,
        ),
      };

    case actions.addStoryToGoal.start.type: {
      const { goalId, storyId } = payload;
      const goals = state.entities.map(goal => {
        if (goal.id !== goalId) {
          return goal;
        }

        let cards = goal.cards || [];

        if (!cards.includes(storyId)) {
          cards = [...cards, storyId];
        }

        return {
          ...goal,
          cards,
        };
      });

      return {
        ...state,
        entities: goals,
      };
    }

    default:
      return state;
  }
};

export default goalsReducer;
