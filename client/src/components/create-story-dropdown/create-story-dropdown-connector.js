import { connect } from 'react-redux';
import CreateStoryDropdown from './create-story-dropdown';
import * as actions from '../../redux/actions';

const mapStateToProps = state => {
  const team = state.teams.entities.find(
    team => team.id === state.teams.current,
  );

  return {
    projects: state.projects.entities.filter(project =>
      team.projects.includes(project.id),
    ),
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onChange: project => {
    dispatch(
      actions.createStoryFromGoal({
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
