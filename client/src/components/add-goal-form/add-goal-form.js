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

    if (!showForm) {
      return (
        <button
          className={styles.add_goal_button}
          onClick={() => this.setState({ showForm: true })}
        >
          Add Goal
        </button>
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
  onSubmit: PropTypes.func,
};

export default AddGoalForm;
