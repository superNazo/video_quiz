var countdownActions = {
  setCountdown: function(seconds) {
    this.dispatch(constants.SET_COUNTDOWN, {countdown: seconds})
  },

  startCountdown: function() {
    this.dispatch(constants.START_COUNTDOWN);
  },

  stopCountdown: function() {
    this.dispatch(constants.STOP_COUNTDOWN);
  },

  resetCountdown: function(seconds) {
    this.dispatch(constants.RESET_COUNTDOWN, {countdown: seconds});
  }
};
