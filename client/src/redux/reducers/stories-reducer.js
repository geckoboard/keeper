import * as actions from '../actions';
import socketActions from '../socket-actions';
import { values } from '../../utils';

const initialState = {
  loading: true,
  entities: {},
};

const storiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.setTeam.start.type:
      return initialState;

    case actions.fetchStories.start.type:
      return {
        ...state,
        loading: true,
      };

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

    case actions.removeProject.start.type: {
      let entities = {};
      let stories = values(state.entities);
      stories = stories.filter(story => story.project_id !== payload);

      stories.forEach(story => {
        entities[story.id] = story;
      });

      return {
        ...state,
        entities,
      };
    }

    case actions.createStoryFromGoal.end.type:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.story.id]: payload.story,
        },
      };

    case socketActions.stories.update.type: {
      let entities = { ...state.entities };

      if (!entities[payload.id]) {
        return state;
      }

      entities[payload.id] = payload;

      return {
        ...state,
        entities,
      };
    }

    case socketActions.stories.create.type:
      return {
        ...state,
        entities: {
          ...state.entities,
          [payload.id]: payload,
        },
      };

    case socketActions.stories.delete.type: {
      let entities = { ...state.entities };
      delete entities[payload];

      return {
        ...state,
        entities,
      };
    }

    default:
      return state;
  }
};

export default storiesReducer;
