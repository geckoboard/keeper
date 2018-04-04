import { connect } from 'react-redux';
import StoriesList from './stories-list';

const mapStateToProps = state => {
  const alreadyAssigned = state.goals.entities.reduce((acc, goal) => {
    const cards = goal.cards || [];

    return [...acc, ...cards];
  }, []);

  const stories = state.stories.entities.filter(
    story => !alreadyAssigned.includes(story.id),
  );

  return {
    loading: state.stories.loading,
    stories,
  };
};

const StoriesListConnector = connect(mapStateToProps)(StoriesList);

export default StoriesListConnector;
