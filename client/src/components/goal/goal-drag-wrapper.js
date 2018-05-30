import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget, DragSource } from 'react-dnd';
import Goal from './goal';
import styles from './goal-styles.css';

const GoalDragWrapper = ({
  connectDropTarget,
  connectDragPreview,
  isOver,
  isDragging,
  ...props
}) =>
  connectDragPreview(
    connectDropTarget(
      <div
        className={
          isDragging
            ? `${styles.drag_container} ${styles.isDragging}`
            : styles.drag_container
        }
      >
        <Goal {...props} />
        {isOver && <div className={styles.drag_overlay}>Drop to add story</div>}
      </div>,
    ),
  );

const dropTargetSource = {
  drop: props => ({
    id: props.goal.id,
  }),
  hover: (props, monitor, component) => {
    if (
      monitor.getItemType() !== 'GOAL' ||
      props.goal.id === monitor.getItem().id
    ) {
      return;
    }

    const dragIndex = monitor.getItem().order;
    const hoverIndex = props.goal.order;

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.onChangeOrder({
      id: monitor.getItem().id,
      from: dragIndex,
      to: hoverIndex,
    });
  },
};

const dropTargetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver:
    monitor.getItemType() === 'STORY' && monitor.isOver() && monitor.canDrop(),
});

const dragSource = {
  beginDrag: props => ({
    id: props.goal.id,
    order: props.goal.order,
  }),
  endDrag: props => {
    props.onSaveOrder();
  },
};

const dragSourceCollect = (connect, monitor) => ({
  createDragHandle: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
});

export default DropTarget(
  ['STORY', 'GOAL'],
  dropTargetSource,
  dropTargetCollect,
)(DragSource('GOAL', dragSource, dragSourceCollect)(GoalDragWrapper));
