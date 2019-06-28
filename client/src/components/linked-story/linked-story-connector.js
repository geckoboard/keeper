import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../redux/actions';
import LinkedStoryDragWrapper from './linkedstory-drag-wrapper';

const mapStateToProps = (state, props) => {
  const { members } = state;
  const {
    story: { owner_ids = [] },
  } = props;

  const ownerNames = owner_ids.reduce((owners, id) => {
    const member = members.byId[id];
    if (member) {
      owners.push(member.profile.name);
    }

    return owners;
  }, []);

  return { ownerNames };
};

const mapDispatchToProps = (dispatch, props) => ({
  onSaveOrder: () => dispatch(actions.saveStoryOrders(props.goalId)),
  onDelete: () =>
    dispatch(
      actions.removeStoriesFromGoal({
        goalId: props.goalId,
        storyIds: [props.story.id],
      }),
    ),
  onChangeOrder: update => dispatch(actions.updateStoryOrder(update)),
});

const LinkedStoryConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkedStoryDragWrapper);

LinkedStoryConnector.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  goalId: PropTypes.number.isRequired,
};

export default LinkedStoryConnector;
