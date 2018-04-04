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

    default:
      return state;
  }
};

export default goalsReducer;
