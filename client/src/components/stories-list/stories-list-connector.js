import { connect } from 'react-redux';
import StoriesList from './stories-list';

const StoriesListConnector = connect(
  state => ({
    loading: state.stories.loading,
    stories: state.stories.entities,
  }),
)(StoriesList);

export default StoriesListConnector;
