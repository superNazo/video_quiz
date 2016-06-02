var videoRecorderActions = {
  setVideoRecorderStatus: function(newStatus) {
    this.dispatch(constants.SET_VIDEO_RECORDER_STATUS, {status: newStatus});
  },

  setRecordedVideoToken: function(recordedVideoToken) {
    this.dispatch(constants.SET_RECORDED_VIDEO_TOKEN, {videoToken: recordedVideoToken});
  }
};
