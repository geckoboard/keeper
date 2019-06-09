import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import styles from './goal-title-input-styles.css';

class GoalTitleInput extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      value: props.initialValue,
    };
  }

  componentDidMount() {
    this.input.focus();
  }

  handleSubmit(event) {
    event.preventDefault();

    const { value } = this.state;

    if (!value) {
      return;
    }

    this.props.onSubmit(value);
    this.setState({ value: '' });
  }

  handleInput(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyPress(event) {
    if (event.keyCode === 27) {
      this.props.onCancel();
      this.setState({ value: '' });
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.onCancel();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.goalTitleInput}>
        <input
          type="text"
          placeholder="Enter a goal name"
          value={this.state.value}
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

GoalTitleInput.defaultProps = {
  initialValue: '',
};

GoalTitleInput.propTypes = {
  initialValue: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default GoalTitleInput;
