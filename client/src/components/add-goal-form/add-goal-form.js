import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import styles from './add-goal-form-styles.css';

const initialState = {
  showForm: false,
  title: '',
};

class AddGoalForm extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = initialState;
  }

  componentDidUpdate(_, prevState) {
    if (this.state.showForm && !prevState.showForm) {
      this.input.focus();
    }
  }

  handleInput(event) {
    this.setState({ title: event.target.value });
  }

  handleKeyPress(event) {
    if (event.keyCode === 27) {
      this.setState(initialState);
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const { title } = this.state;

    if (!title) {
      return;
    }

    this.props.onSubmit(this.state.title);
    this.setState(initialState);
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState(initialState);
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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter a goal name"
          onChange={this.handleInput}
          onKeyDown={this.handleKeyPress}
          className={styles.input}
          ref={e => (this.input = e)}
        />
        <button type="submit" className={styles.save_button}>
          Save
        </button>
        <button onClick={this.handleCancel} className={styles.cancel_button}>
          Cancel
        </button>
      </form>
    );
  }
}

AddGoalForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default AddGoalForm;
