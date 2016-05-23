var stopwatchActions = {
  setStopwatch: function(seconds) {
    this.dispatch(constants.SET_STOPWATCH, {timeLimit: seconds})
  },

  startStopwatch: function() {
    this.dispatch(constants.START_STOPWATCH);
  },

  stopStopwatch: function() {
    this.dispatch(constants.STOP_STOPWATCH);
  },

  resetStopwatch: function() {
    this.dispatch(constants.RESET_STOPWATCH)
  }
};
