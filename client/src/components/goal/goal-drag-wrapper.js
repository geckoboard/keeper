import React from 'react';
import { DropTarget } from 'react-dnd';
import Goal from './goal';

const GoalDragWrapper = ({ connectDropTarget, ...props }) =>
  connectDropTarget(
    <div>
      <Goal {...props} />
    </div>,
  );

const itemSource = {
  drop: props => ({
    id: props.goal.id,
  }),
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
});

export default DropTarget('STORY', itemSource, collect)(GoalDragWrapper);
