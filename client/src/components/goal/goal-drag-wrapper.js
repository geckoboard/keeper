import React from 'react';
import { DropTarget } from 'react-dnd';
import Goal from './goal';
import styles from './goal-styles.css';

const GoalDragWrapper = ({ connectDropTarget, isOver, ...props }) =>
  connectDropTarget(
    <div className={styles.drag_container}>
      <Goal {...props} />
      {isOver && <div className={styles.drag_overlay}>Drop to add story</div>}
    </div>,
  );

const itemSource = {
  drop: props => ({
    id: props.goal.id,
  }),
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver() && monitor.canDrop(),
});

export default DropTarget('STORY', itemSource, collect)(GoalDragWrapper);
