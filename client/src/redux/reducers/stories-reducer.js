import * as actions from '../actions';

const initialState = {
  loading: true,
  entities: {},
};

const storiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchStories.start.type:
      return initialState;

    case actions.fetchStories.end.type:
      return {
        ...state,
        loading: false,
      };

    case actions.storiesReceived.type:
      let entities = { ...state.entities };

      payload.data.forEach(story => {
        entities[story.id] = story;
      });

      return {
        ...state,
        entities: entities,
      };

    default:
      return state;
  }
};

export default storiesReducer;
