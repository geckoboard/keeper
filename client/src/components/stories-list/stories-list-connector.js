import { connect } from 'react-redux';
import StoriesList from './stories-list';
import { getGoals } from '../../redux/helpers';

const mapStateToProps = state => {
  const alreadyAssigned = getGoals(state).reduce(
    (acc, goal) => [...acc, ...goal.cards],
    [],
  );

  let stories = Object.keys(state.stories.entities).filter(
    id =>
      !alreadyAssigned.includes(parseInt(id, 10)) &&
      !state.stories.entities[id].completed &&
      !state.stories.entities[id].archived,
  );

  stories = stories.map(id => state.stories.entities[id]);

  return {
    loading: state.stories.loading,
    stories,
  };
};

const StoriesListConnector = connect(mapStateToProps)(StoriesList);

export default StoriesListConnector;
