import { connect } from 'react-redux';
import CreateStoryDropdown from './create-story-dropdown';
import * as actions from '../../redux/actions';

const mapStateToProps = state => {
  const team = state.teams.entities.find(
    team => team.id === state.teams.current,
  );

  // Give option to create card in any project that
  // belongs to a card currently listen in keeper.
  const storyIds = Object.keys(state.stories.entities);
  const stories = storyIds.map(id => state.stories.entities[id]);
  const projectIds = stories.map(story => story.project_id);
  const projects = state.projects.entities.filter(project =>
    projectIds.find(id => id === project.id),
  );

  // Most of the time we'll be working with only one team
  // so just default to the first one for now.
  const shortcutTeam = state.shortcutTeams.entities.find(
    ({ id }) => id === team.shortcutTeams[0],
  );

  return {
    shortcutTeam,
    projects,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onChange: (project, shortcutTeam) => {
    dispatch(
      actions.createStoryFromGoal({
        shortcutTeam,
        project,
        goal: props.goal,
      }),
    );
  },
});

const CreateStoryDropdownConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateStoryDropdown);

export default CreateStoryDropdownConnector;
