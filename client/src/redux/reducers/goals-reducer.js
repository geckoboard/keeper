import * as actions from '../actions';

const initialState = {
  loading: true,
  entities: [],
};

const byOrder = (a, b) => a.order > b.order;
const updateOrders = goals =>
  goals.map((goal, index) => {
    const order = index + 1;
    return goal.order === order ? goal : { ...goal, order };
  });

const goalsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchGoals.start.type:
      return initialState;

    case actions.fetchGoals.end.type:
      return {
        ...state,
        loading: false,
        entities: payload.sort(byOrder),
      };

    case actions.addGoal.end.type:
      return {
        ...state,
        entities: [...state.entities, payload],
      };

    case actions.deleteGoal.start.type: {
      const goals = state.entities.filter(goal => goal.id !== payload);

      return {
        ...state,
        entities: updateOrders(goals),
      };
    }

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

        let { cards } = goal;

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

    case actions.removeStoryFromGoal.start.type: {
      const { goalId, storyId } = payload;
      const goals = state.entities.map(goal => {
        if (goal.id !== goalId) {
          return goal;
        }

        return {
          ...goal,
          cards: goal.cards.filter(card => card !== storyId),
        };
      });

      return {
        ...state,
        entities: goals,
      };
    }

    case actions.updateGoalOrder.type: {
      const goal = state.entities.find(goal => goal.id === payload.id);
      let goals = state.entities.filter(g => g !== goal);

      goals.splice(payload.to - 1, 0, goal);

      goals = updateOrders(goals);

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
