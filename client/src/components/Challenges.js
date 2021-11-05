import React from 'react';
import { connect } from 'react-redux';
import './Challenges.css';
import {
  getChallenges,
  submitSolution,
  clearChallengeMsgs,
  clearSuccess,
} from '../actions/challengesActions';
import Spinner from './Spinner';

class Challenges extends React.Component {
  state = {
    modalOpen: false,
    modalCategory: null,
    modalIndex: null,
    flag: '',
    solvedId: null,
  };

  componentDidMount() {
    this.props.getChallenges();
  }

  componentDidUpdate() {
    if (this.props.isSuccess) {
      this.props.user.solvedSet.push(this.state.solvedId);
      this.modalClose();
      this.props.clearSuccess();
    }
  }

  modalClose() {
    this.setState({
      modalOpen: false,
      modalCategory: null,
      modalIndex: null,
      flag: '',
    });
    this.props.clearChallengeMsgs();
  }

  submitFlag(e, _id) {
    e.preventDefault();
    this.props.submitSolution(_id, this.props.user._id, this.state.flag);
    this.setState({ solvedId: _id });
  }

  truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  renderChallenges() {
    const renderedChallenges = [];
    for (const [category, challenges] of Object.entries(
      this.props.challenges.challenges
    )) {
      renderedChallenges.push(
        <React.Fragment key={category}>
          <h1 className='is-size-1 has-text-weight-semibold mb-4 poppins-font'>
            {category}
          </h1>
          <div className='columns is-centered is-multiline'>
            {challenges.map(({ name, _id, description, score }, index) => {
              let solved = this.props.user.solvedSet.includes(_id);
              description = this.truncateString(description, 60);
              return (
                <div className='column is-one-quarter is-narrow' key={_id}>
                  <div
                    className={`card is-clickable ${
                      solved ? 'successBgColor' : 'darkBgColor'
                    }`}
                    onClick={() => this.setModalVisible(category, index)}>
                    <div className='card-header'>
                      <p className='card-header-title lightTextColor is-size-3'>
                        {name}
                      </p>
                      <button
                        className={`card-header-icon noBorder lightTextColor ${
                          solved ? 'successBgColor' : 'darkBgColor'
                        }`}
                        aria-label='more options'>
                        <span className='icon'>
                          <i
                            className={`${
                              solved
                                ? 'fas fa-check'
                                : 'fab fa-font-awesome-flag'
                            }`}></i>
                        </span>
                      </button>
                    </div>
                    <div className='card-content '>
                      <p className='subtitle lightTextColor'>{description}</p>
                      <p className='subtitle lightTextColor has-text-centered has-text-weight-bold'>
                        {score}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    }
    return renderedChallenges;
  }

  setModalVisible(category, index) {
    this.setState({
      modalOpen: true,
      modalCategory: category,
      modalIndex: index,
    });
  }

  renderModal(category, index) {
    if (category === null || index === null) {
      return;
    }
    const { name, _id, description, challengelink, challengefile } =
      this.props.challenges.challenges[category][index];
    const renderedModal = [];
    renderedModal.push(
      <div
        className={`modal ${this.state.modalOpen ? 'is-active' : ''}`}
        key={_id}>
        <div
          className='modal-background'
          onClick={() => this.modalClose()}></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>{name}</p>
            <button
              className='delete'
              aria-label='close'
              onClick={() => this.modalClose()}></button>
          </header>
          <section className='modal-card-body'>{description}</section>
          <footer className='modal-card-foot is-flex-direction-column'>
            <div className='button-container full-width'>
              {challengefile ? (
                <a
                  href={challengefile}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='button is-info'>
                  Challenge Files
                </a>
              ) : (
                ''
              )}
              {challengelink ? (
                <a
                  href={challengelink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='button is-success'>
                  Challenge Link
                </a>
              ) : (
                ''
              )}
            </div>
            {this.props.successMsg || this.props.failMsg ? (
              <p
                className={`is-size-6 mt-2 ${
                  this.props.successMsg ? 'greenTextColor' : 'redTextColor'
                }`}>
                {this.props.successMsg || this.props.failMsg}
              </p>
            ) : (
              ''
            )}
            <form
              className='full-width'
              onSubmit={(e) => this.submitFlag(e, _id)}>
              <div className='field is-grouped mt-3 full-width'>
                <p className='control is-expanded'>
                  <input
                    className='input is-primary'
                    type='text'
                    placeholder='Enter Flag'
                    value={this.state.flag}
                    onChange={(e) => {
                      this.setState({ flag: e.target.value });
                    }}
                  />
                </p>
                <p className='control'>
                  <button className='button is-primary'>Submit</button>
                </p>
              </div>
            </form>
          </footer>
        </div>
      </div>
    );
    return renderedModal;
  }

  render() {
    if (this.props.loading || this.props.isLoading) {
      return <Spinner />;
    }
    if (Object.keys(this.props.challenges.challenges).length === 0) {
      return (
        <div className='section'>
          <p className='title is-flex is-justify-content-center big-text'>
            No challenges here yet :|
          </p>
        </div>
      );
    }
    return (
      <div className='challenges'>
        <div className='section'>{this.renderChallenges()}</div>
        <div>
          {this.renderModal(this.state.modalCategory, this.state.modalIndex)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    challenges: state.challenges,
    loading: state.challenges.loading,
    successMsg: state.challenges.successMsg,
    failMsg: state.challenges.failMsg,
    user: state.auth.user,
    isSuccess: state.challenges.isSuccess,
    isLoading: state.auth.loading,
  };
};

export default connect(mapStateToProps, {
  getChallenges,
  submitSolution,
  clearChallengeMsgs,
  clearSuccess,
})(Challenges);
