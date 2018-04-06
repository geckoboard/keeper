import { connect } from 'react-redux';
import StoriesList from './stories-list';

const mapStateToProps = state => {
  const alreadyAssigned = state.goals.entities.reduce((acc, goal) => {
    const cards = goal.cards || [];

    return [...acc, ...cards];
  }, []);

  let stories = Object.keys(state.stories.entities).filter(
    id =>
      !alreadyAssigned.includes(parseInt(id, 10)) &&
      !state.stories.entities[id].completed,
  );

  stories = stories.map(id => state.stories.entities[id]);

  return {
    loading: state.stories.loading,
    stories,
  };
};

const StoriesListConnector = connect(mapStateToProps)(StoriesList);

export default StoriesListConnector;
