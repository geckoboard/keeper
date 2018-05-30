import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoalTitleInput from '../goal-title-input';
import autobind from 'react-autobind';
import styles from './add-goal-form-styles.css';

class AddGoalForm extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      showForm: false,
    };
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeypress);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeypress);
  }

  handleKeypress(event) {
    if (
      event.key.toLowerCase() === 'n' &&
      event.target.tagName.toLowerCase() !== 'input'
    ) {
      this.setState({ showForm: true });
    }
  }

  handleSubmit(value) {
    if (!value) {
      return;
    }

    this.props.onSubmit(value);
    this.setState({ showForm: false });
  }

  handleCancel() {
    this.setState({ showForm: false });
  }

  render() {
    const { showForm } = this.state;
    const { isEmpty } = this.props;

    if (!showForm) {
      return (
        <div>
          <button
            className={styles.add_goal_button}
            onClick={() => this.setState({ showForm: true })}
          >
            Add Goal
          </button>
          {isEmpty && (
            <span className={styles.empty}>
              👈 Let's get started!{' '}
              <span className={styles.hint}>(press "n")</span>
            </span>
          )}
        </div>
      );
    }

    return (
      <GoalTitleInput
        onSubmit={this.handleSubmit}
        onCancel={() => this.setState({ showForm: false })}
      />
    );
  }
}

AddGoalForm.propTypes = {
  isEmpty: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default AddGoalForm;
