var StopwatchStore = Fluxxor.createStore({
  initialize: function() {
    this.elapsed = 0;
    this.timeLimit = 0;
    this.statusMessages = {
      ready: "Ready",
      inProgress: "In progress",
      stoped: "Stoped",
      finished: "Finished",
      reset: "Reseted"
    };
    this.status = "";

    this.bindActions(
      constants.SET_STOPWATCH, this.onSetStopwatch,
      constants.START_STOPWATCH, this.onStartStopwatch,
      constants.STOP_STOPWATCH, this.onStopStopwatch,
      constants.RESET_STOPWATCH, this.onResetStopwatch
    );
  },

  onSetStopwatch: function(payload) {
    this.timeLimit = payload.timeLimit * 10;
    this.status = this.statusMessages.ready;
  },

  onStartStopwatch: function() {
    clearInterval(this.stopwatch);
    this.stopwatch = setInterval(this._tick, 100);
    this.status = this.statusMessages.inProgress;
    this.emit("change");
  },

  onStopStopwatch: function() {
    clearInterval(this.stopwatch);
    this.status = this.statusMessages.stoped;
    this.emit("change");
  },

  onResetStopwatch: function() {
    this.elapsed = 0;
    this.status = this.statusMessages.reset;
    this.emit("change");
  },

  _tick: function() {
    this.elapsed < this.timeLimit
      ? this.elapsed = this.elapsed + 1
      : this._finished();
    this.emit("change");
  },

  _finished: function() {
    clearInterval(this.stopwatch);
    this.status = this.statusMessages.finished;
  },

  getState: function() {
    return {
      elapsed: this.elapsed,
      statusMessages: this.statusMessages,
      status: this.status
    };
  }
});
