import * as actions from '../actions';

const initialState = {
  loading: true,
  entities: [],
};

const projectsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchProjects.start.type:
      return {
        ...state,
        loading: true,
        entities: [],
      };

    case actions.fetchProjects.end.type:
      return {
        ...state,
        loading: false,
        entities: payload,
      };

    default:
      return state;
  }
};

export default projectsReducer;
