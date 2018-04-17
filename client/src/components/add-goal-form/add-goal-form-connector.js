import { connect } from 'react-redux';
import AddGoalForm from './add-goal-form';
import * as actions from '../../redux/actions';

const mapStateToProps = state => ({
  project: state.projects.active,
});

const mapDispatchToProps = dispatch => ({
  createHandlers: project => ({
    onSubmit: title => dispatch(actions.addGoal({ project, title })),
  }),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { project } = stateProps;
  const { onSubmit } = dispatchProps.createHandlers(project);

  return {
    ...ownProps,
    onSubmit,
  };
};

const AddGoalFormConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddGoalForm);

export default AddGoalFormConnector;
