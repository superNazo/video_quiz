var CountdownStore = Fluxxor.createStore({
  initialize: function() {
    this.countdown;
    this.seconds;
    this.statusMessages = {
      ready: "Ready",
      inProgress: "In progress",
      stoped: "Stoped",
      finished: "Finished",
      reset: "Reseted"
    };
    this.status;

    this.bindActions(
      constants.SET_COUNTDOWN, this.onSetCountdown,
      constants.START_COUNTDOWN, this.onStartCountdown,
      constants.STOP_COUNTDOWN, this.onStopCountdown,
      constants.RESET_COUNTDOWN, this.onResetCountdown
    );
  },

  onSetCountdown: function(payload) {
    this.countdown = payload.countdown;
    this.seconds = this.countdown.toFixed(1)
    this.status = this.statusMessages.ready;
    this.emit("change");
  },

  onStartCountdown: function() {
    clearInterval(this.counter);
    this.counter = setInterval(this._tick, 100);
    this.status = this.statusMessages.inProgress;
    this.emit("change");
  },

  onStopCountdown: function() {
    clearInterval(this.counter);
    this.status = this.statusMessages.stoped;
    this.emit("change");
  },

  onResetCountdown: function(payload) {
    clearInterval(this.counter);
    this.countdown = payload.countdown;
    this.seconds = this.countdown.toFixed(1);
    this.status = this.statusMessages.reset;
    this.emit("change");
  },

  _tick: function() {
    this.countdown >= 0.1
      ? this.countdown = this.countdown - 0.1
      : this._finished();
    this.seconds = this.countdown.toFixed(1);
    this.emit("change");
  },

  _finished: function() {
    clearInterval(this.counter);
    this.status = this.statusMessages.finished;
  },

  getState: function() {
    return {
      countdown: this.countdown,
      seconds: this.seconds,
      statusMessages: this.statusMessages,
      status: this.status
    };
  }
});
