import React from 'react';
import { DragSource } from 'react-dnd';
import Story from './story';

const StoryDragWrapper = ({ connectDragSource, isDragging, ...props }) =>
  connectDragSource(
    <div style={{ opacity: isDragging ? 0 : 1 }}>
      <Story {...props} />
    </div>,
  );

const itemSource = {
  beginDrag: props => props,
  endDrag: (props, monitor) => {
    if (monitor.didDrop()) {
      const goalId = monitor.getDropResult().id;
      props.onAddToGoal(goalId);
    }
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource('STORY', itemSource, collect)(StoryDragWrapper);
