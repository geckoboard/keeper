import { connect } from 'react-redux';
import AddGoalForm from './add-goal-form';
import * as actions from '../../redux/actions';

const AddGoalFormConnector = connect(undefined, dispatch => ({
  onSubmit: title => dispatch(actions.addGoal(title)),
}))(AddGoalForm);

export default AddGoalFormConnector;
