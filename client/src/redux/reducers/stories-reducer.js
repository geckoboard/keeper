import * as actions from '../actions';

const initialState = {
  loading: true,
  entities: [],
};

const goalsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchStories.end.type:
      return {
        ...state,
        loading: false,
        entities: payload,
      };

    default:
      return state;
  }
};

export default goalsReducer;
