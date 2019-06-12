import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import LinkedStory from './linked-story';
import { findDOMNode } from 'react-dom';

const LinkedStoryDragWrapper = ({
  connectDragSource,
  connectDropTarget,
  isDragging,
  ...props
}) =>
  connectDropTarget(
    connectDragSource(
      <div style={{ opacity: isDragging ? 0 : 1 }}>
        <LinkedStory {...props} />
      </div>,
    ),
  );

const linkedCardSource = {
  beginDrag: props => props,

  endDrag: (props, monitor) => {
    if (monitor.didDrop()) {
      //TODO: Save
    }
  },
};

const dropTargetSource = {
  drop: props => ({
    id: props.id,
  }),
  canDrop: (props, monitor) => {
    // Don't allow dragging between different goals for now
    return (
      props.goalId === monitor.getItem().goalId &&
      props.id !== monitor.getItem().id
    );
  },
  hover: (props, monitor, component) => {
    if (!monitor.canDrop()) {
      return;
    }

    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

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

    props.onChangeOrder({
      id: monitor.getItem().id,
      goalId: monitor.getItem().goalId,
      from: dragIndex,
      to: hoverIndex,
    });
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const dropTargetCollect = connect => ({
  connectDropTarget: connect.dropTarget(),
});

export default DropTarget(
  ['LINKED_STORY'],
  dropTargetSource,
  dropTargetCollect,
)(
  DragSource('LINKED_STORY', linkedCardSource, collect)(LinkedStoryDragWrapper),
);
