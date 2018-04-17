import * as actions from '../actions';

const initialState = {
  active: undefined,
};

const storiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.setProject.start.type:
      return {
        active: payload,
      };

    default:
      return state;
  }
};

export default storiesReducer;
