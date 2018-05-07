import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddGoalForm from './add-goal-form';
import * as actions from '../../redux/actions';
import PROJECTS from '../../../../projects';
import { values } from '../../utils';

const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: title => {
    const project = values(PROJECTS).find(
      p => p.slug === props.match.params.project,
    );

    dispatch(
      actions.addGoal({
        project: project.id,
        title,
      }),
    );
  },
});

const AddGoalFormConnector = withRouter(
  connect(null, mapDispatchToProps)(AddGoalForm),
);

export default AddGoalFormConnector;
