import * as actions from '../actions';

const initialState = {
  loading: true,
  entities: [],
};

const shortcutTeamsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchShortcutTeams.start.type:
      return {
        ...state,
        loading: true,
        entities: [],
      };

    case actions.fetchShortcutTeams.end.type:
      return {
        ...state,
        loading: false,
        entities: payload,
      };

    default:
      return state;
  }
};

export default shortcutTeamsReducer;
