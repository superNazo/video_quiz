var VideoRecorderStore = Fluxxor.createStore({
  initialize: function() {
    this.status = "";
    this.videoToken = "";

    this.bindActions(
      constants.SET_VIDEO_RECORDER_STATUS, this.onSetVideoRecorderStatus,
      constants.SET_RECORDED_VIDEO_TOKEN, this.onSetRecordedVideoToken
    );
  },

  onSetVideoRecorderStatus: function(payload) {
    this.status = payload.status;
    this.emit("change");
  },

  onSetRecordedVideoToken: function(payload) {
    this.videoToken = payload.videoToken;
    this.emit("change");
  },

  getState: function() {
    return {
      status: this.status,
      videoToken: this.videoToken
    };
  }
});
